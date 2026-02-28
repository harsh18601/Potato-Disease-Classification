from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from model import load_model, predict, IMAGE_SIZE

app = FastAPI()

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable for the model
MODEL = None

import os

# Get the directory where main.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Calculate absolute path to model
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "potato_disease_model.h5")

@app.on_event("startup")
async def startup_event():
    global MODEL
    # Load the model from absolute path
    MODEL = load_model(MODEL_PATH)

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)).resize((IMAGE_SIZE, IMAGE_SIZE)))
    return image

@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    
    predicted_class, confidence = predict(MODEL, image)
    
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)

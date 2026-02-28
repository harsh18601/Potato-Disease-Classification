import tensorflow as tf
from tensorflow.keras import models, layers
import numpy as np

# Constants from original notebook
IMAGE_SIZE = 256
BATCH_SIZE = 32
CHANNELS = 3
CLASS_NAMES = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']

def load_model(model_path):
    """Loads the pre-trained Keras model."""
    return tf.keras.models.load_model(model_path)

def predict(model, img):
    """
    Predicts the disease of a potato leaf image.
    Args:
        model: The loaded Keras model.
        img: A numpy array representing the image (256x256x3).
    Returns:
        prediction_class: The predicted class name.
        confidence: The confidence of the prediction.
    """
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = model.predict(img_array)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)
    return predicted_class, confidence

# LeafGuard: Potato Disease Classification AI

LeafGuard is a high-performance, full-stack web application designed to identify potato leaf diseases using Convolutional Neural Networks (CNN). It transforms agricultural diagnostics into a modern, accessible experience with a premium user interface.

![LeafGuard Banner](https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

- **Precision Analysis**: Classifies images into Early Blight, Late Blight, or Healthy.
- **Premium UI**: Modern glassmorphism design with fluid animations (Framer Motion).
- **Sub-second Inference**: High-performance FastAPI backend.
- **Proactive Error Handling**: Real-time feedback for backend connectivity.
- **Mobile Responsive**: Access diagnostics from anywhere in the field.

## 🏗️ Project Architecture

```text
├── app/                # FastAPI Backend
│   ├── main.py         # API Entry point
│   ├── model.py        # TensorFlow inference logic
│   └── requirements.txt
├── web/                # React + Vite Frontend
│   ├── src/
│   │   ├── App.jsx     # Main UI logic
│   │   └── index.css   # Custom styles & TailWind
│   └── package.json
├── models/             # Pre-trained CNN Models (.h5)
├── data/               # Local data storage
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+

### 1. Backend Setup
```powershell
cd app
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd web
npm install
npm run dev
```

Visit `http://localhost:5173` to start using the application.

## 🧪 Model Information
The underlying model is a CNN trained on the PlantVillage dataset, focusing on 256x256 image processing for optimal accuracy.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Precision Agriculture for a Sustainable Future.*

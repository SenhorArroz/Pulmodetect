from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from io import BytesIO
from PIL import Image
import os
import numpy as np
import tensorflow as tf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'pneumonia_detection_model.h5')
model = None

def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        try:
            model = tf.keras.models.load_model(MODEL_PATH)
            print(f"Model loaded from {MODEL_PATH}")
        except Exception as e:
            print(f"Failed to load model: {e}")
    else:
        print(f"Model not found at {MODEL_PATH}")

@app.on_event("startup")
async def startup_event():
    load_model()

def preprocess_image(image: Image.Image):
    IMG_WIDTH = 150
    IMG_HEIGHT = 150
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize((IMG_WIDTH, IMG_HEIGHT))
    img_array = np.array(image)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        contents = await file.read()
        image = Image.open(BytesIO(contents))
        processed_image = preprocess_image(image)
        
        prediction = model.predict(processed_image)
        score = float(prediction[0][0])
        
        result = "Pneumonia" if score > 0.5 else "Normal"
        confidence = score if result == "Pneumonia" else 1 - score
        
        return {
            "result": result,
            "confidence": confidence,
            "score": score
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

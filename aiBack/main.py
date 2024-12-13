import io
from typing import Union

from fastapi import FastAPI
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import base64
from io import BytesIO
from PIL import Image
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


# Load the Keras model
MODEL_PATH = "traffic_sign_classifier_final.keras"
model = tf.keras.models.load_model(MODEL_PATH)

def image_to_base64(image):
    if isinstance(image, np.ndarray):  # Check if the image is a numpy array
        image = Image.fromarray((image * 255).astype(np.uint8))  # Convert array to PIL.Image
    elif isinstance(image, Image.Image):
        pass  # Already a PIL Image
    else:
        raise TypeError("Unsupported image type")
    
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")  # Save image to buffer
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return image_base64


def preprocess_image(image):
    # Resize the image
    image = image.resize((224, 224))

    # Convert to RGB if needed
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Convert to a numpy array and normalize
    image = np.array(image) / 255.0 

    # Ensure the input has the expected dimensions
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    image  = np.squeeze(image, axis=None)

    return image



@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
    
  
    try:
        image = Image.open(file.file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the image: {e}")
    

    try:
        result_image = preprocess_image(image)
        model.summary()
        print(result_image.shape)
        #predictions = model.predict(result_image)
       # predicted_classes = predictions.argmax(axis=1)
       # confidence = np.max(predictions[0]) * 100
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during model inference: {e}")




    image_resized = image.resize((100, 100))
    image_grayscale = image.convert("L")    
    image_rotated = image.rotate(45)          
    
  
    images = []
    
    return JSONResponse(content={"processed_images": images, "label" : "stop", "occurancy" : 99.99})
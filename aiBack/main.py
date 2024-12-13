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
MODEL_PATH = "traffic_sign_classifier_increased_epochs.h5"
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
    image = image.resize((150, 150))

    # Convert to RGB if needed
    if image.mode != "RGB":
        image = image.convert("RGB")



    # Ensure the input has the expected dimensions
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    image  = np.squeeze(image, axis=None)

        # Convert to a numpy array and normalize
  #  image = np.array(image) / 255.0 

    img_array = tf.keras.utils.img_to_array(image) / 255.0  # Normalize the image
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

    return image

class_names = ['Green Light', 'Red Light', 'Speed Limit 10', 'Speed Limit 100', 'Speed Limit 110',
               'Speed Limit 120', 'Speed Limit 20', 'Speed Limit 30', 'Speed Limit 40',
               'Speed Limit 50', 'Speed Limit 60', 'Speed Limit 70', 'Speed Limit 80',
               'Speed Limit 90', 'Stop']

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
    
  
    try:
        image = Image.open(file.file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the image: {e}")
    
    image_resized = image.resize((100, 100))
    image_grayscale = image.convert("L")    
    image_rotated = image.rotate(45)    

    try:
        result_image = preprocess_image(image)
        predictions = model.predict(result_image)
        predicted_classes = predictions.argmax(axis=1)[0]
        predicted_class_name = class_names[predicted_classes]
        confidence = np.max(predictions[0]) * 100
        print(predicted_class_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during model inference: {e}")

    
  
    images = []
    
    return JSONResponse(content={"processed_images": images, "label" : predicted_class_name, "confidence" : float(confidence)})
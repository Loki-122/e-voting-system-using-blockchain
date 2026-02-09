import face_recognition
import os
import cv2
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
path = os.path.abspath(os.path.join(BASE_DIR, "..", "Faces"))
print(f"Path: {path}")

if not os.path.exists(path):
    print(f"Directory {path} does not exist.")
else:
    classNames = [os.path.splitext(file)[0] for file in os.listdir(path) if os.path.isfile(os.path.join(path, file))]
    print(f"Class names: {classNames}")

    images = []
    for file in os.listdir(path):
        file_path = os.path.join(path, file)
        img = cv2.imread(file_path)
        if img is not None:
            images.append(img)
        else:
            print(f"Failed to load image: {file_path}")

    def findEncodings(images):
        encodeList = []
        for img in images:
            try:
                print(f"Processing image of shape: {img.shape} and dtype: {img.dtype}")

                if img.shape[0] > 1000 or img.shape[1] > 1000:
                    img = cv2.resize(img, (1000, int(img.shape[0] * 1000 / img.shape[1])))

                img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img_rgb = np.ascontiguousarray(img_rgb, dtype=np.uint8)

                print(f"Converted image format: {img_rgb.shape}, dtype: {img_rgb.dtype}")

                encodings = face_recognition.face_encodings(img_rgb)
                if encodings:
                    encoded_face = encodings[0]
                    encodeList.append(encoded_face)
                else:
                    print(f"No faces found in the image of shape: {img_rgb.shape} and dtype: {img_rgb.dtype}")
            except Exception as e:
                print(f"Error processing image: {e}")
        return encodeList

    encoded_face_train = findEncodings(images)
    print(f"Number of faces encoded: {len(encoded_face_train)}")
    #This file changes the large size images to small size and also converts accordingly to rgb format.
    

import cv2
import face_recognition
import numpy as np
import webbrowser
import sys
from encoded import encoded_face_train, classNames

def open_camera():
    for idx in [0, 1, 2]:
        cap = cv2.VideoCapture(idx, cv2.CAP_DSHOW)
        if cap.isOpened():
            return cap, idx
        cap.release()
    return None, None

cap, cam_index = open_camera()
if cap is None:
    print("Camera not accessible")
    sys.exit(1)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

flag = 0
ans = []
index = 0
max_frames = 300
required_hits = 1
tolerance = 0.7
scale_factor = 0.75

while True:
    index += 1
    if index >= max_frames:
        print("Frame limit reached")
        break
    
    success, img = cap.read()
    if not success:
        print("Failed to capture image")
        break

    cv2.imshow("Camera", img)

    imgS = cv2.resize(img, (0, 0), None, scale_factor, scale_factor)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
    faces_in_frame = face_recognition.face_locations(
        imgS, number_of_times_to_upsample=3, model="hog"
    )
    encoded_faces = face_recognition.face_encodings(imgS, faces_in_frame)
    
    if not encoded_faces:
        print("No faces detected")
        continue

    for encode_face, faceloc in zip(encoded_faces, faces_in_frame):
        matches = face_recognition.compare_faces(
            encoded_face_train, encode_face, tolerance=tolerance
        )
        faceDist = face_recognition.face_distance(encoded_face_train, encode_face)
        matchIndex = np.argmin(faceDist)
        
        print(f"Matches: {matches}")
        print(f"Face Distances: {faceDist}")
        print(f"Match Index: {matchIndex}")
        
        if matches[matchIndex]:
            ans.append(classNames[matchIndex])
            flag += 1
            print(f"Detected: {classNames[matchIndex]}")
            break
    
    if (cv2.waitKey(1) & 0xFF == ord('q')) or flag >= required_hits:
        most_common_face = max(set(ans), key=ans.count) if ans else "No face detected"
        print(f"Exiting loop. Most common detected face: {most_common_face}")
        break

cap.release()
cv2.destroyAllWindows()
print("Resources released and windows closed. Proceeding to next step.")

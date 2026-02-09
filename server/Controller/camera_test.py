import cv2
import time
import sys


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

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1024)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 768)

start = time.time()
while time.time() - start < 3:
    success, img = cap.read()
    if not success:
        continue
    cv2.imshow("Camera Test", img)
    if (cv2.waitKey(1) & 0xFF) == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
print("Camera OK")

import cv2
import numpy as np

img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg",)
resized = cv2.resize(img,(520,520))

min_thres = 100
max_thres = 200
edges = cv2.Canny(resized,min_thres,max_thres)

cv2.imshow("Original",resized)
cv2.imshow("Edges",edges)

cv2.waitKey(0)
cv2.destroyAllWindows()
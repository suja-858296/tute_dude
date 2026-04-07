import cv2

img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg",)
resized = cv2.resize(img,(520,520))
kernel = 3

blur = cv2.medianBlur(resized,kernel)
cv2.imshow("Input",resized)
cv2.imshow("Output",blur)

cv2.waitKey(0)
cv2.destroyAllWindows()
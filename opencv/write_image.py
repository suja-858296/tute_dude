import cv2
img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg", 0)
cv2.imshow("mac", img)
cv2.imwrite('car.jpeg',img)
cv2.waitKey(10000)

cv2.destroyAllWindows()
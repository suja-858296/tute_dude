import cv2

img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg")

row = img.shape[1]
comumn = img.shape[0]

center = (comumn/2, row/2)
angle = 180

r = cv2.getRotationMatrix2D(center, angle,1)
rotate = cv2.warpAffine(img, r,(comumn,row))

cv2.imshow("Rotated",rotate)
cv2.waitKey(0)
cv2.destroyAllWindows()
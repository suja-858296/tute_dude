import cv2
img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg",)
print("Dimension of the image:",img.shape)
width = 1000
height = 1000
dim = (width,height)
resized = cv2.resize(img, dim)

cv2.imshow("mac", resized)
cv2.waitKey()

cv2.destroyAllWindows()
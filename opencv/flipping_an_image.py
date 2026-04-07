import cv2
img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg",)
print("Dimension of the image:",img.shape)
width = 500
height = 800
dim = (width,height)
resized = cv2.resize(img, dim)
print(f"Size in bytes: {img.size}")
cv2.imshow("Original",resized)

flip = cv2.flip(resized,1)
cv2.imshow("Horizontal",flip)

flip1 = cv2.flip(resized,0)
cv2.imshow("Vertical",flip1)

flip2 = cv2.flip(resized,-1)
cv2.imshow("Horizontal & Vertical",flip2)


cv2.waitKey(0)
cv2.destroyAllWindows()
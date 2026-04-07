import cv2
img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg",)
print(f"Dimension of original: {img.shape}")

scale = 10

width = int(img.shape[1] * scale / 100)
height = int(img.shape[0] * scale / 100)
dim = (width,height)

resized = cv2.resize(img,dim, interpolation=cv2.INTER_AREA)
print(f"Dimension of Resized: {resized.shape}")

cv2.imshow("Resized",resized)
cv2.imshow("Original",img)

cv2.waitKey(0)
cv2.destroyAllWindows()
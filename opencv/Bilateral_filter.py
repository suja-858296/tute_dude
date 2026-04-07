import cv2

img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg",)

resized = cv2.resize(img, (520,520))
d = 7
sigmacolour = 100
sigmaspace = 100

b = cv2.bilateralFilter(resized,d,sigmacolour,sigmaspace) 
cv2.imshow("Input",img)
cv2.imshow("Output",b)

cv2.waitKey(0)
cv2.destroyAllWindows()

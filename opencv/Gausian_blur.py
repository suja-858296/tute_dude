import cv2

img = cv2.imread("/Users/sksujauddin/Desktop/46360.jpeg")

resize = cv2.resize(img,(640,640))

ksize = (7,7) # It should be positive an odd..

sigmax = 0
sigmay = 0

blur = cv2.GaussianBlur(resize,ksize,sigmax)
cv2.imshow("Input",resize)
cv2.imshow("Output",blur)

cv2.waitKey(0)
cv2.destroyAllWindows()

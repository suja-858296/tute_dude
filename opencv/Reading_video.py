import cv2

video = cv2.VideoCapture("/Users/sksujauddin/Desktop/bike.MOV")
while video.isOpened():

    _,frame = video.read()
    frame  = cv2.resize(frame,(800,720))

    cv2.imshow("Output",frame)

    if cv2.waitKey(1) & 0xFF == ord("q"): 
     break

cv2.destroyAllWindows()
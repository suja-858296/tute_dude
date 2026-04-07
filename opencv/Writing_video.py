import cv2

video = cv2.VideoCapture("/Users/sksujauddin/Desktop/bike.MOV")

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
output = cv2.VideoWriter("Output.mp4",fourcc,25,(1920,1080))
while video.isOpened():
    ret,frame = video.read()
    if ret :
        output.write(frame)
        cv2.imshow("Frame",frame)

        if cv2.waitKey(100) == ord('s'):
            break
    else:
        break
cv2.destroyAllWindows()
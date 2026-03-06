# CALCULATOR USING TKINTER 

from tkinter import *

window = Tk()
window.geometry('500x350')

e = Entry(window, width= 52, borderwidth=7)
e.place(x=0 , y=0)

def click(num):
    result = e.get()
    e.delete(0,"end")
    e.insert(0, str(result)+ str(num))
b = Button(window,text='7',width=9 ,command=lambda:click(7))
b.place(x= 10, y=100)
b = Button(window,text='8',width=9 ,command=lambda:click(8))
b.place(x= 125, y=100)
b = Button(window,text='9',width=9 ,command=lambda:click(9))
b.place(x= 240, y=100)
b = Button(window,text='4',width=9 ,command=lambda:click(4))
b.place(x= 10, y=140)
b = Button(window,text='5',width=9 ,command=lambda:click(5))
b.place(x= 125, y=140)
b = Button(window,text='6',width=9 ,command=lambda:click(6))
b.place(x= 240, y=140)
b = Button(window,text='1',width=9 ,command=lambda:click(1))
b.place(x= 10, y=180)
b = Button(window,text='2',width=9 ,command=lambda:click(2))
b.place(x= 125, y=180)
b = Button(window,text='3',width=9 ,command=lambda:click(3))
b.place(x= 240, y=180)
b = Button(window,text='0',width=9 ,command=lambda:click(0))
b.place(x= 10, y=220)
b = Button(window,text='.',width=9 ,command=lambda:click('.'))
b.place(x= 125, y=220)
def equal():
    n2 = e.get()
    e.delete(0, END)
    if math == "Addition":
        e.insert(0, i + int(n2))
    elif math =="Substraction":
        e.insert(0, i - int(n2))
    elif math == "Division":
        e.insert(0, i / int(n2))
    elif math == "Multiplication":
        e.insert(0, i * int(n2))

b = Button(window,text='=',width=9 ,command= equal)
b.place(x= 240, y=220)
def clear():
    e.delete(0, END)

b = Button(window,text='AC',width=9 ,command= clear)
b.place(x= 355, y=60)
def div():
    n1 = int(e.get())
    global math
    math = "Division"
    global i
    i = int(n1)
    e.delete(0, END)
b = Button(window,text='÷',width=9 ,command= div)
b.place(x= 355, y=100)
def mult():
    n1 = int(e.get())
    global math
    math = "Multiplication"
    global i
    i = int(n1)
    e.delete(0, END)
b = Button(window,text='x',width=9 ,command= mult)
b.place(x= 355, y=140)
def sub():
    n1 = int(e.get())
    global math
    math = "Substraction"
    global i
    i = int(n1)
    e.delete(0, END)
b = Button(window,text='-',width=9 ,command= sub)
b.place(x= 355, y=180)
def add():
    n1 = e.get()
    global math
    math = "Addition"
    global i
    i = int(n1)
    e.delete(0, END)
b = Button(window,text='+',width=9 ,command= add)
b.place(x= 355, y=220)
mainloop()

# Sir I have not got the 3 recommendation that you have given ..
# But all the buttons are working properly thankyou for the help.
# (.) button is not working because it is not done in the lecture.
# Please approve it. 
#    Write a Python program that:
# 1. Creates a dictionary where student names are keys and their marks are values.
# 2. Asks the user to input a student's name.
# 3. Retrieves and displays the corresponding marks.
# 4. If the student’s name is not found, display an appropriate message.

student_data = {
      "Alice" : 89,
      "Sakib" : 59,
      "Rohan" : 55,
      "David" : 67,
}

Student_name = input("Enter the student's name: ")

if Student_name in student_data:
    marks = student_data[Student_name]
    print(f"{Student_name}'s marks: {marks} ")
else:
    print("The student not found. ")
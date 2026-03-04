#     Write a Python program that:
# 1. Takes user input and writes it to a file named output.txt.
# 2. Appends additional data to the same file.
# 3. Reads and displays the final content of the file.

user_text = input("Enter text to write to the file: ")
with open ('output.txt', 'w') as file:
    file.write("This is a appended additional data.\n ")
    print("\nFinal content of output.txt: ")

    with open ('output.txt', 'r') as file:
        print(file.read())
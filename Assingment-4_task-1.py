#     Write a Python program that:
# 1. Opens and reads a text file named sample.txt.
# 2. Prints its content line by line.
# 3. Handles errors gracefully if the file does not exist.

def read_sample_file(filename):
    try: 
        with open (filename, 'r') as file:
           print("Reading file content: ")
           for index, line in enumerate(file, start=1 ):
              print(f"Line {index}: {line.strip()}")
    except FileNotFoundError:
             

           print (f"Error: The file'{filename}' was not found. ")

read_sample_file('sample.txt')
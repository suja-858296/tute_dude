#    Write a Python program that:
# 1. Creates a list of numbers from 1 to 10.
# 2. Extracts the first five elements from the list.
# 3. Reverses these extracted elements.
# 4. Prints both the extracted list and the reversed list

number = list(range(1, 11))
print(f"Original list: {number}")
extracted_list = number[ :5 ]
reversed_list = extracted_list[::-1]
print("Extracted first five elements:", extracted_list)
print("Reversed extracted elements:", reversed_list)
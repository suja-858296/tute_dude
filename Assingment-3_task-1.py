#  Write a Python program that:
# 1. Defines a function named factorial that takes a number as an argument and calculates its factorial using a loop or recursion.
# 2. Returns the calculated factorial.
# 3. Calls the function with a sample number and prints the output.

def naturalnumber(n):
    if(n==0 or n==1):
        return 1  # The function calls itself.
    return n * naturalnumber(n-1)

n=int(input("Enter the number: "))
print(f"The factorial of the number is:{naturalnumber(n)}")

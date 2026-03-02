#    Write a Python program that:
# 1.   Asks the user for a number as input.
# 2.   Uses the math module to calculate the:
#   o   Square root of the number
#   o   Natural logarithm (log base e) of the number
#   o   Sine of the number (in radians)
# 3.   Displays the calculated results.
import math
a = int(input("Enter a number: "))
b = (math.sqrt(a))
print(f"Square root: {b}")

c = (math.log(a))
print(f"Logarithm: {c} ")

d = (math.sin(a))

print(f"Sine: {d}")
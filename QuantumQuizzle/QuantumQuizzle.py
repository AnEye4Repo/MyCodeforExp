#!/bin/python3

def addition(x):
    numAdd = []
    sum = 0
    i=1
    while i <= x :
        num = int(input("Enter a number: \n"))
        numAdd.append(num)
        sum+=num
        num = 0
        i+=1
    print(sum)
    print(numAdd)
def subtraction(x):
    numSub = []
    sum = 0
    i=1
    while i <= x :
        num = int(input("Enter a number: \n"))
        numSub.append(num)
        sum-=num
        num = 0
        i+=1
    print(sum)
    print(numSub)
def multiplication(x):
    numMult = []
    sum = 0
    i=1
    while i <= x :
        num = int(input("Enter a number: \n"))
        numMult.append(num)
        sum*=num
        num = 0
        i+=1
    print(sum)
    print(numMult)
def division(x):
    numDiv = []
    sum = 0
    i=1
    while i <= x :
        num = int(input("Enter a number: \n"))
        numDiv.append(num)
        sum/=num
        num = 0
        i+=1
    print(sum)
    print(numDiv)

print("Hello and welcome to QuantumQuizzle")
choice = input("Choose a topic: +, - , /, *\n")
if choice == '+':
    much=input("How many numbers would you like to use\n:")
    addition(int(much))
elif choice == '-':
    much=input("How many numbers would you like to use\n:")
    subtraction(int(much))
elif choice == '*':
    much=input("How many numbers would you like to use\n:")
    multiplication(int(much))
elif choice == '/':
    much=input("How many numbers would you like to use\n:")
    division(int(much))
else:
    print("OOf that is not a option.")

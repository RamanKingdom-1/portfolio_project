h = 25
l = 30
w = 25
itemH = 15
itemL = 25
itemW = 30


fitH = itemH <= h
fitL = itemL <= l
fitW = itemW <= w

fit = fitH and fitL and fitW

if fit:
    print("All Good")
else:
    print("Oops!, it won't fit...")
    if (not fitW): 
        print("The width is the problem")
    if (not fitH): 
        print("The height is the problem")
    if (not fitL): 
        print("The length is the problem")
        

def helper(a,b,c,d):
    if(type(a) != int and type(a) != float) or (a < 0 or a > 100):
        return "HELLO"
    if(type(b) != int and type(b) != float) or (b < 0 or b > 100):
        return "HELLO"
    if(type(c) != int and type(c) != float) or (c < 0 or c > 100):
        return "HELLO"
    if(type(d) != int and type(d) != float) or (d < 0 or d > 100):
        return "HELLO"
    
    x = (a + b + c + d)/4
    if x >= 90:
        return "A"
    elif x < 90 and x >= 80:
        return "B"
    elif x < 80 and x >= 70:
        return "C"
    elif x <70 and x>= 60:
        return "D"
    else:
        return "F"
    
     
    
print(helper(85,78,88,100))

x = 4.1

print(type(x))

print(type(x) == float)



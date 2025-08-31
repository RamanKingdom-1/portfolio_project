import requests 

x = requests.get("https://www.rotowire.com/basketball/injury-report.php")

print("x",x.text)
import requests
import json

r = requests.get("https://api.github.com/users/mat-frayne")

print(json.dumps(r.json(), indent=4))
import json
import requests

f = open("./countryCodes.json", "r", encoding="utf-8")
countryCodesJson = json.load(f)

countryCodes = ["ca", "us"]
data = {}

for code in countryCodesJson["codes"]:
    url = 'https://api.api-ninjas.com/v1/country?name=' + code
    resp = requests.get(url, headers={'X-Api-Key': 'w7TyHVcd2HtBeAzegyOxVQ==d8qpAlxEDogTE5xw'}).json()
    print(resp)

    data[code] = resp[0] if resp else None

print(data)

with open("./countries.json", "w", encoding="utf-8") as jsonFile:
    json.dump(data, jsonFile, ensure_ascii=False)

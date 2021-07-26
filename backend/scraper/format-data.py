import errno
import json
import os
import random
import re
import requests

s = requests.Session()

def ext(url):
    e = url.split(".")[-1]
    if len(e) != 3:
        raise Exception("fixme: '" + url + "'")
    return e
def download_image(url, i):
    with open("images/" + str(i) + "." + ext(url), "wb") as f:
        f.write(requests.get(url).content)

def find_one(name, pattern):
    l = pattern.findall(name)
    if len(l) != 1: raise Exception("fixme: '" + name + "'")
    match = l[0]
    if isinstance(match, tuple):
        for f in match:
            g = f.strip()
            if len(g) > 0:
                return g
        raise Exception("fixme: '" + name + "'")
    return match

type_pattern = re.compile(r"(?i).*?(DDR\d).*")
def guess_type(name): return find_one(name, type_pattern)

def guess_format(name):
    if "notebook" in name.lower():
        return "SODIMM"
    return "DIMM"

size_pattern = re.compile(r"(?i).*\s+(\d+\s*GB).*")
def guess_size(name): return find_one(name, size_pattern)

freq_pattern = re.compile(r"(?i).*?(\d+\s*)MHz.*|DDR\d-(\d+)")
def guess_freq(name): return find_one(name, freq_pattern)

try:
    os.mkdir("images")
except OSError as e:
    if e.errno != errno.EEXIST:
        raise

ram = json.loads(open("scraped-data.json", "r").read())
res = []
i = 1
for r in ram:
    price = float(r[0].replace("R$", "").strip().replace(".", "").replace(",", "."))
    name = r[1].strip()
    image = r[2]
    desc = r[3].split("Pol\u00edticas do Site", 1)[0].strip()
    if not image:
        continue
    i = i + 1
    download_image(image, i)
    res.append({
        'price': price,
        'name': name,
        'photo': "https://files.natanbc.net/usp/scc0219/img/" + str(i) + "." + ext(image),
        'amountAvailable': random.randint(30, 150),
        'amountSold': 0,
        'id': i,
        'description': desc,
        'memoryType': guess_type(name),
        'memoryFormat': guess_format(name),
        'memoryCapacity': guess_size(name),
        'memoryFrequency': guess_freq(name),
    })
#    break
print(json.dumps(res, indent=4))

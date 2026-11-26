import json

with open("data/processed/traffic_accidents.json", encoding="utf-8") as f:
    records = json.load(f)

with open("data/processed/firebase_import.json", "w", encoding="utf-8") as f:
    json.dump({"accidents": records}, f, ensure_ascii=False)
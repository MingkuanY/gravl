import json

# Read JSON data
with open('src/assets/MyTravels.json', 'r') as json_file:
    json_data = json.load(json_file)

# Replace the current value of "order" with an incremented counter
for trip in json_data:
    counter = 1
    for visit in trip["visits"]:
        visit["order"] = counter
        counter += 1

# Write the modified data back to the JSON file
with open('modified_data.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=2)

print("Order values updated and saved to 'modified_data.json'")

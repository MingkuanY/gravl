import json

from updated_place_to_fips import place_to_fips

def replace_place_id_with_fips_code(input_file, output_file):
  with open(input_file, 'r') as file:
    data = json.load(file)
  
  for visit in data:
    place_id = visit.get("place_id")
    if place_id in place_to_fips:
      visit["place_id"] = place_to_fips[place_id]
    else:
      print(f"Warning: No FIPS code found for {place_id}")
  
  with open(output_file, 'w') as file:
    json.dump(data, file, indent=2)

replace_place_id_with_fips_code('Welcome.json', 'output.json')
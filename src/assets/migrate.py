# Script to populate the Place table

from updated_place_to_fips import place_to_fips

# Counties by FIPS codes
fips_list = []

def generate_place_id(county_name, state_abbr):
  county_name_formatted = county_name.replace("St. ", "St__")
  county_name_formatted = county_name_formatted.replace(" ", "_")
  place_id = f"{county_name_formatted}__{state_abbr}"
  return place_id

def populate_place_to_fips(fips_list, place_to_fips, state_abbr):
  for entry in fips_list:
    fips_code, county_name = entry.split(maxsplit=1)
    county_name = county_name.replace("County", "").strip()
    place_id = generate_place_id(county_name, state_abbr)

    if place_id in place_to_fips:
      place_to_fips[place_id] = fips_code
  
  with open("updated_place_to_fips.py", 'w') as file:
    file.write("place_to_fips = {\n")
    for place_id, fips_code in place_to_fips.items():
      file.write(f'  "{place_id}": "{fips_code}",\n')
    file.write("}\n")

populate_place_to_fips(fips_list, place_to_fips, "WV")
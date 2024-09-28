import re
from updated_place_to_fips import place_to_fips

def convert_place_id_to_fips(svg_file, output_file):
  with open(svg_file, 'r') as file:
    svg_content = file.read()
  
  path_regex = r'(<path[^>]+id=")([^"]+)("[^>]+>)'

  def replace_id(match):
    original_place_id = match.group(2)
    if original_place_id in place_to_fips:
      fips_code = place_to_fips[original_place_id]

      comment = f'{{/* Place_id: {original_place_id} */}}\n'

      new_path = f'{comment}{match.group(1)}{fips_code}{match.group(3)}'
      return new_path
    else:
      return match.group(0)

  updated_svg_content = re.sub(path_regex, replace_id, svg_content)

  with open(output_file, 'w') as file:
    file.write(updated_svg_content)

convert_place_id_to_fips('input.svg', 'output.svg')
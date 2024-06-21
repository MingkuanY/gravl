import json

# Read JSON data
json_data = [{
  "trip_name": "Welcome to Gravl",
  "description": "",
  "visits": [
    {
      "place_id": "Big_Horn__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Yellowstone__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Musselshell__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Golden_Valley__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Stillwater__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Sweet_Grass__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wheatland__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Meagher__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Broadwater__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jefferson__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lewis_and_Clark__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Powell__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Deer_Lodge__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Granite__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Missoula__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ravalli__MT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Idaho__ID",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Adams__ID",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washington__ID",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Payette__ID",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Baker__OR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Malheur__OR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Harney__OR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Humboldt__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pershing__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washoe__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Churchill__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Storey__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lyon__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Carson_City__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Douglas__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mineral__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mono__CA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Esmeralda__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Inyo__CA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Nye__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lincoln__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clark__NV",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mohave__AZ",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Coconino__AZ",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Navajo__AZ",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Apache__AZ",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "McKinley__NM",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "San_Juan__NM",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "San_Juan__UT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montezuma__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "La_Plata__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dolores__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "San_Juan__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "San_Miguel__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ouray__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montrose__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Delta__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mesa__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Garfield__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Rio_Blanco__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Moffat__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Uintah__UT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Daggett__UT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Duchesne__UT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wasatch__UT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Summit__UT",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Uinta__WY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Weld__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Morgan__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Adams__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Arapahoe__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Elbert__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "El_Paso__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lincoln__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pueblo__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Crowley__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Otero__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Huerfano__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Las_Animas__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Colfax__NM",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mora__NM",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "San_Miguel__NM",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Guadalupe__NM",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washington__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Yuma__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Phillips__CO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Chase__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dundy__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hayes__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hitchcock__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Buchanan__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Platte__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Leavenworth__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Doniphan__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Atchison__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jefferson__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Richardson__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Brown__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jackson__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pawnee__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Nemaha__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pottawatomie__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Gage__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Marshall__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jefferson__NE",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washington__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Riley__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Republic__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Cloud__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clay__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jewell__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mitchell__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ottawa__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Smith__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Osborne__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lincoln__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Rooks__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ellis__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Russell__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Trego__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ness__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Rush__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pawnee__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hodgeman__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Edwards__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Gray__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ford__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Kiowa__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Meade__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clark__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Comanche__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Beaver__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Harper__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lipscomb__TX",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ellis__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Woodward__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Roger_Mills__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Custer__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dewey__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Beckham__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washita__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Greer__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Kiowa__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Tillman__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Comanche__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Caddo__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Cotton__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Stephens__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Grady__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Carter__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Murray__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Garvin__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "McClain__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Marshall__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Johnston__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pontotoc__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Bryan__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Atoka__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Coal__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Choctaw__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pushmataha__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pittsburg__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "McCurtain__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Latimer__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Le_Flore__OK",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Polk__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Scott__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Sebastian__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Yell__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Logan__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Franklin__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Crawford__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Johnson__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Newton__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Madison__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washington__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Carroll__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Benton__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Stone__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Barry__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "McDonald__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Newton__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lawrence__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jasper__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dade__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Barton__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Cedar__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Vernon__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Bourbon__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "St__Clair__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Henry__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Bates__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Linn__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Johnson__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Cass__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Miami__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lafayette__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jackson__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Johnson__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Carroll__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ray__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clay__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wyandotte__KS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Livingston__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Caldwell__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clinton__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Grundy__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Daviess__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "DeKalb__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Gentry__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montgomery__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Garland__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Howard__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pike__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hot_Spring__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clark__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hempstead__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Nevada__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ouachita__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ralls__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pike__IL",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pike__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Calhoun__IL",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montgomery__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lincoln__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Warren__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "St__Charles__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Franklin__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "St__Louis_Co___MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jefferson__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Crawford__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washington__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "St__Francois__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Sainte_Genevieve__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Iron__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Madison__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wayne__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Bollinger__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Butler__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Stoddard__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clay__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dunklin__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "New_Madrid__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pemiscot__MO",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lake__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mississippi__AR",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lauderdale__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dyer__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Tipton__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Haywood__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Crockett__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Shelby__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Fayette__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hardeman__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Marshall__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Benton__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Tippah__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Alcorn__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lafayette__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Union__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Prentiss__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pontotoc__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lee__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Itawamba__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Chickasaw__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Monroe__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lowndes__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lamar__AL",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Marion__AL",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Franklin__AL",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Tishomingo__MS",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Colbert__AL",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lauderdale__AL",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wayne__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lawrence__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Giles__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lewis__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Maury__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hickman__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Williamson__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dickson__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Cheatham__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Davidson__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montgomery__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Robertson__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Christian__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Todd__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Logan__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Simpson__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Muhlenberg__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Butler__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "McLean__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ohio__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Daviess__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hancock__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Warrick__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Spencer__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Perry__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Crawford__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pike__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Dubois__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Orange__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Daviess__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Martin__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lawrence__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Greene__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Monroe__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Brown__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clay__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Owen__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Morgan__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Putnam__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hendricks__IN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Kalkaska__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Crawford__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Missaukee__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Roscommon__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Osceola__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clare__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Gladwin__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mecosta__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Isabella__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Midland__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montcalm__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Gratiot__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Saginaw__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ionia__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clinton__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Shiawassee__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Eaton__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Ingham__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Livingston__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Calhoun__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jackson__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Washtenaw__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hillsdale__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lenawee__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Monroe__MI",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Williams__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Fulton__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lucas__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Defiance__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Henry__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wood__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Paulding__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Putnam__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hancock__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Van_Wert__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Allen__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hardin__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mercer__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Auglaize__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Shelby__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Logan__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Union__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Darke__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Miami__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Champaign__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clark__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Madison__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montgomery__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Greene__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Fayette__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Warren__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clinton__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Highland__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clermont__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Brown__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Adams__OH",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Bracken__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Mason__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lewis__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Robertson__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Fleming__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Nicholas__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Bath__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Rowan__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Elliott__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Montgomery__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Menifee__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Morgan__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Powell__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wolfe__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Magoffin__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Estill__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lee__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Breathitt__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jackson__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Owsley__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Perry__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Knott__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Clay__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Leslie__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Letcher__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Knox__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Bell__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Harlan__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wise__VA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Norton__VA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Leslie__KY",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Claiborne__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lee__VA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hancock__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Scott__VA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Union__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Grainger__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hawkins__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Knox__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jefferson__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hamblen__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Greene__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Blount__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Sevier__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Cocke__TN",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Graham__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Swain__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Haywood__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Madison__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Macon__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Jackson__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Buncombe__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Rabun__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Transylvania__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Henderson__NC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Oconee__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Pickens__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Greenville__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Stephens__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Franklin__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Hart__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Anderson__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Elbert__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Abbeville__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Laurens__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Greenwood__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Wilkes__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Lincoln__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "McCormick__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "McDuffie__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Columbia__GA",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    },
    {
      "place_id": "Edgefield__SC",
      "date": "2004-07-30",
      "order": "Welcome to Gravl"
    }
  ]
}]



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

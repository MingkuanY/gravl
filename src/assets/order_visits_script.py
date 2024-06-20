import json

# Read JSON data
json_data = [
  {
    "trip_name": "Childhood Skiing, hiking, and Road Tripping",
    "description": "",
    "visits": [
      {
        "place_id": "United_States",
        "date": "2004-07-30",
        "order": "United States of America"
      },
      {
        "place_id": "CA",
        "date": "2004-07-30",
        "order": 1
      },
      {
        "place_id": "China",
        "date": "2004-09-20",
        "order": "China"
      },
      {
        "place_id": "Mexico",
        "date": "2009-09-20",
        "order": "Mexico"
      },
      {
        "place_id": "Santa_Clara__CA",
        "date": "2004-07-30",
        "order": 1
      },
      {
        "place_id": "Alameda__CA",
        "date": "2004-07-30",
        "order": 2
      },
      {
        "place_id": "San_Mateo__CA",
        "date": "2012-01-01",
        "order": 3
      },
      {
        "place_id": "San_Francisco__CA",
        "date": "2012-01-01",
        "order": 4
      },
      {
        "place_id": "Marin__CA",
        "date": "2012-01-01",
        "order": 5
      },
      {
        "place_id": "Sonoma__CA",
        "date": "2012-01-01",
        "order": 6
      },
      {
        "place_id": "Napa__CA",
        "date": "2012-01-01",
        "order": 7
      },
      {
        "place_id": "Solano__CA",
        "date": "2012-01-01",
        "order": 8
      },
      {
        "place_id": "Contra_Costa__CA",
        "date": "2012-01-01",
        "order": 9
      },
      {
        "place_id": "Santa_Cruz__CA",
        "date": "2012-01-01",
        "order": 10
      },
      {
        "place_id": "Yolo__CA",
        "date": "2012-01-01",
        "order": 11
      },
      {
        "place_id": "Lake__CA",
        "date": "2012-01-01",
        "order": 12
      },
      {
        "place_id": "Colusa__CA",
        "date": "2012-01-01",
        "order": 13
      },
      {
        "place_id": "Sacramento__CA",
        "date": "2012-01-01",
        "order": 14
      },
      {
        "place_id": "Placer__CA",
        "date": "2012-01-01",
        "order": 15
      },
      {
        "place_id": "Nevada__CA",
        "date": "2012-01-01",
        "order": 16
      },
      {
        "place_id": "Sierra__CA",
        "date": "2012-01-01",
        "order": 17
      },
      {
        "place_id": "NV",
        "date": "2005-02-04",
        "order": "Nevada"
      },
      {
        "place_id": "Washoe__NV",
        "date": "2012-01-01",
        "order": 18
      },
      {
        "place_id": "Carson_City__NV",
        "date": "2012-01-01",
        "order": 19
      },
      {
        "place_id": "Douglas__NV",
        "date": "2012-01-01",
        "order": 20
      },
      {
        "place_id": "El_Dorado__CA",
        "date": "2012-01-01",
        "order": 21
      },
      {
        "place_id": "San_Joaquin__CA",
        "date": "2012-01-01",
        "order": 22
      },
      {
        "place_id": "Stanislaus__CA",
        "date": "2012-01-01",
        "order": 23
      },
      {
        "place_id": "Merced__CA",
        "date": "2012-01-01",
        "order": 24
      },
      {
        "place_id": "Tuolumne__CA",
        "date": "2012-01-01",
        "order": 25
      },
      {
        "place_id": "yosemite",
        "date": "2006-07-30",
        "order": "Yosemite"
      },
      {
        "place_id": "Mariposa__CA",
        "date": "2012-01-01",
        "order": 26
      },
      {
        "place_id": "San_Benito__CA",
        "date": "2012-01-01",
        "order": 27
      },
      {
        "place_id": "Monterey__CA",
        "date": "2012-01-01",
        "order": 28
      },
      {
        "place_id": "Fresno__CA",
        "date": "2012-01-01",
        "order": 29
      },
      {
        "place_id": "Kings__CA",
        "date": "2012-01-01",
        "order": 30
      },
      {
        "place_id": "Kern__CA",
        "date": "2012-01-01",
        "order": 31
      },
      {
        "place_id": "Los_Angeles__CA",
        "date": "2012-01-01",
        "order": 32
      },
      {
        "place_id": "San_Bernardino__CA",
        "date": "2012-01-01",
        "order": 33
      },
      {
        "place_id": "Clark__NV",
        "date": "2012-01-01",
        "order": 34
      },
      {
        "place_id": "OR",
        "date": "2008-10-04",
        "order": "Oregon"
      },
      {
        "place_id": "Klamath__OR",
        "date": "2016-08-06",
        "order": 2
      }
    ]
  },
  {
    "trip_name": "Summer in Florida",
    "description": "",
    "visits": [
      {
        "place_id": "FL",
        "date": "2013-06-18",
        "order": "Florida"
      },
      {
        "place_id": "Duval__FL",
        "date": "2013-06-18",
        "order": 1
      },
      {
        "place_id": "Clay__FL",
        "date": "2013-06-19",
        "order": 2
      },
      {
        "place_id": "Bradford__FL",
        "date": "2013-06-19",
        "order": 3
      },
      {
        "place_id": "Alachua__FL",
        "date": "2013-06-19",
        "order": 4
      },
      {
        "place_id": "Putnam__FL",
        "date": "2013-06-22",
        "order": 5
      },
      {
        "place_id": "St__Johns__FL",
        "date": "2013-06-22",
        "order": 6
      },
      {
        "place_id": "Flagler__FL",
        "date": "2013-06-22",
        "order": 7
      },
      {
        "place_id": "Volusia__FL",
        "date": "2013-06-22",
        "order": 8
      },
      {
        "place_id": "Brevard__FL",
        "date": "2013-06-23",
        "order": 9
      },
      {
        "place_id": "Orange__FL",
        "date": "2013-06-23",
        "order": 10
      },
      {
        "place_id": "Seminole__FL",
        "date": "2013-06-23",
        "order": 11
      },
      {
        "place_id": "Lake__FL",
        "date": "2013-06-23",
        "order": 12
      },
      {
        "place_id": "Marion__FL",
        "date": "2013-06-23",
        "order": 13
      }
    ]
  },
  {
    "trip_name": "Sequoia & Kings Canyon",
    "description": "",
    "visits": [
      {
        "place_id": "Tulare__CA",
        "date": "2013-07-15",
        "order": 1
      },
      {
        "place_id": "sequoia",
        "date": "2013-07-18",
        "order": "Sequoia"
      },
      {
        "place_id": "kingsCanyon",
        "date": "2013-07-20",
        "order": "Kings Canyon"
      },
      {
        "place_id": "Madera__CA",
        "date": "2013-07-15",
        "order": 2
      }
    ]
  },
  {
    "trip_name": "Down the Coast",
    "description": "",
    "visits": [
      {
        "place_id": "Ventura__CA",
        "date": "2014-06-11",
        "order": 1
      },
      {
        "place_id": "Santa_Barbara__CA",
        "date": "2014-06-12",
        "order": 2
      },
      {
        "place_id": "San_Luis_Obispo__CA",
        "date": "2014-06-13",
        "order": 3
      },
      {
        "place_id": "Orange__CA",
        "date": "2014-06-14",
        "order": 4
      },
      {
        "place_id": "San_Diego__CA",
        "date": "2014-06-15",
        "order": 5
      }
    ]
  },
  {
    "trip_name": "Winter in Florida",
    "description": "",
    "visits": [
      {
        "place_id": "Miami_Dade__FL",
        "date": "2014-12-11",
        "order": 1
      },
      {
        "place_id": "Broward__FL",
        "date": "2014-12-12",
        "order": 2
      },
      {
        "place_id": "Palm_Beach__FL",
        "date": "2014-12-13",
        "order": 3
      },
      {
        "place_id": "St__Lucie__FL",
        "date": "2014-12-14",
        "order": 4
      },
      {
        "place_id": "Martin__FL",
        "date": "2014-12-15",
        "order": 5
      },
      {
        "place_id": "Indian_River__FL",
        "date": "2014-12-16",
        "order": 6
      },
      {
        "place_id": "Sumter__FL",
        "date": "2014-12-17",
        "order": 7
      },
      {
        "place_id": "Hernando__FL",
        "date": "2014-12-18",
        "order": 8
      },
      {
        "place_id": "Pasco__FL",
        "date": "2014-12-19",
        "order": 9
      },
      {
        "place_id": "Hillsborough__FL",
        "date": "2014-12-20",
        "order": 10
      },
      {
        "place_id": "Manatee__FL",
        "date": "2014-12-20",
        "order": 11
      },
      {
        "place_id": "Sarasota__FL",
        "date": "2014-12-20",
        "order": 12
      },
      {
        "place_id": "DeSoto__FL",
        "date": "2014-12-20",
        "order": 13
      },
      {
        "place_id": "Charlotte__FL",
        "date": "2014-12-20",
        "order": 14
      },
      {
        "place_id": "Lee__FL",
        "date": "2014-12-20",
        "order": 15
      },
      {
        "place_id": "Collier__FL",
        "date": "2014-12-20",
        "order": 16
      }
    ]
  },
  {
    "trip_name": "The Big Apple",
    "description": "",
    "visits": [
      {
        "place_id": "NY",
        "date": "2015-04-10",
        "order": "New York"
      },
      {
        "place_id": "Queens__NY",
        "date": "2015-04-12",
        "order": 1
      },
      {
        "place_id": "Kings__NY",
        "date": "2015-04-12",
        "order": 2
      },
      {
        "place_id": "New_York__NY",
        "date": "2015-04-12",
        "order": 3
      }
    ]
  },
  {
    "trip_name": "395 to Vegas",
    "description": "",
    "visits": [
      {
        "place_id": "Mono__CA",
        "date": "2015-12-25",
        "order": 1
      },
      {
        "place_id": "Inyo__CA",
        "date": "2015-12-25",
        "order": 2
      },
      {
        "place_id": "Esmeralda__NV",
        "date": "2015-12-25",
        "order": 3
      },
      {
        "place_id": "Nye__NV",
        "date": "2015-12-25",
        "order": 4
      }
    ]
  },
  {
    "trip_name": "DC",
    "description": "",
    "visits": [
      {
        "place_id": "VA",
        "date": "2016-04-15",
        "order": "Virginia"
      },
      {
        "place_id": "Loudoun__VA",
        "date": "2016-04-14",
        "order": 1
      },
      {
        "place_id": "Fairfax_Co___VA",
        "date": "2016-04-14",
        "order": 2
      },
      {
        "place_id": "Fairfax__VA",
        "date": "2016-04-14",
        "order": 3
      },
      {
        "place_id": "Arlington__VA",
        "date": "2016-04-15",
        "order": 4
      },
      {
        "place_id": "DC",
        "date": "2016-04-16",
        "order": "District of Columbia"
      },
      {
        "place_id": "Washington__DC",
        "date": "2016-04-15",
        "order": 5
      },
      {
        "place_id": "Alexandria__VA",
        "date": "2016-04-15",
        "order": 6
      },
      {
        "place_id": "MD",
        "date": "2016-04-18",
        "order": "Maryland"
      },
      {
        "place_id": "Montgomery__MD",
        "date": "2016-04-17",
        "order": 7
      },
      {
        "place_id": "Prince_George_s__MD",
        "date": "2016-04-17",
        "order": 8
      },
      {
        "place_id": "Howard__MD",
        "date": "2016-04-17",
        "order": 9
      },
      {
        "place_id": "Baltimore_County__MD",
        "date": "2016-04-17",
        "order": 10
      },
      {
        "place_id": "Baltimore_City__MD",
        "date": "2016-04-17",
        "order": 11
      },
      {
        "place_id": "Anne_Arundel__MD",
        "date": "2016-04-17",
        "order": 12
      },
      {
        "place_id": "Queen_Anne_s__MD",
        "date": "2016-04-17",
        "order": 13
      }
    ]
  },
  {
    "trip_name": "Houseboating in Shasta",
    "description": "",
    "visits": [
      {
        "place_id": "Glenn__CA",
        "date": "2016-05-26",
        "order": 1
      },
      {
        "place_id": "Tehama__CA",
        "date": "2016-05-26",
        "order": 2
      },
      {
        "place_id": "Shasta__CA",
        "date": "2016-05-26",
        "order": 3
      }
    ]
  },
  {
    "trip_name": "Lassen, Crater Lake, Redwoods",
    "description": "",
    "visits": [
      {
        "place_id": "lassenVolcanic",
        "date": "2016-08-05",
        "order": "Lassen Volcanic"
      },
      {
        "place_id": "Siskiyou__CA",
        "date": "2016-08-06",
        "order": 1
      },
      {
        "place_id": "Klamath__OR",
        "date": "2016-08-06",
        "order": 2
      },
      {
        "place_id": "craterLake",
        "date": "2016-08-07",
        "order": "Crater Lake"
      },
      {
        "place_id": "Jackson__OR",
        "date": "2016-08-08",
        "order": 3
      },
      {
        "place_id": "Josephine__OR",
        "date": "2016-08-08",
        "order": 4
      },
      {
        "place_id": "Del_Norte__CA",
        "date": "2016-08-08",
        "order": 5
      },
      {
        "place_id": "Humboldt__CA",
        "date": "2016-08-09",
        "order": 6
      },
      {
        "place_id": "redwood",
        "date": "2016-08-09",
        "order": "Redwood"
      },
      {
        "place_id": "Mendocino__CA",
        "date": "2016-08-10",
        "order": 7
      }
    ]
  },
  {
    "trip_name": "Cambodia",
    "description": "",
    "visits": [
      {
        "place_id": "Cambodia",
        "date": "2017-10-04",
        "order": "Cambodia"
      }
    ]
  },
  {
    "trip_name": "Big Island",
    "description": "",
    "visits": [
      {
        "place_id": "HI",
        "date": "2018-02-20",
        "order": "Hawaii"
      },
      {
        "place_id": "Hawaii__HI",
        "date": "2018-02-18",
        "order": 1
      },
      {
        "place_id": "hawaiiVolcanoes",
        "date": "2018-02-22",
        "order": "Hawaii Volcanoes"
      }
    ]
  },
  {
    "trip_name": "Quebec",
    "description": "",
    "visits": [
      {
        "place_id": "Canada",
        "date": "2018-06-20",
        "order": "Canada"
      }
    ]
  },
  {
    "trip_name": "Northern Tier",
    "description": "",
    "visits": [
      {
        "place_id": "MN",
        "date": "2018-07-14",
        "order": "Minnesota"
      },
      {
        "place_id": "Hennepin__MN",
        "date": "2018-07-14",
        "order": 1
      },
      {
        "place_id": "Ramsey__MN",
        "date": "2018-07-15",
        "order": 2
      },
      {
        "place_id": "Anoka__MN",
        "date": "2018-07-15",
        "order": 3
      },
      {
        "place_id": "Washington__MN",
        "date": "2018-07-15",
        "order": 4
      },
      {
        "place_id": "Chisago__MN",
        "date": "2018-07-15",
        "order": 5
      },
      {
        "place_id": "Pine__MN",
        "date": "2018-07-15",
        "order": 6
      },
      {
        "place_id": "Carlton__MN",
        "date": "2018-07-15",
        "order": 7
      },
      {
        "place_id": "St__Louis__MN",
        "date": "2018-07-15",
        "order": 8
      },
      {
        "place_id": "Lake__MN",
        "date": "2018-07-15",
        "order": 9
      }
    ]
  },
  {
    "trip_name": "London 2019 New Year's Day Parade",
    "description": "",
    "visits": [
      {
        "place_id": "United_Kingdom",
        "date": "2018-12-26",
        "order": "United Kingdom"
      }
    ]
  },
  {
    "trip_name": "Spain",
    "description": "",
    "visits": [
      {
        "place_id": "Spain",
        "date": "2019-04-20",
        "order": "Spain"
      }
    ]
  },
  {
    "trip_name": "GYSO Baltic Tour",
    "description": "",
    "visits": [
      {
        "place_id": "Sweden",
        "date": "2019-06-30",
        "order": "Sweden"
      },
      {
        "place_id": "Finland",
        "date": "2019-07-01",
        "order": "Finland"
      },
      {
        "place_id": "Russia",
        "date": "2019-07-03",
        "order": "Russia"
      }
    ]
  },
  {
    "trip_name": "Utah in Snow",
    "description": "",
    "visits": [
      {
        "place_id": "AZ",
        "date": "2019-12-20",
        "order": "Arizona"
      },
      {
        "place_id": "Mohave__AZ",
        "date": "2019-12-21",
        "order": 1
      },
      {
        "place_id": "UT",
        "date": "2019-12-20",
        "order": "Utah"
      },
      {
        "place_id": "Washington__UT",
        "date": "2019-12-21",
        "order": 2
      },
      {
        "place_id": "zion",
        "date": "2019-12-20",
        "order": "Zion"
      },
      {
        "place_id": "Kane__UT",
        "date": "2019-12-22",
        "order": 3
      },
      {
        "place_id": "bryceCanyon",
        "date": "2019-12-20",
        "order": "Bryce Canyon"
      },
      {
        "place_id": "Garfield__UT",
        "date": "2019-12-22",
        "order": 4
      },
      {
        "place_id": "Piute__UT",
        "date": "2019-12-24",
        "order": 5
      },
      {
        "place_id": "Wayne__UT",
        "date": "2019-12-24",
        "order": 6
      },
      {
        "place_id": "Sevier__UT",
        "date": "2019-12-24",
        "order": 7
      },
      {
        "place_id": "Emery__UT",
        "date": "2019-12-25",
        "order": 8
      },
      {
        "place_id": "capitolReef",
        "date": "2019-12-20",
        "order": "Capitol Reef"
      },
      {
        "place_id": "Grand__UT",
        "date": "2019-12-25",
        "order": 9
      },
      {
        "place_id": "San_Juan__UT",
        "date": "2019-12-25",
        "order": 10
      },
      {
        "place_id": "canyonlands",
        "date": "2019-12-20",
        "order": "Canyonlands"
      },
      {
        "place_id": "arches",
        "date": "2019-12-20",
        "order": "Arches"
      },
      {
        "place_id": "Carbon__UT",
        "date": "2019-12-29",
        "order": 11
      },
      {
        "place_id": "Utah__UT",
        "date": "2019-12-29",
        "order": 12
      },
      {
        "place_id": "Wasatch__UT",
        "date": "2019-12-29",
        "order": 13
      },
      {
        "place_id": "Salt_Lake__UT",
        "date": "2019-12-29",
        "order": 14
      },
      {
        "place_id": "Davis__UT",
        "date": "2019-12-30",
        "order": 15
      }
    ]
  },
  {
    "trip_name": "Mt Rainier on My Permit",
    "description": "",
    "visits": [
      {
        "place_id": "Deschutes__OR",
        "date": "2020-08-07",
        "order": 1
      },
      {
        "place_id": "Jefferson__OR",
        "date": "2020-08-07",
        "order": 2
      },
      {
        "place_id": "Wasco__OR",
        "date": "2020-08-07",
        "order": 3
      },
      {
        "place_id": "Sherman__OR",
        "date": "2020-08-07",
        "order": 4
      },
      {
        "place_id": "WA",
        "date": "2020-08-06",
        "order": "Washington"
      },
      {
        "place_id": "Klickitat__WA",
        "date": "2020-08-07",
        "order": 5
      },
      {
        "place_id": "Yakima__WA",
        "date": "2020-08-07",
        "order": 6
      },
      {
        "place_id": "Lewis__WA",
        "date": "2020-08-07",
        "order": 7
      },
      {
        "place_id": "mountRainier",
        "date": "2020-08-06",
        "order": "Mount Rainier"
      },
      {
        "place_id": "Pierce__WA",
        "date": "2020-08-08",
        "order": 8
      },
      {
        "place_id": "Cowlitz__WA",
        "date": "2020-08-09",
        "order": 9
      },
      {
        "place_id": "Skamania__WA",
        "date": "2020-08-09",
        "order": 10
      },
      {
        "place_id": "Columbia__OR",
        "date": "2020-08-09",
        "order": 11
      },
      {
        "place_id": "Clatsop__OR",
        "date": "2020-08-09",
        "order": 12
      },
      {
        "place_id": "Tillamook__OR",
        "date": "2020-08-10",
        "order": 13
      },
      {
        "place_id": "Washington__OR",
        "date": "2020-08-10",
        "order": 14
      },
      {
        "place_id": "Multnomah__OR",
        "date": "2020-08-10",
        "order": 15
      },
      {
        "place_id": "Clackamas__OR",
        "date": "2020-08-10",
        "order": 16
      },
      {
        "place_id": "Marion__OR",
        "date": "2020-08-10",
        "order": 17
      },
      {
        "place_id": "Linn__OR",
        "date": "2020-08-10",
        "order": 18
      },
      {
        "place_id": "Lane__OR",
        "date": "2020-08-10",
        "order": 19
      },
      {
        "place_id": "Douglas__OR",
        "date": "2020-08-10",
        "order": 20
      }
    ]
  },
  {
    "trip_name": "Pinnacles",
    "description": "",
    "visits": [
      {
        "place_id": "pinnacles",
        "date": "2020-10-10",
        "order": "Pinnacles"
      }
    ]
  },
  {
    "trip_name": "Death Valley",
    "description": "",
    "visits": [
      {
        "place_id": "deathValley",
        "date": "2021-04-13",
        "order": "Death Valley"
      }
    ]
  },
  {
    "trip_name": "2021 Grand Loop",
    "description": "",
    "visits": [
      {
        "place_id": "Storey__NV",
        "date": "2021-06-10",
        "order": 1
      },
      {
        "place_id": "Lyon__NV",
        "date": "2021-06-10",
        "order": 2
      },
      {
        "place_id": "Churchill__NV",
        "date": "2021-06-10",
        "order": 3
      },
      {
        "place_id": "Pershing__NV",
        "date": "2021-06-10",
        "order": 4
      },
      {
        "place_id": "Humboldt__NV",
        "date": "2021-06-10",
        "order": 5
      },
      {
        "place_id": "Malheur__OR",
        "date": "2021-06-10",
        "order": 6
      },
      {
        "place_id": "ID",
        "date": "2021-06-10",
        "order": "Idaho"
      },
      {
        "place_id": "Owyhee__ID",
        "date": "2021-06-11",
        "order": 7
      },
      {
        "place_id": "Canyon__ID",
        "date": "2021-06-11",
        "order": 8
      },
      {
        "place_id": "Ada__ID",
        "date": "2021-06-11",
        "order": 9
      },
      {
        "place_id": "Elmore__ID",
        "date": "2021-06-11",
        "order": 10
      },
      {
        "place_id": "Gooding__ID",
        "date": "2021-06-11",
        "order": 11
      },
      {
        "place_id": "Jerome__ID",
        "date": "2021-06-11",
        "order": 12
      },
      {
        "place_id": "Twin_Falls__ID",
        "date": "2021-06-11",
        "order": 13
      },
      {
        "place_id": "Lincoln__ID",
        "date": "2021-06-11",
        "order": 14
      },
      {
        "place_id": "Blaine__ID",
        "date": "2021-06-11",
        "order": 15
      },
      {
        "place_id": "Butte__ID",
        "date": "2021-06-11",
        "order": 16
      },
      {
        "place_id": "Bingham__ID",
        "date": "2021-06-11",
        "order": 17
      },
      {
        "place_id": "Bonneville__ID",
        "date": "2021-06-11",
        "order": 18
      },
      {
        "place_id": "Teton__ID",
        "date": "2021-06-11",
        "order": 19
      },
      {
        "place_id": "WY",
        "date": "2021-06-12",
        "order": "Idaho"
      },
      {
        "place_id": "Teton__WY",
        "date": "2021-06-11",
        "order": 20
      },
      {
        "place_id": "grandTeton",
        "date": "2021-06-12",
        "order": "Grand Teton"
      },
      {
        "place_id": "Park__WY",
        "date": "2021-06-13",
        "order": 21
      },
      {
        "place_id": "yellowstone",
        "date": "2021-06-14",
        "order": "Yellowstone"
      },
      {
        "place_id": "MT",
        "date": "2021-06-14",
        "order": "Idaho"
      },
      {
        "place_id": "Gallatin__MT",
        "date": "2021-06-13",
        "order": 22
      },
      {
        "place_id": "Carbon__MT",
        "date": "2021-06-16",
        "order": 23
      },
      {
        "place_id": "Park__MT",
        "date": "2021-06-16",
        "order": 24
      },
      {
        "place_id": "Broadwater__MT",
        "date": "2021-06-17",
        "order": 25
      },
      {
        "place_id": "Jefferson__MT",
        "date": "2021-06-17",
        "order": 26
      },
      {
        "place_id": "Lewis_and_Clark__MT",
        "date": "2021-06-17",
        "order": 27
      },
      {
        "place_id": "Teton__MT",
        "date": "2021-06-17",
        "order": 28
      },
      {
        "place_id": "Pondera__MT",
        "date": "2021-06-17",
        "order": 29
      },
      {
        "place_id": "Glacier__MT",
        "date": "2021-06-17",
        "order": 30
      },
      {
        "place_id": "Flathead__MT",
        "date": "2021-06-19",
        "order": 31
      },
      {
        "place_id": "glacier",
        "date": "2021-06-17",
        "order": "Glacier"
      },
      {
        "place_id": "Lincoln__MT",
        "date": "2021-06-19",
        "order": 32
      },
      {
        "place_id": "Sanders__MT",
        "date": "2021-06-20",
        "order": 33
      },
      {
        "place_id": "Bonner__ID",
        "date": "2021-06-20",
        "order": 34
      },
      {
        "place_id": "Kootenai__ID",
        "date": "2021-06-20",
        "order": 35
      },
      {
        "place_id": "Spokane__WA",
        "date": "2021-06-20",
        "order": 36
      },
      {
        "place_id": "Lincoln__WA",
        "date": "2021-06-20",
        "order": 37
      },
      {
        "place_id": "Grant__WA",
        "date": "2021-06-20",
        "order": 38
      },
      {
        "place_id": "Douglas__WA",
        "date": "2021-06-20",
        "order": 39
      },
      {
        "place_id": "Okanogan__WA",
        "date": "2021-06-20",
        "order": 40
      },
      {
        "place_id": "Chelan__WA",
        "date": "2021-06-20",
        "order": 41
      },
      {
        "place_id": "Skagit__WA",
        "date": "2021-06-20",
        "order": 42
      },
      {
        "place_id": "northCascades",
        "date": "2021-06-20",
        "order": "North Cascades"
      },
      {
        "place_id": "Whatcom__WA",
        "date": "2021-06-20",
        "order": 43
      },
      {
        "place_id": "Snohomish__WA",
        "date": "2021-06-20",
        "order": 44
      },
      {
        "place_id": "King__WA",
        "date": "2021-06-20",
        "order": 45
      },
      {
        "place_id": "Kitsap__WA",
        "date": "2021-06-24",
        "order": 46
      },
      {
        "place_id": "Jefferson__WA",
        "date": "2021-06-24",
        "order": 47
      },
      {
        "place_id": "Clallam__WA",
        "date": "2021-06-24",
        "order": 48
      },
      {
        "place_id": "olympic",
        "date": "2021-06-25",
        "order": "Olympic"
      },
      {
        "place_id": "Grays_Harbor__WA",
        "date": "2021-06-26",
        "order": 49
      },
      {
        "place_id": "Thurston__WA",
        "date": "2021-06-26",
        "order": 50
      },
      {
        "place_id": "Clark__WA",
        "date": "2021-06-26",
        "order": 51
      }
    ]
  },
  {
    "trip_name": "Winter in Arizona",
    "description": "",
    "visits": [
      {
        "place_id": "Riverside__CA",
        "date": "2021-12-20",
        "order": 1
      },
      {
        "place_id": "joshuaTree",
        "date": "2021-12-20",
        "order": "Joshua Tree"
      },
      {
        "place_id": "La_Paz__AZ",
        "date": "2021-12-21",
        "order": 2
      },
      {
        "place_id": "Maricopa__AZ",
        "date": "2021-12-21",
        "order": 3
      },
      {
        "place_id": "Pinal__AZ",
        "date": "2021-12-21",
        "order": 4
      },
      {
        "place_id": "Pima__AZ",
        "date": "2021-12-21",
        "order": 5
      },
      {
        "place_id": "saguaro",
        "date": "2021-12-21",
        "order": "Saguaro"
      },
      {
        "place_id": "Yavapai__AZ",
        "date": "2021-12-24",
        "order": 6
      },
      {
        "place_id": "Coconino__AZ",
        "date": "2021-12-27",
        "order": 7
      },
      {
        "place_id": "grandCanyon",
        "date": "2021-12-26",
        "order": "Grand Canyon"
      }
    ]
  },
  {
    "trip_name": "Southern College Tour",
    "description": "",
    "visits": [
      {
        "place_id": "GA",
        "date": "2022-08-08",
        "order": "Georgia"
      },
      {
        "place_id": "Clayton__GA",
        "date": "2022-02-21",
        "order": 1
      },
      {
        "place_id": "Fulton__GA",
        "date": "2022-08-08",
        "order": 2
      },
      {
        "place_id": "DeKalb__GA",
        "date": "2022-02-21",
        "order": 3
      },
      {
        "place_id": "Cobb__GA",
        "date": "2022-02-22",
        "order": 4
      },
      {
        "place_id": "Henry__GA",
        "date": "2022-02-23",
        "order": 5
      },
      {
        "place_id": "Spalding__GA",
        "date": "2022-02-23",
        "order": 6
      },
      {
        "place_id": "Butts__GA",
        "date": "2022-02-23",
        "order": 7
      },
      {
        "place_id": "Lamar__GA",
        "date": "2022-02-23",
        "order": 8
      },
      {
        "place_id": "Monroe__GA",
        "date": "2022-02-23",
        "order": 9
      },
      {
        "place_id": "Bibb__GA",
        "date": "2022-02-23",
        "order": 10
      },
      {
        "place_id": "Twiggs__GA",
        "date": "2022-02-23",
        "order": 11
      },
      {
        "place_id": "Bleckley__GA",
        "date": "2022-02-23",
        "order": 12
      },
      {
        "place_id": "Laurens__GA",
        "date": "2022-02-23",
        "order": 13
      },
      {
        "place_id": "Treutlen__GA",
        "date": "2022-02-23",
        "order": 14
      },
      {
        "place_id": "Emanuel__GA",
        "date": "2022-02-23",
        "order": 15
      },
      {
        "place_id": "Candler__GA",
        "date": "2022-02-23",
        "order": 16
      },
      {
        "place_id": "Bulloch__GA",
        "date": "2022-02-23",
        "order": 17
      },
      {
        "place_id": "Bryan__GA",
        "date": "2022-02-23",
        "order": 18
      },
      {
        "place_id": "Effingham__GA",
        "date": "2022-02-23",
        "order": 19
      },
      {
        "place_id": "Chatham__GA",
        "date": "2022-02-23",
        "order": 20
      },
      {
        "place_id": "SC",
        "date": "2022-02-23",
        "order": "South Carolina"
      },
      {
        "place_id": "Jasper__SC",
        "date": "2022-02-24",
        "order": 21
      },
      {
        "place_id": "Beaufort__SC",
        "date": "2022-02-24",
        "order": 22
      },
      {
        "place_id": "Hampton__SC",
        "date": "2022-02-24",
        "order": 23
      },
      {
        "place_id": "Colleton__SC",
        "date": "2022-02-24",
        "order": 24
      },
      {
        "place_id": "Charleston__SC",
        "date": "2022-02-24",
        "order": 25
      },
      {
        "place_id": "Berkeley__SC",
        "date": "2022-02-25",
        "order": 26
      },
      {
        "place_id": "Dorchester__SC",
        "date": "2022-02-25",
        "order": 27
      },
      {
        "place_id": "Orangeburg__SC",
        "date": "2022-02-25",
        "order": 28
      },
      {
        "place_id": "Calhoun__SC",
        "date": "2022-02-25",
        "order": 29
      },
      {
        "place_id": "Lexington__SC",
        "date": "2022-02-25",
        "order": 30
      },
      {
        "place_id": "Richland__SC",
        "date": "2022-02-25",
        "order": 31
      },
      {
        "place_id": "Fairfield__SC",
        "date": "2022-02-25",
        "order": 32
      },
      {
        "place_id": "Chester__SC",
        "date": "2022-02-25",
        "order": 33
      },
      {
        "place_id": "York__SC",
        "date": "2022-02-25",
        "order": 34
      },
      {
        "place_id": "NC",
        "date": "2022-02-24",
        "order": "North Carolina"
      },
      {
        "place_id": "Mecklenburg__NC",
        "date": "2022-02-25",
        "order": 35
      },
      {
        "place_id": "Cabarrus__NC",
        "date": "2022-02-25",
        "order": 36
      },
      {
        "place_id": "Rowan__NC",
        "date": "2022-02-25",
        "order": 37
      },
      {
        "place_id": "Davidson__NC",
        "date": "2022-02-25",
        "order": 38
      },
      {
        "place_id": "Randolph__NC",
        "date": "2022-02-25",
        "order": 39
      },
      {
        "place_id": "Guilford__NC",
        "date": "2022-02-25",
        "order": 40
      },
      {
        "place_id": "Alamance__NC",
        "date": "2022-02-25",
        "order": 41
      },
      {
        "place_id": "Orange__NC",
        "date": "2022-02-25",
        "order": 42
      },
      {
        "place_id": "Durham__NC",
        "date": "2022-02-25",
        "order": 43
      },
      {
        "place_id": "Wake__NC",
        "date": "2022-02-25",
        "order": 44
      }
    ]
  },
  {
    "trip_name": "Hawaii Band Trip",
    "description": "",
    "visits": [
      {
        "place_id": "Honolulu__HI",
        "date": "2022-03-19",
        "order": 1
      },
      {
        "place_id": "Maui__HI",
        "date": "2022-03-24",
        "order": 2
      }
    ]
  },
  {
    "trip_name": "Wildflowers in NorCal",
    "description": "",
    "visits": [
      {
        "place_id": "Yuba__CA",
        "date": "2022-04-11",
        "order": 1
      },
      {
        "place_id": "Butte__CA",
        "date": "2022-04-11",
        "order": 2
      },
      {
        "place_id": "Sutter__CA",
        "date": "2022-04-12",
        "order": 3
      }
    ]
  },
  {
    "trip_name": "CYS Central Europe Tour",
    "description": "",
    "visits": [
      {
        "place_id": "Czechia",
        "date": "2022-06-27",
        "order": "Czech Republic"
      },
      {
        "place_id": "Poland",
        "date": "2022-06-29",
        "order": "Poland"
      },
      {
        "place_id": "Slovakia",
        "date": "2022-07-01",
        "order": "Slovakia"
      },
      {
        "place_id": "Hungary",
        "date": "2022-07-01",
        "order": "Hungary"
      }
    ]
  },
  {
    "trip_name": "Senior Trip to Banff",
    "description": "",
    "visits": [
      {
        "place_id": "Amador__CA",
        "date": "2022-07-11",
        "order": 1
      },
      {
        "place_id": "Alpine__CA",
        "date": "2022-07-11",
        "order": 2
      },
      {
        "place_id": "Lander__NV",
        "date": "2022-07-12",
        "order": 3
      },
      {
        "place_id": "Eureka__NV",
        "date": "2022-07-12",
        "order": 4
      },
      {
        "place_id": "White_Pine__NV",
        "date": "2022-07-12",
        "order": 5
      },
      {
        "place_id": "greatBasin",
        "date": "2022-07-12",
        "order": "Great Basin"
      },
      {
        "place_id": "Millard__UT",
        "date": "2022-07-13",
        "order": 6
      },
      {
        "place_id": "Juab__UT",
        "date": "2022-07-13",
        "order": 7
      },
      {
        "place_id": "Weber__UT",
        "date": "2022-07-15",
        "order": 8
      },
      {
        "place_id": "Box_Elder__UT",
        "date": "2022-07-15",
        "order": 9
      },
      {
        "place_id": "Oneida__ID",
        "date": "2022-07-15",
        "order": 10
      },
      {
        "place_id": "Bannock__ID",
        "date": "2022-07-15",
        "order": 11
      },
      {
        "place_id": "Custer__ID",
        "date": "2022-07-16",
        "order": 12
      },
      {
        "place_id": "Lemhi__ID",
        "date": "2022-07-17",
        "order": 13
      },
      {
        "place_id": "Ravalli__MT",
        "date": "2022-07-17",
        "order": 14
      },
      {
        "place_id": "Missoula__MT",
        "date": "2022-07-17",
        "order": 15
      },
      {
        "place_id": "Lake__MT",
        "date": "2022-07-17",
        "order": 16
      },
      {
        "place_id": "Hood_River__OR",
        "date": "2022-07-25",
        "order": 17
      },
      {
        "place_id": "Trinity__CA",
        "date": "2022-07-26",
        "order": 18
      }
    ]
  },
  {
    "trip_name": "Home to College",
    "description": "",
    "visits": [
      {
        "place_id": "Navajo__AZ",
        "date": "2022-07-31",
        "order": 1
      },
      {
        "place_id": "petrifiedForest",
        "date": "2022-07-31",
        "order": "Petrified Forest"
      },
      {
        "place_id": "Apache__AZ",
        "date": "2022-07-31",
        "order": 2
      },
      {
        "place_id": "NM",
        "date": "2022-08-01",
        "order": "New Mexico"
      },
      {
        "place_id": "McKinley__NM",
        "date": "2022-07-31",
        "order": 3
      },
      {
        "place_id": "Cibola__NM",
        "date": "2022-07-31",
        "order": 4
      },
      {
        "place_id": "Bernalillo__NM",
        "date": "2022-07-31",
        "order": 5
      },
      {
        "place_id": "Sandoval__NM",
        "date": "2022-07-31",
        "order": 6
      },
      {
        "place_id": "Santa_Fe__NM",
        "date": "2022-07-31",
        "order": 7
      },
      {
        "place_id": "Rio_Arriba__NM",
        "date": "2022-08-01",
        "order": 8
      },
      {
        "place_id": "Taos__NM",
        "date": "2022-08-01",
        "order": 9
      },
      {
        "place_id": "Colfax__NM",
        "date": "2022-08-02",
        "order": 10
      },
      {
        "place_id": "Union__NM",
        "date": "2022-08-02",
        "order": 11
      },
      {
        "place_id": "TX",
        "date": "2022-08-02",
        "order": "Texas"
      },
      {
        "place_id": "Dallam__TX",
        "date": "2022-08-02",
        "order": 12
      },
      {
        "place_id": "Hartley__TX",
        "date": "2022-08-02",
        "order": 13
      },
      {
        "place_id": "Oldham__TX",
        "date": "2022-08-02",
        "order": 14
      },
      {
        "place_id": "Potter__TX",
        "date": "2022-08-02",
        "order": 15
      },
      {
        "place_id": "Randall__TX",
        "date": "2022-08-02",
        "order": 16
      },
      {
        "place_id": "Carson__TX",
        "date": "2022-08-03",
        "order": 17
      },
      {
        "place_id": "Gray__TX",
        "date": "2022-08-03",
        "order": 18
      },
      {
        "place_id": "Donley__TX",
        "date": "2022-08-03",
        "order": 19
      },
      {
        "place_id": "Wheeler__TX",
        "date": "2022-08-03",
        "order": 20
      },
      {
        "place_id": "OK",
        "date": "2022-08-03",
        "order": "Oklahoma"
      },
      {
        "place_id": "Beckham__OK",
        "date": "2022-08-03",
        "order": 21
      },
      {
        "place_id": "Washita__OK",
        "date": "2022-08-03",
        "order": 22
      },
      {
        "place_id": "Custer__OK",
        "date": "2022-08-03",
        "order": 23
      },
      {
        "place_id": "Caddo__OK",
        "date": "2022-08-03",
        "order": 24
      },
      {
        "place_id": "Canadian__OK",
        "date": "2022-08-03",
        "order": 25
      },
      {
        "place_id": "Oklahoma__OK",
        "date": "2022-08-03",
        "order": 26
      },
      {
        "place_id": "Lincoln__OK",
        "date": "2022-08-04",
        "order": 27
      },
      {
        "place_id": "Creek__OK",
        "date": "2022-08-04",
        "order": 28
      },
      {
        "place_id": "Tulsa__OK",
        "date": "2022-08-04",
        "order": 29
      },
      {
        "place_id": "Wagoner__OK",
        "date": "2022-08-04",
        "order": 30
      },
      {
        "place_id": "Rogers__OK",
        "date": "2022-08-04",
        "order": 31
      },
      {
        "place_id": "Mayes__OK",
        "date": "2022-08-04",
        "order": 32
      },
      {
        "place_id": "Delaware__OK",
        "date": "2022-08-04",
        "order": 33
      },
      {
        "place_id": "AR",
        "date": "2022-08-04",
        "order": "Arkansas"
      },
      {
        "place_id": "Benton__AR",
        "date": "2022-08-04",
        "order": 34
      },
      {
        "place_id": "Washington__AR",
        "date": "2022-08-04",
        "order": 35
      },
      {
        "place_id": "Carroll__AR",
        "date": "2022-08-04",
        "order": 36
      },
      {
        "place_id": "MO",
        "date": "2022-08-05",
        "order": "Missouri"
      },
      {
        "place_id": "Barry__MO",
        "date": "2022-08-05",
        "order": 37
      },
      {
        "place_id": "McDonald__MO",
        "date": "2022-08-05",
        "order": 38
      },
      {
        "place_id": "Madison__AR",
        "date": "2022-08-06",
        "order": 39
      },
      {
        "place_id": "Newton__AR",
        "date": "2022-08-06",
        "order": 40
      },
      {
        "place_id": "Pope__AR",
        "date": "2022-08-06",
        "order": 41
      },
      {
        "place_id": "Conway__AR",
        "date": "2022-08-06",
        "order": 42
      },
      {
        "place_id": "Faulkner__AR",
        "date": "2022-08-06",
        "order": 43
      },
      {
        "place_id": "Pulaski__AR",
        "date": "2022-08-06",
        "order": 44
      },
      {
        "place_id": "Lonoke__AR",
        "date": "2022-08-06",
        "order": 45
      },
      {
        "place_id": "Prairie__AR",
        "date": "2022-08-06",
        "order": 46
      },
      {
        "place_id": "Monroe__AR",
        "date": "2022-08-06",
        "order": 47
      },
      {
        "place_id": "St__Francis__AR",
        "date": "2022-08-06",
        "order": 48
      },
      {
        "place_id": "Crittenden__AR",
        "date": "2022-08-06",
        "order": 49
      },
      {
        "place_id": "TN",
        "date": "2022-08-07",
        "order": "Tennessee"
      },
      {
        "place_id": "Shelby__TN",
        "date": "2022-08-06",
        "order": 50
      },
      {
        "place_id": "MS",
        "date": "2022-08-08",
        "order": "Mississippi"
      },
      {
        "place_id": "DeSoto__MS",
        "date": "2022-08-06",
        "order": 51
      },
      {
        "place_id": "Marshall__MS",
        "date": "2022-08-07",
        "order": 52
      },
      {
        "place_id": "Benton__MS",
        "date": "2022-08-07",
        "order": 53
      },
      {
        "place_id": "Union__MS",
        "date": "2022-08-07",
        "order": 54
      },
      {
        "place_id": "Lee__MS",
        "date": "2022-08-07",
        "order": 55
      },
      {
        "place_id": "Itawamba__MS",
        "date": "2022-08-07",
        "order": 56
      },
      {
        "place_id": "AL",
        "date": "2022-08-09",
        "order": "Alabama"
      },
      {
        "place_id": "Marion__AL",
        "date": "2022-08-07",
        "order": 57
      },
      {
        "place_id": "Winston__AL",
        "date": "2022-08-07",
        "order": 58
      },
      {
        "place_id": "Walker__AL",
        "date": "2022-08-07",
        "order": 59
      },
      {
        "place_id": "Jefferson__AL",
        "date": "2022-08-07",
        "order": 60
      },
      {
        "place_id": "St__Clair__AL",
        "date": "2022-08-08",
        "order": 61
      },
      {
        "place_id": "Talladega__AL",
        "date": "2022-08-08",
        "order": 62
      },
      {
        "place_id": "Calhoun__AL",
        "date": "2022-08-08",
        "order": 63
      },
      {
        "place_id": "Cleburne__AL",
        "date": "2022-08-08",
        "order": 64
      },
      {
        "place_id": "Haralson__GA",
        "date": "2022-08-08",
        "order": 65
      },
      {
        "place_id": "Carroll__GA",
        "date": "2022-08-08",
        "order": 66
      },
      {
        "place_id": "Douglas__GA",
        "date": "2022-08-08",
        "order": 67
      },
      {
        "place_id": "Rockdale__GA",
        "date": "2022-08-10",
        "order": 68
      },
      {
        "place_id": "Newton__GA",
        "date": "2022-08-10",
        "order": 69
      },
      {
        "place_id": "Walton__GA",
        "date": "2022-08-10",
        "order": 70
      },
      {
        "place_id": "Morgan__GA",
        "date": "2022-08-10",
        "order": 71
      },
      {
        "place_id": "Putnam__GA",
        "date": "2022-08-10",
        "order": 72
      }
    ]
  },
  {
    "trip_name": "Fall Break in the Smokies",
    "description": "",
    "visits": [
      {
        "place_id": "Forsyth__GA",
        "date": "2022-10-15",
        "order": 1
      },
      {
        "place_id": "Dawson__GA",
        "date": "2022-10-15",
        "order": 2
      },
      {
        "place_id": "Lumpkin__GA",
        "date": "2022-10-15",
        "order": 3
      },
      {
        "place_id": "Union__GA",
        "date": "2022-10-15",
        "order": 4
      },
      {
        "place_id": "Towns__GA",
        "date": "2022-10-15",
        "order": 5
      },
      {
        "place_id": "Cherokee__NC",
        "date": "2022-10-15",
        "order": 6
      },
      {
        "place_id": "Graham__NC",
        "date": "2022-10-15",
        "order": 7
      },
      {
        "place_id": "Swain__NC",
        "date": "2022-10-15",
        "order": 8
      },
      {
        "place_id": "greatSmokyMountains",
        "date": "2022-10-15",
        "order": "Great Smoky Mountains"
      },
      {
        "place_id": "Blount__TN",
        "date": "2022-10-16",
        "order": 9
      },
      {
        "place_id": "Sevier__TN",
        "date": "2022-10-16",
        "order": 10
      },
      {
        "place_id": "Cocke__TN",
        "date": "2022-10-16",
        "order": 11
      },
      {
        "place_id": "Haywood__NC",
        "date": "2022-10-16",
        "order": 12
      },
      {
        "place_id": "Jackson__NC",
        "date": "2022-10-17",
        "order": 13
      },
      {
        "place_id": "Macon__NC",
        "date": "2022-10-17",
        "order": 14
      },
      {
        "place_id": "Rabun__GA",
        "date": "2022-10-17",
        "order": 15
      },
      {
        "place_id": "Habersham__GA",
        "date": "2022-10-17",
        "order": 16
      },
      {
        "place_id": "Hall__GA",
        "date": "2022-10-17",
        "order": 17
      },
      {
        "place_id": "Gwinnett__GA",
        "date": "2022-10-17",
        "order": 18
      }
    ]
  },
  {
    "trip_name": "Music City Regatta",
    "description": "",
    "visits": [
      {
        "place_id": "Cherokee__GA",
        "date": "2022-10-29",
        "order": 1
      },
      {
        "place_id": "Bartow__GA",
        "date": "2022-10-29",
        "order": 2
      },
      {
        "place_id": "Gordon__GA",
        "date": "2022-10-29",
        "order": 3
      },
      {
        "place_id": "Whitfield__GA",
        "date": "2022-10-29",
        "order": 4
      },
      {
        "place_id": "Catoosa__GA",
        "date": "2022-10-29",
        "order": 5
      },
      {
        "place_id": "Hamilton__TN",
        "date": "2022-10-29",
        "order": 6
      },
      {
        "place_id": "Dade__GA",
        "date": "2022-10-29",
        "order": 7
      },
      {
        "place_id": "Marion__TN",
        "date": "2022-10-29",
        "order": 8
      },
      {
        "place_id": "Grundy__TN",
        "date": "2022-10-29",
        "order": 9
      },
      {
        "place_id": "Coffee__TN",
        "date": "2022-10-29",
        "order": 10
      },
      {
        "place_id": "Bedford__TN",
        "date": "2022-10-29",
        "order": 11
      },
      {
        "place_id": "Rutherford__TN",
        "date": "2022-10-29",
        "order": 12
      },
      {
        "place_id": "Davidson__TN",
        "date": "2022-10-29",
        "order": 13
      }
    ]
  },
  {
    "trip_name": "A Floridian Thanksgiving",
    "description": "",
    "visits": [
      {
        "place_id": "Peach__GA",
        "date": "2022-11-19",
        "order": 1
      },
      {
        "place_id": "Houston__GA",
        "date": "2022-11-19",
        "order": 2
      },
      {
        "place_id": "Dooly__GA",
        "date": "2022-11-19",
        "order": 3
      },
      {
        "place_id": "Crisp__GA",
        "date": "2022-11-19",
        "order": 4
      },
      {
        "place_id": "Turner__GA",
        "date": "2022-11-19",
        "order": 5
      },
      {
        "place_id": "Tift__GA",
        "date": "2022-11-19",
        "order": 6
      },
      {
        "place_id": "Cook__GA",
        "date": "2022-11-19",
        "order": 7
      },
      {
        "place_id": "Lowndes__GA",
        "date": "2022-11-19",
        "order": 8
      },
      {
        "place_id": "Hamilton__FL",
        "date": "2022-11-19",
        "order": 9
      },
      {
        "place_id": "Suwannee__FL",
        "date": "2022-11-19",
        "order": 10
      },
      {
        "place_id": "Columbia__FL",
        "date": "2022-11-19",
        "order": 11
      },
      {
        "place_id": "Union__FL",
        "date": "2022-11-19",
        "order": 12
      },
      {
        "place_id": "Pinellas__FL",
        "date": "2022-11-19",
        "order": 13
      },
      {
        "place_id": "Citrus__FL",
        "date": "2022-11-26",
        "order": 14
      }
    ]
  },
  {
    "trip_name": "Providence Canyon and Alabama",
    "description": "",
    "visits": [
      {
        "place_id": "Coweta__GA",
        "date": "2023-02-26",
        "order": 1
      },
      {
        "place_id": "Meriwether__GA",
        "date": "2023-02-26",
        "order": 2
      },
      {
        "place_id": "Troup__GA",
        "date": "2023-02-26",
        "order": 3
      },
      {
        "place_id": "Harris__GA",
        "date": "2023-02-26",
        "order": 4
      },
      {
        "place_id": "Muscogee__GA",
        "date": "2023-02-26",
        "order": 5
      },
      {
        "place_id": "Chattahoochee__GA",
        "date": "2023-02-26",
        "order": 6
      },
      {
        "place_id": "Stewart__GA",
        "date": "2023-02-26",
        "order": 7
      },
      {
        "place_id": "Quitman__GA",
        "date": "2023-02-26",
        "order": 8
      },
      {
        "place_id": "Barbour__AL",
        "date": "2023-02-26",
        "order": 9
      },
      {
        "place_id": "Bullock__AL",
        "date": "2023-02-26",
        "order": 10
      },
      {
        "place_id": "Montgomery__AL",
        "date": "2023-02-26",
        "order": 11
      },
      {
        "place_id": "Elmore__AL",
        "date": "2023-02-26",
        "order": 12
      },
      {
        "place_id": "Macon__AL",
        "date": "2023-02-26",
        "order": 13
      },
      {
        "place_id": "Lee__AL",
        "date": "2023-02-26",
        "order": 14
      },
      {
        "place_id": "Chambers__AL",
        "date": "2023-02-26",
        "order": 15
      }
    ]
  },
  {
    "trip_name": "SIRA '23",
    "description": "",
    "visits": [
      {
        "place_id": "Bradley__TN",
        "date": "2023-04-14",
        "order": 1
      },
      {
        "place_id": "McMinn__TN",
        "date": "2023-04-14",
        "order": 2
      },
      {
        "place_id": "Monroe__TN",
        "date": "2023-04-14",
        "order": 3
      },
      {
        "place_id": "Loudon__TN",
        "date": "2023-04-14",
        "order": 4
      },
      {
        "place_id": "Roane__TN",
        "date": "2023-04-14",
        "order": 5
      },
      {
        "place_id": "Anderson__TN",
        "date": "2023-04-14",
        "order": 6
      },
      {
        "place_id": "Knox__TN",
        "date": "2023-04-14",
        "order": 7
      }
    ]
  },
  {
    "trip_name": "Dad Vails '23",
    "description": "",
    "visits": [
      {
        "place_id": "PA",
        "date": "2023-05-12",
        "order": "Pennsylvania"
      },
      {
        "place_id": "Philadelphia__PA",
        "date": "2023-05-12",
        "order": 1
      },
      {
        "place_id": "NJ",
        "date": "2023-05-12",
        "order": "New Jersey"
      },
      {
        "place_id": "Camden__NJ",
        "date": "2023-05-12",
        "order": 2
      },
      {
        "place_id": "Burlington__NJ",
        "date": "2023-05-12",
        "order": 3
      },
      {
        "place_id": "Mercer__NJ",
        "date": "2023-05-12",
        "order": 4
      },
      {
        "place_id": "Bucks__PA",
        "date": "2023-05-13",
        "order": 5
      },
      {
        "place_id": "Delaware__PA",
        "date": "2023-05-13",
        "order": 6
      },
      {
        "place_id": "Chester__PA",
        "date": "2023-05-13",
        "order": 7
      }
    ]
  },
  {
    "trip_name": "Berlin Study Abroad",
    "description": "",
    "visits": [
      {
        "place_id": "Germany",
        "date": "2023-05-15",
        "order": "Germany"
      },
      {
        "place_id": "Austria",
        "date": "2023-05-27",
        "order": "Austria"
      },
      {
        "place_id": "France",
        "date": "2023-06-03",
        "order": "France"
      },
      {
        "place_id": "Switzerland",
        "date": "2023-07-09",
        "order": "Switzerland"
      }
    ]
  },
  {
    "trip_name": "HackMIT '23",
    "description": "",
    "visits": [
      {
        "place_id": "MA",
        "date": "2023-09-15",
        "order": "Massachusetts"
      },
      {
        "place_id": "Suffolk__MA",
        "date": "2023-09-15",
        "order": 1
      },
      {
        "place_id": "Middlesex__MA",
        "date": "2023-09-16",
        "order": 2
      }
    ]
  },
  {
    "trip_name": "Fall Break to Blue Ridge Parkway",
    "description": "",
    "visits": [
      {
        "place_id": "Stephens__GA",
        "date": "2023-10-07",
        "order": 1
      },
      {
        "place_id": "Franklin__GA",
        "date": "2023-10-07",
        "order": 2
      },
      {
        "place_id": "Banks__GA",
        "date": "2023-10-09",
        "order": 3
      },
      {
        "place_id": "Jackson__GA",
        "date": "2023-10-09",
        "order": 4
      },
      {
        "place_id": "Barrow__GA",
        "date": "2023-10-09",
        "order": 5
      },
      {
        "place_id": "Hart__GA",
        "date": "2023-10-09",
        "order": 6
      },
      {
        "place_id": "Oconee__SC",
        "date": "2023-10-09",
        "order": 7
      },
      {
        "place_id": "Anderson__SC",
        "date": "2023-10-09",
        "order": 8
      },
      {
        "place_id": "Greenville__SC",
        "date": "2023-10-09",
        "order": 9
      },
      {
        "place_id": "Spartanburg__SC",
        "date": "2023-10-09",
        "order": 10
      },
      {
        "place_id": "Polk__NC",
        "date": "2023-10-09",
        "order": 11
      },
      {
        "place_id": "Rutherford__NC",
        "date": "2023-10-09",
        "order": 12
      },
      {
        "place_id": "McDowell__NC",
        "date": "2023-10-09",
        "order": 13
      },
      {
        "place_id": "Yancey__NC",
        "date": "2023-10-09",
        "order": 14
      },
      {
        "place_id": "Buncombe__NC",
        "date": "2023-10-09",
        "order": 15
      },
      {
        "place_id": "Henderson__NC",
        "date": "2023-10-09",
        "order": 16
      },
      {
        "place_id": "Transylvania__NC",
        "date": "2023-10-09",
        "order": 17
      }
    ]
  },
  {
    "trip_name": "Head of the South Regatta",
    "description": "",
    "visits": [
      {
        "place_id": "Walker__GA",
        "date": "2023-11-11",
        "order": 1
      },
      {
        "place_id": "Greene__GA",
        "date": "2023-11-11",
        "order": 2
      },
      {
        "place_id": "Taliaferro__GA",
        "date": "2023-11-11",
        "order": 3
      },
      {
        "place_id": "Warren__GA",
        "date": "2023-11-11",
        "order": 4
      },
      {
        "place_id": "McDuffie__GA",
        "date": "2023-11-11",
        "order": 5
      },
      {
        "place_id": "Columbia__GA",
        "date": "2023-11-11",
        "order": 6
      },
      {
        "place_id": "Richmond__GA",
        "date": "2023-11-11",
        "order": 7
      }
    ]
  },
  {
    "trip_name": "Thanksgiving in NOLA",
    "description": "",
    "visits": [
      {
        "place_id": "LA",
        "date": "2023-11-20",
        "order": "Louisiana"
      },
      {
        "place_id": "Jefferson__LA",
        "date": "2023-11-20",
        "order": 1
      },
      {
        "place_id": "Orleans__LA",
        "date": "2023-11-20",
        "order": 2
      },
      {
        "place_id": "St__Tammany__LA",
        "date": "2023-11-22",
        "order": 3
      },
      {
        "place_id": "Tangipahoa__LA",
        "date": "2023-11-22",
        "order": 4
      },
      {
        "place_id": "St__John_the_Baptist__LA",
        "date": "2023-11-22",
        "order": 5
      },
      {
        "place_id": "St__James__LA",
        "date": "2023-11-22",
        "order": 6
      },
      {
        "place_id": "Lafourche__LA",
        "date": "2023-11-22",
        "order": 7
      },
      {
        "place_id": "Terrebonne__LA",
        "date": "2023-11-22",
        "order": 8
      },
      {
        "place_id": "St__Charles__LA",
        "date": "2023-11-22",
        "order": 9
      }
    ]
  },
  {
    "trip_name": "Spontaneous Cloudland Canyon Trip",
    "description": "",
    "visits": [
      {
        "place_id": "DeKalb__AL",
        "date": "2024-03-24",
        "order": 1
      },
      {
        "place_id": "Cherokee__AL",
        "date": "2024-03-24",
        "order": 2
      },
      {
        "place_id": "Floyd__GA",
        "date": "2024-03-24",
        "order": 3
      },
      {
        "place_id": "Polk__GA",
        "date": "2024-03-24",
        "order": 4
      },
      {
        "place_id": "Paulding__GA",
        "date": "2024-03-24",
        "order": 5
      }
    ]
  },
  {
    "trip_name": "Solar Eclipse Chasing",
    "description": "",
    "visits": [
      {
        "place_id": "Harris__TX",
        "date": "2024-04-05",
        "order": 1
      },
      {
        "place_id": "Fort_Bend__TX",
        "date": "2024-04-06",
        "order": 2
      },
      {
        "place_id": "Waller__TX",
        "date": "2024-04-06",
        "order": 3
      },
      {
        "place_id": "Grimes__TX",
        "date": "2024-04-06",
        "order": 4
      },
      {
        "place_id": "Brazos__TX",
        "date": "2024-04-06",
        "order": 5
      },
      {
        "place_id": "Robertson__TX",
        "date": "2024-04-06",
        "order": 6
      },
      {
        "place_id": "Falls__TX",
        "date": "2024-04-06",
        "order": 7
      },
      {
        "place_id": "McLennan__TX",
        "date": "2024-04-06",
        "order": 8
      },
      {
        "place_id": "Hill__TX",
        "date": "2024-04-06",
        "order": 9
      },
      {
        "place_id": "Johnson__TX",
        "date": "2024-04-06",
        "order": 10
      },
      {
        "place_id": "Tarrant__TX",
        "date": "2024-04-06",
        "order": 11
      },
      {
        "place_id": "Dallas__TX",
        "date": "2024-04-06",
        "order": 12
      },
      {
        "place_id": "Collin__TX",
        "date": "2024-04-06",
        "order": 13
      },
      {
        "place_id": "Grayson__TX",
        "date": "2024-04-06",
        "order": 14
      },
      {
        "place_id": "Bryan__OK",
        "date": "2024-04-06",
        "order": 15
      },
      {
        "place_id": "Marshall__OK",
        "date": "2024-04-07",
        "order": 16
      },
      {
        "place_id": "Atoka__OK",
        "date": "2024-04-07",
        "order": 17
      },
      {
        "place_id": "Pittsburg__OK",
        "date": "2024-04-07",
        "order": 18
      },
      {
        "place_id": "McIntosh__OK",
        "date": "2024-04-07",
        "order": 19
      },
      {
        "place_id": "Okmulgee__OK",
        "date": "2024-04-07",
        "order": 20
      },
      {
        "place_id": "Craig__OK",
        "date": "2024-04-07",
        "order": 21
      },
      {
        "place_id": "Ottawa__OK",
        "date": "2024-04-07",
        "order": 22
      },
      {
        "place_id": "Newton__MO",
        "date": "2024-04-07",
        "order": 23
      },
      {
        "place_id": "KS",
        "date": "2024-04-07",
        "order": "Kansas"
      },
      {
        "place_id": "Cherokee__KS",
        "date": "2024-04-07",
        "order": 24
      },
      {
        "place_id": "Jasper__MO",
        "date": "2024-04-07",
        "order": 25
      },
      {
        "place_id": "Lawrence__MO",
        "date": "2024-04-07",
        "order": 26
      },
      {
        "place_id": "Greene__MO",
        "date": "2024-04-07",
        "order": 27
      },
      {
        "place_id": "Christian__MO",
        "date": "2024-04-07",
        "order": 28
      },
      {
        "place_id": "Taney__MO",
        "date": "2024-04-07",
        "order": 29
      },
      {
        "place_id": "Boone__AR",
        "date": "2024-04-08",
        "order": 30
      },
      {
        "place_id": "Yell__AR",
        "date": "2024-04-08",
        "order": 31
      },
      {
        "place_id": "Saline__AR",
        "date": "2024-04-08",
        "order": 32
      },
      {
        "place_id": "Garland__AR",
        "date": "2024-04-08",
        "order": 33
      },
      {
        "place_id": "hotSprings",
        "date": "2024-04-08",
        "order": "Hot Springs"
      },
      {
        "place_id": "Hot_Spring__AR",
        "date": "2024-04-08",
        "order": 34
      },
      {
        "place_id": "Clark__AR",
        "date": "2024-04-08",
        "order": 35
      },
      {
        "place_id": "Nevada__AR",
        "date": "2024-04-08",
        "order": 36
      },
      {
        "place_id": "Hempstead__AR",
        "date": "2024-04-08",
        "order": 37
      },
      {
        "place_id": "Miller__AR",
        "date": "2024-04-08",
        "order": 38
      },
      {
        "place_id": "Bowie__TX",
        "date": "2024-04-08",
        "order": 39
      },
      {
        "place_id": "Cass__TX",
        "date": "2024-04-08",
        "order": 40
      },
      {
        "place_id": "Marion__TX",
        "date": "2024-04-08",
        "order": 41
      },
      {
        "place_id": "Harrison__TX",
        "date": "2024-04-08",
        "order": 42
      },
      {
        "place_id": "Panola__TX",
        "date": "2024-04-08",
        "order": 43
      },
      {
        "place_id": "Rusk__TX",
        "date": "2024-04-08",
        "order": 44
      },
      {
        "place_id": "Nacogdoches__TX",
        "date": "2024-04-08",
        "order": 45
      },
      {
        "place_id": "Angelina__TX",
        "date": "2024-04-08",
        "order": 46
      },
      {
        "place_id": "Polk__TX",
        "date": "2024-04-08",
        "order": 47
      },
      {
        "place_id": "San_Jacinto__TX",
        "date": "2024-04-08",
        "order": 48
      },
      {
        "place_id": "Liberty__TX",
        "date": "2024-04-08",
        "order": 49
      },
      {
        "place_id": "Montgomery__TX",
        "date": "2024-04-08",
        "order": 50
      }
    ]
  },
  {
    "trip_name": "Sassafras and Table Rock",
    "description": "",
    "visits": [
      {
        "place_id": "Pickens__SC",
        "date": "2024-05-05",
        "order": 1
      }
    ]
  },
  {
    "trip_name": "Dad Vails '24",
    "description": "",
    "visits": [
      {
        "place_id": "Cherokee__SC",
        "date": "2024-05-08",
        "order": 1
      },
      {
        "place_id": "Cleveland__NC",
        "date": "2024-05-08",
        "order": 2
      },
      {
        "place_id": "Gaston__NC",
        "date": "2024-05-08",
        "order": 3
      },
      {
        "place_id": "Rockingham__NC",
        "date": "2024-05-08",
        "order": 4
      },
      {
        "place_id": "Caswell__NC",
        "date": "2024-05-08",
        "order": 5
      },
      {
        "place_id": "Danville__VA",
        "date": "2024-05-08",
        "order": 6
      },
      {
        "place_id": "Pittsylvania__VA",
        "date": "2024-05-08",
        "order": 7
      },
      {
        "place_id": "Campbell__VA",
        "date": "2024-05-08",
        "order": 8
      },
      {
        "place_id": "Lynchburg__VA",
        "date": "2024-05-08",
        "order": 9
      },
      {
        "place_id": "Amherst__VA",
        "date": "2024-05-08",
        "order": 10
      },
      {
        "place_id": "Nelson__VA",
        "date": "2024-05-08",
        "order": 11
      },
      {
        "place_id": "Albemarle__VA",
        "date": "2024-05-08",
        "order": 12
      },
      {
        "place_id": "Charlottesville__VA",
        "date": "2024-05-08",
        "order": 13
      },
      {
        "place_id": "Greene__VA",
        "date": "2024-05-08",
        "order": 14
      },
      {
        "place_id": "Madison__VA",
        "date": "2024-05-08",
        "order": 15
      },
      {
        "place_id": "Culpeper__VA",
        "date": "2024-05-08",
        "order": 16
      },
      {
        "place_id": "Fauquier__VA",
        "date": "2024-05-08",
        "order": 17
      },
      {
        "place_id": "Prince_William__VA",
        "date": "2024-05-08",
        "order": 18
      },
      {
        "place_id": "Harford__MD",
        "date": "2024-05-09",
        "order": 19
      },
      {
        "place_id": "Cecil__MD",
        "date": "2024-05-09",
        "order": 20
      },
      {
        "place_id": "DE",
        "date": "2024-05-09",
        "order": "Delaware"
      },
      {
        "place_id": "New_Castle__DE",
        "date": "2024-05-09",
        "order": 21
      },
      {
        "place_id": "Salem__NJ",
        "date": "2024-05-09",
        "order": 22
      },
      {
        "place_id": "Gloucester__NJ",
        "date": "2024-05-09",
        "order": 23
      },
      {
        "place_id": "Monmouth__NJ",
        "date": "2024-05-09",
        "order": 24
      },
      {
        "place_id": "Middlesex__NJ",
        "date": "2024-05-09",
        "order": 25
      },
      {
        "place_id": "Stafford__VA",
        "date": "2024-05-12",
        "order": 26
      },
      {
        "place_id": "Fredericksburg__VA",
        "date": "2024-05-12",
        "order": 27
      },
      {
        "place_id": "Spotsylvania__VA",
        "date": "2024-05-12",
        "order": 28
      },
      {
        "place_id": "Caroline__VA",
        "date": "2024-05-12",
        "order": 29
      },
      {
        "place_id": "Hanover__VA",
        "date": "2024-05-12",
        "order": 30
      },
      {
        "place_id": "Henrico__VA",
        "date": "2024-05-12",
        "order": 31
      },
      {
        "place_id": "Richmond__VA",
        "date": "2024-05-12",
        "order": 32
      },
      {
        "place_id": "Chesterfield__VA",
        "date": "2024-05-12",
        "order": 33
      },
      {
        "place_id": "Colonial_Heights__VA",
        "date": "2024-05-12",
        "order": 34
      },
      {
        "place_id": "Petersburg__VA",
        "date": "2024-05-12",
        "order": 35
      },
      {
        "place_id": "Dinwiddie__VA",
        "date": "2024-05-12",
        "order": 36
      },
      {
        "place_id": "Brunswick__VA",
        "date": "2024-05-12",
        "order": 37
      },
      {
        "place_id": "Mecklenburg__VA",
        "date": "2024-05-12",
        "order": 38
      },
      {
        "place_id": "Warren__NC",
        "date": "2024-05-12",
        "order": 39
      },
      {
        "place_id": "Vance__NC",
        "date": "2024-05-12",
        "order": 40
      },
      {
        "place_id": "Granville__NC",
        "date": "2024-05-12",
        "order": 41
      }
    ]
  },
  {
    "trip_name": "Middle of Nowhere Pacific Northwest Loop",
    "description": "",
    "visits": [
      {
        "place_id": "Plumas__CA",
        "date": "2024-05-29",
        "order": 1
      },
      {
        "place_id": "Lassen__CA",
        "date": "2024-05-29",
        "order": 2
      },
      {
        "place_id": "Modoc__CA",
        "date": "2024-05-29",
        "order": 3
      },
      {
        "place_id": "Lake__OR",
        "date": "2024-05-29",
        "order": 4
      },
      {
        "place_id": "Harney__OR",
        "date": "2024-05-30",
        "order": 5
      },
      {
        "place_id": "Grant__OR",
        "date": "2024-05-31",
        "order": 6
      },
      {
        "place_id": "Wheeler__OR",
        "date": "2024-05-31",
        "order": 7
      },
      {
        "place_id": "Morrow__OR",
        "date": "2024-05-31",
        "order": 8
      },
      {
        "place_id": "Umatilla__OR",
        "date": "2024-06-01",
        "order": 9
      },
      {
        "place_id": "Benton__WA",
        "date": "2024-06-01",
        "order": 10
      },
      {
        "place_id": "Kittitas__WA",
        "date": "2024-06-01",
        "order": 11
      },
      {
        "place_id": "Pacific__WA",
        "date": "2024-06-03",
        "order": 12
      },
      {
        "place_id": "Lincoln__OR",
        "date": "2024-06-04",
        "order": 13
      },
      {
        "place_id": "Coos__OR",
        "date": "2024-06-04",
        "order": 14
      },
      {
        "place_id": "Curry__OR",
        "date": "2024-06-04",
        "order": 15
      }
    ]
  },
  {
    "trip_name": "Hitchhike Across America",
    "description": "",
    "visits": [
      {
        "place_id": "Cochise__AZ",
        "date": "2024-06-13",
        "order": 1
      },
      {
        "place_id": "Hidalgo__NM",
        "date": "2024-06-13",
        "order": 2
      },
      {
        "place_id": "Grant__NM",
        "date": "2024-06-13",
        "order": 3
      },
      {
        "place_id": "Luna__NM",
        "date": "2024-06-13",
        "order": 4
      },
      {
        "place_id": "Dona_Ana__NM",
        "date": "2024-06-13",
        "order": 5
      },
      {
        "place_id": "Otero__NM",
        "date": "2024-06-13",
        "order": 6
      },
      {
        "place_id": "whiteSands",
        "date": "2024-06-13",
        "order": "White Sands"
      },
      {
        "place_id": "Chaves__NM",
        "date": "2024-06-14",
        "order": 7
      },
      {
        "place_id": "Eddy__NM",
        "date": "2024-06-14",
        "order": 8
      },
      {
        "place_id": "Lea__NM",
        "date": "2024-06-14",
        "order": 9
      },
      {
        "place_id": "Andrews__TX",
        "date": "2024-06-14",
        "order": 10
      },
      {
        "place_id": "Martin__TX",
        "date": "2024-06-14",
        "order": 11
      },
      {
        "place_id": "Howard__TX",
        "date": "2024-06-14",
        "order": 12
      },
      {
        "place_id": "Glasscock__TX",
        "date": "2024-06-14",
        "order": 13
      },
      {
        "place_id": "Sterling__TX",
        "date": "2024-06-14",
        "order": 14
      },
      {
        "place_id": "Coke__TX",
        "date": "2024-06-14",
        "order": 15
      },
      {
        "place_id": "Tom_Green__TX",
        "date": "2024-06-14",
        "order": 16
      },
      {
        "place_id": "Concho__TX",
        "date": "2024-06-14",
        "order": 17
      },
      {
        "place_id": "McCulloch__TX",
        "date": "2024-06-14",
        "order": 18
      },
      {
        "place_id": "Mason__TX",
        "date": "2024-06-14",
        "order": 19
      },
      {
        "place_id": "San_Saba__TX",
        "date": "2024-06-14",
        "order": 20
      },
      {
        "place_id": "Llano__TX",
        "date": "2024-06-14",
        "order": 21
      },
      {
        "place_id": "Burnet__TX",
        "date": "2024-06-14",
        "order": 22
      },
      {
        "place_id": "Blanco__TX",
        "date": "2024-06-14",
        "order": 23
      },
      {
        "place_id": "Travis__TX",
        "date": "2024-06-14",
        "order": 24
      },
      {
        "place_id": "Bastrop__TX",
        "date": "2024-06-14",
        "order": 25
      },
      {
        "place_id": "Fayette__TX",
        "date": "2024-06-14",
        "order": 26
      },
      {
        "place_id": "Colorado__TX",
        "date": "2024-06-14",
        "order": 27
      },
      {
        "place_id": "Austin__TX",
        "date": "2024-06-14",
        "order": 28
      },
      {
        "place_id": "Galveston__TX",
        "date": "2024-06-15",
        "order": 29
      },
      {
        "place_id": "Chambers__TX",
        "date": "2024-06-15",
        "order": 30
      },
      {
        "place_id": "Jefferson__TX",
        "date": "2024-06-15",
        "order": 31
      },
      {
        "place_id": "Orange__TX",
        "date": "2024-06-15",
        "order": 32
      },
      {
        "place_id": "Calcasieu__LA",
        "date": "2024-06-15",
        "order": 33
      },
      {
        "place_id": "Jefferson_Davis__LA",
        "date": "2024-06-15",
        "order": 34
      },
      {
        "place_id": "Acadia__LA",
        "date": "2024-06-15",
        "order": 35
      },
      {
        "place_id": "Lafayette__LA",
        "date": "2024-06-15",
        "order": 36
      },
      {
        "place_id": "St__Martin__LA",
        "date": "2024-06-15",
        "order": 37
      },
      {
        "place_id": "Iberville__LA",
        "date": "2024-06-15",
        "order": 38
      },
      {
        "place_id": "West_Baton_Rouge__LA",
        "date": "2024-06-15",
        "order": 39
      },
      {
        "place_id": "East_Baton_Rouge__LA",
        "date": "2024-06-15",
        "order": 40
      },
      {
        "place_id": "Ascension__LA",
        "date": "2024-06-15",
        "order": 41
      },
      {
        "place_id": "St__Bernard__LA",
        "date": "2024-06-16",
        "order": 42
      },
      {
        "place_id": "Hancock__MS",
        "date": "2024-06-16",
        "order": 43
      },
      {
        "place_id": "Harrison__MS",
        "date": "2024-06-16",
        "order": 44
      },
      {
        "place_id": "Jackson__MS",
        "date": "2024-06-16",
        "order": 45
      },
      {
        "place_id": "Mobile__AL",
        "date": "2024-06-16",
        "order": 46
      },
      {
        "place_id": "Baldwin__AL",
        "date": "2024-06-16",
        "order": 47
      },
      {
        "place_id": "Escambia__FL",
        "date": "2024-06-16",
        "order": 48
      },
      {
        "place_id": "Santa_Rosa__FL",
        "date": "2024-06-16",
        "order": 49
      },
      {
        "place_id": "Okaloosa__FL",
        "date": "2024-06-16",
        "order": 50
      },
      {
        "place_id": "Walton__FL",
        "date": "2024-06-17",
        "order": 51
      },
      {
        "place_id": "Covington__AL",
        "date": "2024-06-17",
        "order": 52
      },
      {
        "place_id": "Coffee__AL",
        "date": "2024-06-17",
        "order": 53
      },
      {
        "place_id": "Pike__AL",
        "date": "2024-06-17",
        "order": 54
      }
    ]
  }
]


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

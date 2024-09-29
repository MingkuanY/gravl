from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

import geopandas as gpd
from shapely.geometry import LineString
from pydantic import BaseModel
from typing import List

app = FastAPI()
handler = Mangum(app)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000", "https://www.gravl.org"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class PolylineInput(BaseModel):
  polyline: List[List[float]]

@app.post("/process_polyline/")
async def process_polyline(data: PolylineInput):
  polyline = data.polyline
  
  # Convert polyline to GeoDataFrame through LineString
  decoded_path = [(lat, lng) for lat, lng in polyline]
  line = LineString(decoded_path)
  polyline_gdf = gpd.GeoDataFrame(geometry=[line], crs="EPSG:4326")

  # Load the counties shapefile
  counties_gdf = gpd.read_file('./data/us_counties/us_counties.shp')
  counties_gdf = counties_gdf.to_crs("EPSG:4326")

  # Spatial join to find intersecting counties
  intersected_counties = gpd.sjoin(counties_gdf, polyline_gdf, how="inner", predicate="intersects")

  # Sort counties by intersection order
  intersected_counties["intersection_order"] = intersected_counties.geometry.apply(lambda county: line.project(county.centroid))
  sorted_counties = intersected_counties.sort_values("intersection_order")

  # Extract the FIPS codes
  fips_codes = sorted_counties["FIPS"].tolist()

  return {"fips_codes": fips_codes}

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)
import { loadPlaces } from "@/actions/actions";
import GravlLife from "./GravlLife";

export default async function Wrapped() {
  const places = await loadPlaces();

  return (
    <>
      <GravlLife places={places} />
    </>
  );
}

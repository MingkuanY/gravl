import Header from "@/components/header/Header";
import { getUser, getUserWithTripsAndVisits } from "@/actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";
import { getPlacesByUserAndType } from "@/actions/actions";
import NotFound from "../not-found";
import { loadPlaces } from "@/actions/actions";
import { loadTripsRecentFirst } from "@/actions/actions";
import Dashboard from "@/components/dashboard/Dashboard";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    //user not logged in
    return NotFound();
  }

  const userEmail = session.user.email;
  const user = await getUser(userEmail);

  if (!user || user.username !== params.username) {
    //user not logged into the account they are trying to access
    return NotFound();
  }

  const [
    userWithTripsAndVisits,
    counties,
    states,
    countries,
    nationalparks,
    places,
    trips,
  ] = await Promise.all([
    getUserWithTripsAndVisits(userEmail),
    getPlacesByUserAndType(user.id, "counties"),
    getPlacesByUserAndType(user.id, "states"),
    getPlacesByUserAndType(user.id, "countries"),
    getPlacesByUserAndType(user.id, "nationalparks"),
    loadPlaces(),
    loadTripsRecentFirst(user.id),
  ]);

  const maps = { counties, states, countries, nationalparks };

  return (
    <>
      <Header user={user} />
      <Dashboard
        user={user}
        trips={trips}
        userWithTripsAndVisits={userWithTripsAndVisits}
        maps={maps}
        places={places}
      />
    </>
  );
}

// Welcome to Gravl

import Header from "@/components/header/Header";
import LandingContent from "@/components/landing/LandingContent";
import Onboarding from "@/components/onboarding/Onboarding";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import SignOut from "@/components/landing/SignOut";
import { getUserByUsername } from "../actions/actions";
import { TripWithVisits, VisitInput } from "../utils/types";
import { sortTrips } from "../utils/date";

function convertTripsToVisits(trips: TripWithVisits[]): VisitInput[] {
  const sortedTrips = sortTrips(trips, true);

  return sortedTrips.flatMap((trip) =>
    trip.visits.map((v) => ({
      fips_code: v.placeFipsCode,
      date: v.date.toISOString().split("T")[0],
      order: v.order,
    }))
  );
}

export default async function Landing({
  searchParams,
}: {
  searchParams: { ob: string };
}) {
  const session = await getServerSession(authOptions);
  const funnyufo = await getUserByUsername("funnyufo");
  const visitData = convertTripsToVisits(funnyufo?.trips || []);

  return (
    <>
      {session && !searchParams.ob && <SignOut />}
      {session && searchParams.ob && searchParams.ob === "true" && (
        <Onboarding />
      )}
      <Header />
      <LandingContent initialVisitData={visitData} />
    </>
  );
}

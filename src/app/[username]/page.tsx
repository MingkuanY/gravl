import Header from "@/components/header/Header";
import { getUserWithData } from "@/actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.ts";
import NotFound from "../not-found";
import { loadPlaces } from "@/actions/actions";
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
  const [user, places] = await Promise.all([
    getUserWithData(userEmail),
    loadPlaces(),
  ]);

  if (!user || user.username !== params.username) {
    //user not logged into the account they are trying to access
    return NotFound();
  }

  return (
    <>
      <Header user={user} />
      <Dashboard user={user} places={places} />
    </>
  );
}

import { getUser, loadPlaces } from "@/actions/actions";
import NewTrip from "@/components/log/NewTrip";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";

export default async function Log({
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

  const places = await loadPlaces();

  return <NewTrip user={user} places={places} />;
}

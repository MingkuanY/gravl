import Header from "@/components/header/Header";
import { getFriendByUsername, getUserWithData } from "@/actions/actions";
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

  if (!user) {
    return NotFound();
  }

  // Check if current user is trying to access their own profile
  if (user.username === params.username) {
    return (
      <>
        <Header user={user} />
        <Dashboard user={user} places={places} viewOnly={false} viewer={user} />
      </>
    );
  }

  const isFriend = user.friends.some(
    (friend) => friend.username === params.username
  );

  if (!isFriend) {
    // User trying to access someone else's account
    return NotFound();
  }

  // Get friend's profile (user and trips only)
  const friendUser = await getFriendByUsername(params.username);

  if (!friendUser) {
    return NotFound();
  }

  return (
    <>
      <Header user={user} />
      <Dashboard
        user={friendUser}
        places={places}
        viewOnly={true}
        viewer={user}
      />
    </>
  );
}

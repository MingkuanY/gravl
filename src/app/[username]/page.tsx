import Header from "@/components/header/Header";
import { getUserByUsername, getUserWithData } from "@/actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.ts";
import NotFound from "../not-found";
import { loadPlaces } from "@/actions/actions";
import Dashboard from "@/components/dashboard/Dashboard";
import NonFriendDashboard from "@/components/dashboard/NonFriendDashboard";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  // Get the current session
  const session = await getServerSession(authOptions);

  // Get the profile the user is trying to access (user and trips only)
  const accessedUser = await getUserByUsername(params.username);

  if (!accessedUser) {
    // Trying to access profile that doesn't exist
    return NotFound();
  }

  if (!session) {
    // Not logged in but user they are trying to access exists
    return (
      <>
        <Header />
        <NonFriendDashboard accessedUser={accessedUser} loggedIn={false} />
      </>
    );
  }

  // Current user info
  const userEmail = session.user.email;
  const [user, places] = await Promise.all([
    getUserWithData(userEmail),
    loadPlaces(),
  ]);

  if (!user) {
    // They (somehow) have a session without a user
    return NotFound();
  }

  if (user.username === params.username) {
    // Current user is trying to access their own profile
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
    // User trying to access a non-friend's account
    return (
      <>
        <Header user={user} />
        <NonFriendDashboard accessedUser={accessedUser} loggedIn={true} />
      </>
    );
  }

  // User is accessing a friend's account
  return (
    <>
      <Header user={user} />
      <Dashboard
        user={accessedUser}
        places={places}
        viewOnly={true}
        viewer={user}
      />
    </>
  );
}

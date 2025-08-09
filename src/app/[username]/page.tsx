import Header from "@/components/header/Header";
import { getUserByUsername, getUserWithData } from "@/actions/actions";
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
  // Get the current session
  const session = await getServerSession(authOptions);

  // Get the profile the user is trying to access (user and trips only)
  const accessedUser = await getUserByUsername(params.username);

  if (!accessedUser) {
    // Trying to access profile that doesn't exist
    return NotFound();
  }

  const places = await loadPlaces();

  if (session) {
    // Current user info
    const userEmail = session.user.email;
    const user = await getUserWithData(userEmail);

    if (!user) {
      // They (somehow) have a session without a user
      return NotFound();
    }

    if (user.username === params.username) {
      // Current user is trying to access their own profile
      return (
        <>
          <Header user={user} />
          <Dashboard user={user} places={places} mode={"USER"} viewer={user} />
        </>
      );
    }
  }

  // Not logged in but user they are trying to access exists
  return (
    <>
      <Header />
      <Dashboard user={accessedUser} places={places} mode={"NON-USER"} />
    </>
  );
}

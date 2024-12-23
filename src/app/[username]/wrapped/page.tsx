import Header from "@/components/header/Header";
import { getUserByUsername, getUserWithData } from "@/actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.ts";
import NotFound from "@/app/not-found";
import { loadPlaces } from "@/actions/actions";
import GravlWrapped from "./GravlWrapped";

export default async function Wrapped({
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

  if (!session) {
    // Not logged in but user they are trying to access exists
    return NotFound();
  }

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
        <Header user={user} toggleWrapped={true} />
        <GravlWrapped user={user} places={places} />
      </>
    );
  }
  return NotFound();
}

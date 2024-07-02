// An temporary route to handle whether the User goes to onboarding after they sign in with Google.

import { redirect } from "next/navigation";
import { getUser } from "@/actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function Redirect() {
  const session = await getServerSession(authOptions);

  // Gets the user associated with the current session
  const user = await getUser(session?.user.email);
  if (!user?.username) {
    // Redirects them to onboarding if they lack a username
    redirect("/?ob=true");
  }
  // Redirect them to their dashboard
  redirect(`/${user.username}`);
}

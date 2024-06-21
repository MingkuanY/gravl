import { redirect } from "next/navigation";
import { getUser } from "@/lib/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Redirect() {
  const session = await getServerSession(authOptions);

  console.log("session: ", session);
  const user = await getUser(session?.user.email);
  console.log("User: ", user);
  if (!user?.username) {
    redirect("/?ob=true");
  }
  redirect(`/${user.username}`);

  return <>Loading</>;
}

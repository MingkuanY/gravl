import { getUserByUsername } from "../../actions/actions";
import { ProfileProvider } from "../../contexts/ProfileContext";
import NotFound from "../not-found";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const viewingUser = await getUserByUsername(params.username);

  if (!viewingUser) {
    return NotFound();
  }

  return (
    <ProfileProvider viewingUser={viewingUser}>{children}</ProfileProvider>
  );
}

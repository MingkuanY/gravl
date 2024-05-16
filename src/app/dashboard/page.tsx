// Dashboard

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <main>
      <h1>Welcome back, {session?.user?.name}</h1>
    </main>
  );
}

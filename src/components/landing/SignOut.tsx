// Upon reaching this component, the current page automatically signs out of the current session.

"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  return null;
}

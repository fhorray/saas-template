"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Home() {
  const session = authClient.useSession();

  return (
    <main className="">
      {JSON.stringify(session.data?.user, null, 2)}
      <br />

      <Button onClick={() => authClient.signOut()}>Logout</Button>
    </main>
  );
}

"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const session = authClient.useSession();

  return (
    <main>
      To start edit <strong>/app/(dashboard)/page.tsx</strong>
    </main>
  );
}

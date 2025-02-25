"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/signup");
  return <div></div>;
}

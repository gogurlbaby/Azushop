"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      {auth === "login" && <p>Please log in to continue.</p>}
      <Link href="/" style={{ color: "#01589A", textDecoration: "underline" }}>
        Go back home
      </Link>
    </div>
  );
}

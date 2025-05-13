import Link from "next/link";
import { Suspense } from "react";
import SearchParamsHandler from "./SearchParamsHandler";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Suspense fallback={<div></div>}>
        <SearchParamsHandler />
      </Suspense>
      <Link href="/" style={{ color: "#01589A", textDecoration: "underline" }}>
        Go back home
      </Link>
    </div>
  );
}

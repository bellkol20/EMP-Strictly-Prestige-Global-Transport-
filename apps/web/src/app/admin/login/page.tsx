import { Suspense } from "react";
import AdminLoginPage from "./login-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="px-6 py-24">Loading…</div>}>
      <AdminLoginPage />
    </Suspense>
  );
}

// pages/admin.tsx (or wherever your server component is)
import { getCase } from "@/lib/actions";
import AdminPage from "@/components/pages/Admin"; // Client component

export default async function Page() {
  const cases = await getCase(); // Fetch your cases server-side

  return <AdminPage cases={cases} />;
}

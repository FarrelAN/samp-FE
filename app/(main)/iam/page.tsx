// pages/admin.tsx (or wherever your server component is)
import { getCase, getIAMCase } from "@/lib/actions";
import IAMPage from "@/components/pages/IAMPage"; // Client component

export default async function AdminServerPage() {
  const cases = await getIAMCase(); // Fetch your cases server-side

  return <IAMPage cases={cases} />;
}

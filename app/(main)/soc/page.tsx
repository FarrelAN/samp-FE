// pages/admin.tsx (or wherever your server component is)
import { getCase } from "@/lib/actions";
import SOCPage from "@/components/soc/SOCPage"; // Client component

export default async function AdminServerPage() {
  const cases = await getCase(); // Fetch your cases server-side

  return <SOCPage cases={cases} />;
}

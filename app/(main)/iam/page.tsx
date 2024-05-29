// pages/admin.tsx (or wherever your server component is)
import { getCase, getIAMCase } from "@/lib/actions";
import IAMPage from "@/components/iam/IAMPage"; // Client component

export default async function Page() {
  const cases = await getIAMCase(); // Fetch your cases server-side

  return <IAMPage cases={cases} />;
}

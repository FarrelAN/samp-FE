// pages/admin.tsx (or wherever your server component is)
import { getAllResponse } from "@/lib/actions";
import ResponsePage from "@/components/responses/ResponsePage";
import { ResponseType } from "@/lib/types";

export default async function Page() {
  const responses: ResponseType[] = await getAllResponse(); // Fetch your cases server-side

  return <ResponsePage responses={responses || []} />;
}

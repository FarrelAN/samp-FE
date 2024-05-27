import NextAuth from "next-auth";
import authOptions from "./[...nextauth]";
import { auth } from "@/app/firebase";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

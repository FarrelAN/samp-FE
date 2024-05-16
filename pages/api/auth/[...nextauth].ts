import { error } from "console";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { auth } from "@/app/firebase";
import { signIn } from "next-auth/react";
import { SessionStrategy } from "next-auth"; // Import the SessionStrategy

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/signIn",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error))
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // Correct enum value from SessionStrategy
    maxAge: 2 * 60 * 60, // Session will expire after 2 hours, specified in seconds
    updateAge: 10 * 60, // Session will be updated only if it's older than 10 minutes
  },
};

export default NextAuth(authOptions);

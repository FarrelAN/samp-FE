import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  pages: {
    signIn: "/signIn",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "http://localhost:8000/user/login",
            {
              userAD: (credentials as any)?.userAD,
              password: (credentials as any)?.password,
            }
          );

          if (response.data.status === "success") {
            const user = {
              id: response.data.data._id,
              userAD: response.data.data.userAD,
              username: response.data.data.username,
              role: response.data.data.role,
              division: response.data.data.division,
              token: response.data.token,
            };
            console.log("User data from API:", user); // Log user data
            return user;
          } else {
            throw new Error(response.data.message);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.userAD = user.userAD;
        token.username = user.username;
        token.role = user.role;
        token.division = user.division;
        token.accessToken = user.token;
      }
      console.log("Token after authorization:", token); // Log token data
      return token;
    },
    async session({ session, token }: { token: any; session: any }) {
      session.user = {
        id: token.id,
        userAD: token.userAD,
        username: token.username,
        role: token.role,
        division: token.division,
      };
      session.accessToken = token.accessToken;
      console.log("Session data:", session.user.username); // Log session data
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 2 * 60 * 60,
    updateAge: 10 * 60,
  },
};

export default NextAuth(authOptions);

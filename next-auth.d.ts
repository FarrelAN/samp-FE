import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userAD: string;
      username: string;
      role: string;
      division: string;
    } & DefaultSession;
    accessToken: string;
  }

  interface User {
    id: string;
    userAD: string;
    username: string;
    role: string;
    division: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userAD: string;
    username: string;
    role: string;
    division: string;
    accessToken: string;
  }
}

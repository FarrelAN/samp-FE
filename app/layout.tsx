import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import authOptions from "../pages/api/auth/[...nextauth]";
import SessionProvider from "./SessionProvider";
import Home from "./page";
import Login from "./(auth)/signIn/page";
import { cn } from "../lib/utils";
import SidenavBar from "@/components/SidenavBar";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const myriad = localFont({
  src: [
    {
      path: "../public/fonts/myriad/MYRIADPRO-REGULAR.woff",
      weight: "400",
    },
    {
      path: "../public/fonts/myriad/MYRIADPRO-BOLD.woff",
      weight: "700",
    },
  ],
  variable: "--font-myriad",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = session !== null;

  return (
    <html lang="en" className={`${myriad.variable} font-sans`}>
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex",
          myriad.className
        )}
      >
        <SessionProvider session={session}>
          {isLoggedIn && <SidenavBar />}
          {/* Conditionally add padding if user is logged in */}
          <div className={cn("w-full", isLoggedIn && "p-8")}>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
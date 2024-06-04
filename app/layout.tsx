import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import authOptions from "../pages/api/auth/[...nextauth]";
import ClientRootLayout from "./ClientRootLayout";
import { cn } from "../lib/utils";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import footer from "@/components/footer";

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

  return (
    <html lang="en" className={`${myriad.variable} font-sans`}>
      <body
        className={cn("min-h-screen w-full text-black flex", myriad.className)}
      >
        <ClientRootLayout session={session}>{children}</ClientRootLayout>
        <Toaster />
      </body>
    </html>
  );
}

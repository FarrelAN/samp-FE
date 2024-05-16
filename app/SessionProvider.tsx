"use client";
import SidenavBar from "@/components/SidenavBar";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | unknown;
};

export default function SessionProvider({ children, session }: Props) {
  return <Provider>{children}</Provider>;
}

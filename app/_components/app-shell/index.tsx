"use client";

import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

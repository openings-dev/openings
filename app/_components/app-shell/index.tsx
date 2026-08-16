import type { PropsWithChildren, ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function AppShell({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="flex min-h-screen flex-col bg-transparent selection:bg-primary/20">
      <Header />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { PlatformShell } from "@/components/shell/PlatformShell";
import "@/app/platform.css";

export const metadata: Metadata = {
  title: "Axiom Academy — Learn Competition Mathematics",
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <PlatformShell>{children}</PlatformShell>;
}

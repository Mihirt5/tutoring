import type { Metadata } from "next";
import { PlatformShell } from "@/components/shell/PlatformShell";
import "@/app/platform.css";
import "@/app/courses.css";

export const metadata: Metadata = {
  title: "Lucid Academy — Learn Competition Mathematics",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlatformShell>{children}</PlatformShell>;
}

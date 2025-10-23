import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar.component";
import FooterBar from "@/components/footer.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RUSHPE",
  description: "RUSHPE Website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Removed currLink. Let NavBar detect active route itself */}
        <NavBar isTransparent={false} />
        {children}
        <FooterBar />
      </body>
    </html>
  );
}

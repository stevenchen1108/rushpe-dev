import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/navbar.component";
import FooterBar from "@/components/footer.component";

const montserrat = localFont({
  src: "../../public/fonts/montserrat-latin-variable.woff2",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SHPE | Rutgers University",
  description:
    "Rutgers University chapter of the Society of Hispanic Professional Engineers—leading Hispanics in STEM through community, mentorship, and opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* Removed currLink. Let NavBar detect active route itself */}
        <NavBar isTransparent={false} />
        {children}
        <FooterBar />
      </body>
    </html>
  );
}

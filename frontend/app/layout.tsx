import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "../styles/globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pak Chong Nana Hospital | โรงพยาบาลปากช่องนานา",
  description: "โรงพยาบาลปากช่องนานา - เว็บไซต์บริการทางการแพทย์ บุคลากรแพทย์ ข้อมูลสุขภาพ และการติดต่อ",
  openGraph: {
    title: "Pak Chong Nana Hospital | โรงพยาบาลปากช่องนานา",
    description: "โรงพยาบาลปากช่องนานา - เว็บไซต์บริการทางการแพทย์ บุคลากรแพทย์ ข้อมูลสุขภาพ และการติดต่อ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${kanit.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}

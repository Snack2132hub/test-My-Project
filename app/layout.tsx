import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "My Project https://img.icons8.com/?size=100&id=60963&format=png&color=000000",
  description: "Starter layout with header, navbar, main, and footer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${kanit.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="page-container flex-1 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

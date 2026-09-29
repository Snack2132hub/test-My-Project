import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

/**
 * ศูนย์รวมไฟล์ CSS สไตล์กลางสำหรับทุกหน้าภายใต้ frontend/app/(pages)
 * ทุกหน้าย่อย เช่น doctors, intranet, about, contact, medical-services ฯลฯ
 * จะดึงและใช้งานสไตล์จาก ./pages.css ร่วมกันโดยอัตโนมัติจากจุดนี้จุดเดียว
 */
import "./pages.css";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pages-root">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}


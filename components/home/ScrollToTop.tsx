"use client";

import { useEffect, useState } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  // ตรวจว่าหน้าเลื่อนลงมาหรือยัง
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // เลื่อนไปบนสุด
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="scroll-to-top"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
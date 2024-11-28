"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolling(true);

      // Show nav when scrolling or near top
      setVisible(currentScrollPos > 0);
      setPrevScrollPos(currentScrollPos);

      // Clear the previous timeout
      clearTimeout(scrollTimeout);

      // Set a new timeout
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        // Hide nav when stopped scrolling (unless at top)
        setVisible(currentScrollPos < 10);
      }, 150); // Adjust this value to change how long the nav stays visible after scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="backdrop-blur-lg bg-transparent shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-white">
                Popular Content
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="/blog"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

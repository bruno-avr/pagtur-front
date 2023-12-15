"use client"

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/login') return null;
  
  return (
    <div className="mt-4">
      <footer className="footer mt-auto py-3 bg-dark">
        <div className="container text-center">
          <span className="text-light">Trabalho de INF 321</span>
        </div>
      </footer>
    </div>
  )
}
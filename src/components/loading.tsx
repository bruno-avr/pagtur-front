"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Loading() {
  const pathname = usePathname();
  if (pathname === '/login') return null;
  
  return (
    <div className="mt-5 d-flex justify-content-center">
      <Image
        src="/loading.gif"
        width={50}
        height={50}
        alt="Loading"
      />
    </div>
  )
}
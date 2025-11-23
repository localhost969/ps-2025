import React from "react";
import Image from "next/image";

export default function HeroBackground({ className = "", imageUrl = "", overlayOpacity = 0.45 }:
  { className?: string; imageUrl?: string; overlayOpacity?: number }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-0 overflow-hidden border-b-4 border-black bg-[#FFFDF5] ${className}`}
      aria-hidden
    >
       {/* Background image (if provided) */}
       {imageUrl ? (
        <div className="relative -z-10 w-full h-full opacity-20 grayscale contrast-125">
          <Image
            src={imageUrl}
            alt="Hero background"
            fill
            className="object-cover w-full h-full"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
         </div>
       ) : null}
 
       {/* Neo-Brutalist Decorative Elements */}
       {/* Grid Pattern */}
       <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '40px 40px', opacity: 0.05 }}></div>

       {/* Bold Shapes */}
       <div className="hidden md:block absolute -left-20 top-20 w-64 h-64 bg-secondary border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-12"></div>
       <div className="hidden md:block absolute -right-20 bottom-40 w-48 h-48 bg-primary border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-12 rounded-full"></div>
     </div>
   );
 }

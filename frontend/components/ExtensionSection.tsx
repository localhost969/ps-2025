import React from "react";

interface ExtensionSectionProps {
  extensionUrl?: string;
}

export default function ExtensionSection({ extensionUrl }: ExtensionSectionProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
        {/* Left side - Video: transparent background and keep video perfectly inside UI */}
        <div className="md:flex-1 border-4 border-black overflow-hidden rounded-md" style={{ aspectRatio: "16/9" }}>
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/final.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right side - Content */}
        <div className="md:shrink-0 md:w-64 flex flex-col justify-center gap-3">
          <div>
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter text-black">
              Try Our Extension
            </h3>
            <p className="text-black text-sm mt-1 font-bold border-l-4 border-black pl-2">
              Analyze posts directly in your browser
            </p>
          </div>

          {/* Try Now button */}
          <a
            href={extensionUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none transition-all duration-200 text-center text-sm md:text-base font-black uppercase tracking-widest"
          >
            Try Now
          </a>
        </div>
      </div>
    </div>
  );
}

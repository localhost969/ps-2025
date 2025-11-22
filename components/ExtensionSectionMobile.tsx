import React from "react";

interface ExtensionSectionMobileProps {
  extensionUrl?: string;
}

export default function ExtensionSectionMobile({ extensionUrl }: ExtensionSectionMobileProps) {
  return (
    <div className="w-full space-y-4">
      {/* Header and description above video, matching ExamplesSection style */}
      <div className="pt-12">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-2 text-center">
          Try Our Extension<span className="text-secondary"></span>
        </h2>
        <p className="text-black mb-4 text-sm text-center font-bold">
          Analyze posts directly in your browser
        </p>
      </div>
      {/* Video section for mobile */}
      <div className="border-4 border-black mb-2 bg-black overflow-hidden rounded-md">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
          style={{ aspectRatio: "16/9" }}
        >
          <source src="/final.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Button below video */}
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        <a
          href={extensionUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none transition-all duration-200 text-center text-sm font-black uppercase tracking-widest"
        >
          Try Now
        </a>
      </div>
    </div>
  );
}

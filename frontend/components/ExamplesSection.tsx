import React, { useEffect, useRef, useState } from "react";

interface Example {
  text: string;
  label: string;
}

interface ExamplesSectionProps {
  onExampleSelect: (text: string) => void;
}

const EXAMPLES: Example[] = [
  {
    text: "I absolutely love this! This is the best day ever, I'm so happy!",
    label: "Happy Example",
  },
  {
    text: "This makes me so sad and disappointed. I can't believe this happened.",
    label: "Sad Example",
  },
  {
    text: "The weather is nice today. I went to the store and bought some groceries.",
    label: "Happy Example",
  },
  {
    text: "I'm thrilled! This is amazing and wonderful, thank you so much!",
    label: "Happy",
  },
  {
    text: "I feel terrible and broken. Nothing seems to go right anymore.",
    label: "Sad",
  },
  {
    text: "The meeting is scheduled for tomorrow at 10 AM in the conference room.",
    label: "Neutral",
  },
];


export default function ExamplesSection({ onExampleSelect }: ExamplesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleExampleClick = (text: string) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onExampleSelect(text);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Number.MAX_VALUE;
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(itemCenterX - containerCenterX);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    // initial calc
    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="mt-12 pt-12 border-t-4 border-black w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-6 w-full">
        {/* Left side - Title & Description */}
        <div className="lg:flex-1 lg:max-w-xs mb-8 lg:mb-0">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-black mb-2 lg:text-left text-center">
            Try These Examples<span className="text-secondary"></span>
          </h2>
          <p className="text-black font-bold mb-8 lg:text-left text-center border-l-4 border-black pl-4">
            Click any example below to analyze it instantly
          </p>
        </div>

        {/* Right side - Examples Grid */}
        <div className="lg:shrink-0 lg:flex-1 w-full">
          {/* Mobile: swipeable card carousel */}
          <div className="sm:hidden">
            <div
              ref={containerRef}
              className="flex gap-6 overflow-x-auto pb-6 px-2 hide-scrollbar snap-x snap-mandatory"
            >
              {EXAMPLES.map((example, index) => (
                <button
                  ref={(el) => { itemRefs.current[index] = el }}
                  key={index}
                  onClick={() => handleExampleClick(example.text)}
                  type="button"
                  aria-label={`Analyze example: ${example.label}`}
                  aria-controls="sentiment-input"
                  aria-current={activeIndex === index}
                  className={`min-w-[85vw] max-w-xs p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 text-left cursor-pointer group touch-manipulation shrink-0 snap-center relative ${
                    activeIndex === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {/* Tap overlay */}
                 
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <span className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black">
                      {example.label}
                    </span>
                    <span className="text-lg opacity-100 transition-opacity text-black">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" className="inline"><path d="M9 6l6 6-6 6"/></svg>
                    </span>
                  </div>
                  <p className="text-base text-black font-bold line-clamp-4 transition-colors wrap-break-word">
                    {example.text}
                  </p>
                </button>
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div className="w-full flex justify-center mt-2 gap-2">
              {EXAMPLES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const item = itemRefs.current[idx];
                    if (item) {
                      // use scrollIntoView to ensure item snaps/centers correctly
                      item.scrollIntoView({ inline: "center", behavior: "smooth" });
                    }
                  }}
                  aria-label={`Go to example ${idx + 1}`}
                  aria-current={activeIndex === idx}
                  className={`h-3 w-3 border-2 border-black rounded-none inline-block ${
                    activeIndex === idx ? "bg-black" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Desktop/tablet: grid */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAMPLES.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example.text)}
                type="button"
                aria-label={`Analyze example: ${example.label}`}
                aria-controls="sentiment-input"
                className="w-full p-4 sm:p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-left cursor-pointer group touch-manipulation h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-3 gap-3">
                  <span className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black group-hover:bg-primary group-hover:border-black transition-colors">
                    {example.label}
                  </span>
                  <span className="text-lg hidden md:inline opacity-100 transition-opacity text-black group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <p className="text-sm sm:text-base text-black font-bold line-clamp-3 transition-colors wrap-break-word mt-auto">
                  {example.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

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
  const handleExampleClick = (text: string) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onExampleSelect(text);
  };
  return (
    <div className="mt-12 pt-12 border-t border-slate-100">
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
        Try These <span className="text-secondary">Examples</span>
      </h2>
      <p className="text-slate-600 mb-8">
        Click any example below to analyze it instantly
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXAMPLES.map((example, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(example.text)}
            type="button"
            aria-label={`Analyze example: ${example.label}`}
            aria-controls="sentiment-input"
            className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 md:hover:border-primary md:hover:shadow-lg md:hover:-translate-y-1 active:scale-95 transition-all duration-200 text-left cursor-pointer group touch-manipulation">
              <div className="flex items-start justify-between mb-3 gap-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                {example.label}
              </span>
              <span className="text-lg hidden md:inline opacity-100 transition-opacity">
                →
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 line-clamp-3 md:group-hover:text-slate-900 transition-colors wrap-break-word">
              {example.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

import Head from "next/head";
import { Outfit, Plus_Jakarta_Sans, Great_Vibes, Montserrat } from "next/font/google";
import { useState, useEffect } from "react";
import ExamplesSection from "../components/ExamplesSection";
import InputForm from "../components/InputForm";
import ResultsSection from "../components/ResultsSection";
import HeroBackground from "../components/HeroBackground";
import ExtensionSection from "../components/ExtensionSection";
import type { Sentiment } from "../types";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<Sentiment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !inputText.trim()) {
      setResult(null);
      setError("");
    }
  }, [inputText, loading]);

  const analyzeSentiment = async (text?: string) => {
    const textToAnalyze = text || inputText;
    if (!textToAnalyze.trim()) return;
    
    setInputText(textToAnalyze);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://ps-2025-backend-production.up.railway.app/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      const sentiments = Array.isArray(data) ? data[0] : [];
      const sorted = sentiments.sort((a: Sentiment, b: Sentiment) => b.score - a.score);
      setResult(sorted);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearInput = () => {
    setInputText("");
    setResult(null);
    setError("");
  };

  return (
    // Prevent unwanted horizontal scroll by hiding overflow on X axis
    <div className={`${outfit.variable} ${jakarta.variable} ${greatVibes.variable} ${montserrat.variable} overflow-x-hidden min-h-screen font-body text-foreground bg-background selection:bg-primary selection:text-white`} style={{ overflowX: 'clip' }}>
      <div className="md:scale-125 md:origin-top" style={{ transformOrigin: 'top center' }}>
      <Head>
        <title>Sentiment Analyzer</title>
        <meta name="description" content="Analyze the sentiment of your text." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* <nav className="w-full py-3 px-4 md:py-4 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-lg md:text-2xl font-display font-bold tracking-tight text-primary">
          Text<span className="text-secondary">Sense</span>.
        </div>
      </nav> */}

      {/* Full-width hero section (background spans the entire viewport) */}
      <section className="relative w-screen overflow-hidden border-b-4 border-black min-h-80 md:min-h-screen bg-[#FFFDF5]">
        <HeroBackground imageUrl="/hero.png" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 pt-30 md:pt-8 pb-24">
          <div className="text-center mb-12 space-y-8">
            <h1 className="text-5xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              How does your text feel?<span className="text-secondary"></span>
            </h1>
            <p
              className="text-lg md:text-sm text-black max-w-md md:max-w-2xl mx-auto font-bold border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide md:whitespace-nowrap"
              title="Enter your text below to detect if it's Happy, Sad, or Neutral."
            >
              Enter your text below to detect if it's Happy, Sad, or Neutral.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InputForm
              inputText={inputText}
              loading={loading}
              error={error}
              onInputChange={setInputText}
              onAnalyze={() => analyzeSentiment()}
              onClear={clearInput}
              hasResult={!!result}
            />

            {(loading || result) && <ResultsSection loading={loading} result={result} />}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-12 pt-6 md:pt-8 pb-24">
        {/* Examples section (outside the hero background) */}
        <ExamplesSection onExampleSelect={(text) => analyzeSentiment(text)} />
      </main>

      {/* Extension section - desktop/tablet and mobile versions */}
      {/* Desktop/Tablet: hidden on small screens */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-8 hidden sm:block">
        <ExtensionSection extensionUrl="https://github.com/localhost969/social-sentiment" />
      </div>
      {/* Mobile: only visible on small screens */}
      <div className="max-w-7xl mx-auto px-4 py-6 block sm:hidden">
        {/* @ts-ignore-next-line */}
        {/* eslint-disable-next-line */}
        {require('../components/ExtensionSectionMobile').default({ extensionUrl: "https://github.com/localhost969/social-sentiment" })}
      </div>
      </div>
    </div>
  );
}

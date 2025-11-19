import Head from "next/head";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import ExamplesSection from "../components/ExamplesSection";
import InputForm from "../components/InputForm";
import ResultsSection from "../components/ResultsSection";
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
    <div className={`${outfit.variable} ${jakarta.variable} min-h-screen font-body text-foreground bg-background selection:bg-primary selection:text-white`}>
      <Head>
        <title>Sentiment Analyzer</title>
        <meta name="description" content="Analyze the sentiment of your text." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="w-full py-3 px-4 md:py-4 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-lg md:text-2xl font-display font-bold tracking-tight text-primary">
          {/* Text<span className="text-secondary">Sense</span>. */}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-12 pt-6 md:pt-8 pb-24">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
            How does your text <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">feel?</span>
          </h1>
          <p
            className="text-base md:text-lg text-slate-600 max-w-md md:max-w-full mx-auto truncate whitespace-nowrap"
            title="Enter your text below to detect if it's Happy, Sad, or Neutral."
          >
            Enter your text below to detect if it's Happy, Sad, or Neutral.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <ExamplesSection onExampleSelect={(text) => analyzeSentiment(text)} />
      </main>
    </div>
  );
}

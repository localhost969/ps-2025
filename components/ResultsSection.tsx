import { Sentiment } from "../types";

interface ResultsSectionProps {
  loading: boolean;
  result: Sentiment[] | null;
}

const getSentimentColor = (label: string) => {
  if (label === "positive") return "bg-[#A3E635] text-black border-black"; // Lime Green
  if (label === "negative") return "bg-[#FF6B6B] text-black border-black"; // Red/Pink
  return "bg-[#FCD34D] text-black border-black"; // Yellow
};

const getSentimentEmoji = (label: string) => {
  if (label === "positive") return "😊";
  if (label === "negative") return "😔";
  return "😐";
};

const getDisplayLabel = (label: string) => {
  if (label === "positive") return "Happy";
  if (label === "negative") return "Sad";
  return "Neutral";
};

export default function ResultsSection({ loading, result }: ResultsSectionProps) {
  return (
    <div className="w-full">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 h-full">
        <h3 className="text-sm font-black uppercase tracking-widest text-black mb-4 border-b-4 border-black w-fit">Analysis Result</h3>

        {loading && (
          <div role="status" aria-live="polite" className="space-y-4 animate-pulse">
            <div className="p-3 md:p-6 border-4 border-black flex items-center justify-between gap-2 md:gap-4 flex-wrap bg-slate-100">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="h-10 md:h-12 w-10 md:w-12 bg-black"></div>
                <div className="w-full">
                  <div className="h-3 md:h-4 bg-black w-1/3 mb-3"></div>
                  <div className="h-5 md:h-6 bg-black w-2/3"></div>
                </div>
              </div>
              <div className="text-right w-auto ml-auto">
                <div className="h-5 md:h-6 bg-black w-20 mx-auto md:mx-0"></div>
                <div className="h-3 bg-black w-8 mt-2 mx-auto md:mx-0"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-3 border-4 border-black bg-slate-100 text-center">
                <div className="h-3 bg-black w-24 mx-auto mb-3"></div>
                <div className="h-6 bg-black w-12 mx-auto"></div>
              </div>
              <div className="p-3 border-4 border-black bg-slate-100 text-center">
                <div className="h-3 bg-black w-24 mx-auto mb-3"></div>
                <div className="h-6 bg-black w-12 mx-auto"></div>
              </div>
            </div>
          </div>
        )}

        {!loading && result && (
          <div role="status" aria-live="polite" className="mt-2">
            <div className="flex flex-col gap-4">
              <div className={`p-3 md:p-6 border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-2 md:gap-4 flex-wrap ${getSentimentColor(result[0].label)}`}>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-2xl md:text-4xl shrink-0 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{getSentimentEmoji(result[0].label)}</span>
                  <div>
                    <p className="text-sm font-black opacity-100 uppercase tracking-wide border-b-2 border-black w-fit mb-1">Dominant Sentiment</p>
                    <p className="text-xl md:text-3xl font-black truncate uppercase">{getDisplayLabel(result[0].label)}</p>
                  </div>
                </div>
                <div className="text-right w-auto ml-auto">
                  <p className="text-2xl md:text-3xl font-black">{(result[0].score * 100).toFixed(1)}%</p>
                  <p className="text-xs font-bold uppercase tracking-wider">Confidence</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
                {result.slice(1).map((item, idx) => (
                  <div key={idx} className="p-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <p className="text-xs font-bold text-black uppercase tracking-wider mb-1">{getDisplayLabel(item.label)}</p>
                    <p className="text-lg font-black text-black">{(item.score * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

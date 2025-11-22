import { Sentiment } from "../types";

interface InputFormProps {
  inputText: string;
  loading: boolean;
  error: string;
  onInputChange: (text: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  hasResult: boolean;
}

export default function InputForm({
  inputText,
  loading,
  error,
  onInputChange,
  onAnalyze,
  onClear,
  hasResult,
}: InputFormProps) {
  const shouldSpanFull = !loading && !hasResult;

  return (
    <div
      className={`bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 w-full ${shouldSpanFull ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto" : ""}`}
    >
      <div className="space-y-4">
        <label htmlFor="sentiment-input" className="block text-lg font-black uppercase tracking-wider text-black ml-1 border-b-4 border-black w-fit mb-2">
          Your Text
        </label>
        <textarea
          id="sentiment-input"
          rows={5}
          className="w-full p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[-2px] focus:translate-y-[-2px] outline-none transition-all resize-y text-base sm:text-lg text-black placeholder:text-slate-500 font-bold"
          aria-label="Text to analyze"
          inputMode="text"
          style={{ minHeight: 120 }}
          placeholder="I'm feeling absolutely wonderful today!"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
        />

        <div className="flex flex-row justify-end gap-4 pt-2">
          <button
            onClick={onAnalyze}
            disabled={loading || !inputText.trim()}
            type="button"
            aria-label="Analyze sentiment"
            className="w-1/2 md:w-auto px-8 py-4 bg-primary text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 font-black uppercase tracking-widest text-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
          <button
            onClick={onClear}
            disabled={!inputText.trim()}
            type="button"
            aria-label="Clear input"
            className="w-1/2 md:w-auto px-8 py-4 bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all font-black uppercase tracking-widest text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-600 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-bold uppercase">
          {error}
        </div>
      )}
    </div>
  );
}

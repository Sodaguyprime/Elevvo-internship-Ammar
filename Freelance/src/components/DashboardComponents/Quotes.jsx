import quotesData from "../../data/Quotes.json";

const today    = new Date();
const dayIndex = today.getDate() - 1;
const quote    = quotesData.quotes[dayIndex];

const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  month:   "long",
  day:     "numeric",
});

export default function Quotes() {
  return (
    <div
      className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Orange left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400 rounded-l-2xl" />

      {/* Content */}
      <div className="px-6 py-5 pl-8">

        {/* Top row: label + date */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
            Quote of the Day
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            {formattedDate}
          </span>
        </div>

        {/* Decorative opening quote mark */}
        <span
          className="block leading-none text-orange-100 font-serif select-none mb-1"
          style={{ fontSize: "4.5rem", lineHeight: 1, marginTop: "-0.5rem" }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <p className="text-sm font-semibold text-gray-900 leading-relaxed -mt-4">
          {quote.text}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-4">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
            — {quote.author}
          </span>
        </div>

      </div>
    </div>
  );
}
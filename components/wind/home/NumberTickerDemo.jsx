import { NumberTicker } from "@/components/magicui/number-ticker";

export function NumberTickerDemo({ text }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <NumberTicker
        value={100}
        startValue={10}
        className="whitespace-pre-wrap text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-white"
      />
      <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}

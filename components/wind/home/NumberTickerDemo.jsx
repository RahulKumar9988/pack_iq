import { NumberTicker } from "@/components/magicui/number-ticker";

export function NumberTickerDemo({text}) {
  return (
    <div className="flex flex-col text-2xl">
      <NumberTicker
      value={100}
      startValue={10}
      className="whitespace-pre-wrap text-4xl font-bold tracking-tighter text-black dark:text-white"

    />
    {text}
    </div>
  );
}

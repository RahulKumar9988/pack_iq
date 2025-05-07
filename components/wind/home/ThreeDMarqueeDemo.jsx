"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ThreeDMarqueeDemo() {
  const images = [
    "/pack/all items.png",
    "/pack/ChatGPT Image May 7, 2025, 03_47_27 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_52_31 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 04_00_47 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_50_22 PM.png",
    "/pack/all items.png",
    "/pack/ChatGPT Image May 7, 2025, 03_47_27 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_52_31 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 04_00_47 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_50_22 PM.png",
    "/pack/all items.png",
    "/pack/ChatGPT Image May 7, 2025, 03_47_27 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_52_31 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 04_00_47 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_50_22 PM.png",
    "/pack/all items.png",
    "/pack/ChatGPT Image May 7, 2025, 03_47_27 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_52_31 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 04_00_47 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_50_22 PM.png","/pack/all items.png",
    "/pack/ChatGPT Image May 7, 2025, 03_47_27 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_52_31 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 04_00_47 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_50_22 PM.png","/pack/all items.png",
    "/pack/ChatGPT Image May 7, 2025, 03_47_27 PM.png",
    "/pack/ChatGPT Image May 7, 2025, 03_52_31 PM.png",
      

  ];
  return (
    <div className="mx-auto w-full h-full rounded-3xl p-2">
      <ThreeDMarquee images={images} />
    </div>
  );
}

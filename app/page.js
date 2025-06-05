import Head from "next/head";
import Homepage from "@/components/wind/home/Homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pack IQ | Smart Pouch & Packaging Solutions</title>
        <meta name="description" content="Discover eco-friendly stand-up pouches, spout pouches, ziplocks, and custom packaging from Pack IQ." />
        <meta name="keywords" content="Pack IQ, packaging solutions, stand up pouch, ziplock bag, spout pouch, custom packaging" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Pack IQ | Packaging Solutions" />
        <meta property="og:description" content="Explore flexible, sustainable packaging options like stand-up pouches and ziplocks from Pack IQ." />
        <meta property="og:image" content="/images/packiq-og.jpg" />
        <meta property="og:url" content="https://www.packiq.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pack IQ | Pouch & Packaging" />
        <meta name="twitter:description" content="Premium pouches & custom packaging solutions by Pack IQ." />
        <meta name="twitter:image" content="/images/packiq-og.jpg" />
      </Head>

      <main className="w-full">
        <Homepage />
      </main>
    </>
  );
}

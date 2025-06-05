import Head from "next/head";
import Homepage from "@/components/wind/home/Homepage";

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Pack IQ | Smart Pouch & Packaging Solutions</title>
        <meta name="description" content="Pack IQ offers smart, sustainable pouch and packaging solutions including stand-up pouches, ziplock bags, spout pouches, and more. Get in touch instantly." />
        <meta name="keywords" content="Pack IQ, packaging solutions, stand up pouch, ziplock pouch, spout pouch, flexible packaging, custom packaging, eco packaging" />
        <meta name="author" content="Pack IQ Team" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://pack-iq-gamma.vercel.app/" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pack IQ | Smart Pouch & Packaging Solutions" />
        <meta property="og:description" content="Explore flexible, sustainable packaging options like stand-up pouches, ziplocks, spout pouches, and more with Pack IQ." />
        <meta property="og:image" content="https://pack-iq-gamma.vercel.app/images/packiq-og.jpg" />
        <meta property="og:url" content="https://pack-iq-gamma.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pack IQ | Pouch & Packaging" />
        <meta name="twitter:description" content="Premium pouches & custom packaging solutions by Pack IQ." />
        <meta name="twitter:image" content="https://pack-iq-gamma.vercel.app/images/packiq-og.jpg" />

        {/* Structured Data / Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Pack IQ",
              "url": "https://pack-iq-gamma.vercel.app",
              "logo": "https://pack-iq-gamma.vercel.app/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@packiq.com",
                "contactType": "Customer Support"
              }
            }),
          }}
        />
      </Head>

      <main className="w-full">
        <Homepage />
      </main>
    </>
  );
}

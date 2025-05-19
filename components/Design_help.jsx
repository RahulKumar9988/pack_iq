"use client";
import React, { useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarCheck, CheckCircle } from 'lucide-react';

export function Design_help() {
  const router = useRouter();
    const [hovered, setHovered] = useState(null);
  const data = [
    {
      title: "Hero Section.",
      content: (
        <div>
          <h1 className="text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
             Don't Have a Design Yet? We've Got You
          </h1>
          <p
            className="mb-8 text-sm font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
            Our creative team helps small brands turn ideas into packaging that sells.
            Whether you're starting from scratch or need help refining your look, we will design your
            pouch to match your vision — fast, affordably, and professionally
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/templates/startup-3.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/templates/startup-4.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Upload Assets",
      content: (
        <div>
          <p
            className="mb-8 text-sm font-normal text-neutral-800 md:text-xl dark:text-neutral-200">
            Upload any assets you want on your pouch (logos, UPC, text, etc.) including the questionnaire
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Why Design Matters",
      content: (
        <div>
          <h1 className="text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
             Don't Have a Design Yet? We've Got You
          </h1>
          <p
            className="mb-4 text-sm font-normal text-neutral-800 md:text-xl dark:text-neutral-200">
            : Beautiful, functional packaging helps your brand get noticed and builds instant
            trust with customers. But design doesn not have to be complicated or expensive. At PackIQ,
            we specialize in helping startups and growing brands create standout packaging with fullservice design support.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
        title: "What is Included in Our Design Service?",
        content: (
          <div>
            <h1 className="text-xl font-bold text-neutral-800 md:text-2xl mb-6 dark:text-neutral-200">
              Don't Have a Design Yet? We've Got You
            </h1>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg">
              <li> Custom packaging layout tailored to your pouch type</li>
              <li> Artwork setup for printing (no tech knowledge needed)</li>
              <li> Help with fonts, colors, icons, and visual direction</li>
              <li> Guidance on barcode, nutrition panels, and legal elements</li>
              <li> Unlimited revisions until you are 100% satisfied</li>
              <li>Final print-ready file approved by our production team</li>
            </ul>
            
           
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://assets.aceternity.com/pro/hero-sections.png"
                alt="hero template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
              <img
                src="https://assets.aceternity.com/features-section.png"
                alt="feature template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
              <img
                src="https://assets.aceternity.com/pro/bento-grids.png"
                alt="bento template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
              <img
                src="https://assets.aceternity.com/cards.png"
                alt="cards template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            </div>
            <p
            className="mb-8 text-sm font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
              No designer? No problem. We have got your back.
            </p>
          </div>
        ),
    },
    {
        title: "Order your custom pouches",
        content: (
          <div>
            <h1 className="text-xl font-bold text-neutral-800 md:text-2xl mb-6 dark:text-neutral-200">
              💪Our Simple Design Process
            </h1>
            <ul className=" pl-5 space-y-2 text-sm md:text-lg">
              <li>1️⃣Tell Us About Your Brand</li>
              <li>Fill out a short brief or talk to our design team about your product, audience, and vision</li>
            </ul>

            <ul className=" pl-5 space-y-2 text-sm md:text-lg">
              <li>2️⃣ We Create Your Initial Concepts</li>
              <li>We will design 1 to 2 initial packaging mockups based on your input.</li>
            </ul>

            <ul className=" pl-5 space-y-2 text-sm md:text-lg">
              <li>3️⃣ You Review & Revise</li>
              <li>We work with you to refine the look — change colors, layout, icons, etc.</li>
            </ul>

            <ul className=" pl-5 space-y-2 text-sm md:text-lg">
              <li>4️⃣Approve & Print</li>
              <li>Once approved, we prep your files for perfect printing and move to production</li>
            </ul>
            
            <ul className=" pl-5 space-y-2 text-sm mt-5 md:text-lg">
              <li>💡See What We've Designed</li>
              <li>A mini gallery or slider showing past design samples with brand name, pouch photo</li>
            </ul>
            
          </div>
        ),
    },
    {
        title: "What Clients Say",
        content: (
          <div>
            <h1 className="text-xl font-bold text-neutral-800 md:text-2xl mb-6 dark:text-neutral-200">
              Reviews......
            </h1>
            <ul className=" pl-5 space-y-2 text-sm md:text-lg">
              <li>“I had no idea where to start. PackIQ helped me turn a simple idea into a brand I am proud of.”
              </li>
              <li className="ml-10">— Sophie R., Tea Startup</li>
            </ul>

            <ul className=" pl-5 space-y-2 text-sm md:text-lg">
              <li>“Designing packaging felt overwhelming until I found PackIQ. Their team made it simple.”</li>
              <li className="ml-10">— Arjun M., Pet Treats</li>
            </ul>
            
          </div>
        ),
    },

  ];

   const audiences = [
    { id: 1, title: "New brands without a designer", icon: <CheckCircle className="text-emerald-500" size={20} /> },
    { id: 2, title: "Startups with a logo but no packaging", icon: <CheckCircle className="text-emerald-500" size={20} /> },
    { id: 3, title: "Businesses rebranding or upgrading", icon: <CheckCircle className="text-emerald-500" size={20} /> },
    { id: 4, title: "Founders who want stress-free design help", icon: <CheckCircle className="text-emerald-500" size={20} /> }
  ];

  return (
    <div className="relative w-full overflow-clip ">
      <Timeline data={data} heading="Packaging Design Made Simple." subheading="Professional Design Support for Small Brands & Startups" />
      <div className="w-full bg-gradient-to-br from-indigo-900 to-purple-800 rounded-t-xl shadow-xl overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          {/* Content container */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left text section */}
            <div className="space-y-6 md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Design Solutions <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300">
                  For Growing Brands
                </span>
              </h1>
              
              <p className="text-indigo-100 text-lg max-w-md">
                Professional packaging and brand design that grows with your business - no headaches, just results.
              </p>
            </div>
            
            {/* Right audience cards */}
            <div className="md:w-1/2">
              <h2 className="text-xl text-white font-medium mb-6 text-center md:text-left">Who This Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {audiences.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-start gap-3 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="mt-1 transform transition-transform duration-300">
                      {item.icon}
                    </div>
                    <p className="text-white font-medium">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className=" bg-gradient-to-r from-indigo-900 to-purple-800 shadow-lg border-t border-indigo-700">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left text section */}
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold text-white mr-4">
              Ready to Design Packaging That Sells?
            </h2>
            <p className="text-indigo-100 text-sm md:text-base hidden md:block">
              Let's bring your vision to life.
            </p>
          </div>
          
          {/* Right CTA button */}
          <div className="flex items-center">
            <button 
              className="group flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-900 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={()=>router.push("/free-sample")}
            >
              <CalendarCheck size={18} className="text-indigo-600" />
              Request a Free Design Consultation
              <ArrowRight 
                size={18} 
                className={`transition-transform duration-300 ${hovered ? 'transform translate-x-1' : ''}`} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}

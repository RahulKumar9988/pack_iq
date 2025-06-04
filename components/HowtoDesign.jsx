import React from 'react';
import { Lightbulb, Brain, Pencil, Star, Palette, Search, Monitor, Trophy } from 'lucide-react';
import RecommendedProducts from './Recomended_product';

const HowtoDesign = () => {
  const timelineData = [
    {
      id: 1,
      title: "CHOOSE YOUR POUCH STYLE",
      description: "We offer a full range of packaging solutions — from pouches for snacks and coffee to packaging for pet treats and cosmetics.",
      color: "bg-blue-200",
      icon: <Lightbulb className="w-12 h-12 text-gray-700" />,
      showRecommendation: true,
    },
    {
      id: 2,
      title: " SELECT YOUR POUCH FEATURES",
      description: "Select the features that suit your product — glossy or matte finish, resealable zippers, window and more. The choice is yours.",
      color: "bg-white",
      icon: <Brain className="w-12 h-12 text-gray-700" />
    },
    {
      id: 3,
      title: "Review your pouch details",
      description: "Confirm your pouch details before moving on. Pricing will update real time according to your selections.",
      color: "bg-blue-200",
      icon: <Pencil className="w-12 h-12 text-gray-700" />
    },
    {
      id: 4,
      title: "Login to Place Order ",
      description: "To complete your order securely, please log in or create an account. This lets you track orders and manage artwork files effortlessly.",
      color: "bg-white",
      icon: <Star className="w-12 h-12 text-gray-700" />
    },
    {
      id: 5,
      title: "Create your POUCH DESIGN",
      description: "Have a design ready? Upload it now — or reach out if you need help creating one. or OR Upload your ready-to-go design file or contact us if you need assistance in creating one. ",
      color: "bg-blue-200",
      icon: <Palette className="w-12 h-12 text-gray-700" />
    },
    {
      id: 6,
      title: "Our customer success manager will contact you",
      description: " After your order is placed, a dedicated Customer Success Manager will reach out to confirm details, answer any questions, and guide you through the next steps.",
      color: "bg-white",
      icon: <Search className="w-12 h-12 text-gray-700" />
    },
    {
      id: 7,
      title: " Verify and approve the digital proof",
      description: "We will send a mockup for your final approval. Please confirm the design layout, print placement, and pouch specifications to proceed with production. ",
      color: "bg-blue-200",
      icon: <Monitor className="w-12 h-12 text-gray-700" />
    },
    {
      id: 8,
      title: "Efficient and timely production and delivery",
      description: "Once approved, your order proceeds to production and is delivered with efficiency and precision. Your custom pouch is on its way. ",
      color: "bg-white",
      icon: <Trophy className="w-12 h-12 text-gray-700" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-6 tracking-tight">
            How to order online at PACKIQ
          </h1>
          <h2 className="text-lg md:text-2xl font-bold text-blue-950 tracking-wide mb-4">
            Ordering custom-printed pouches is now super easy. At PackIQ, we have created a simple step-by-step process that saves time, removes the hassle, and gives you full control—from design to delivery.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300"></div>

          <div className="space-y-12">
            {timelineData.map((item) => (
              <React.Fragment key={item.id}>
                <div className="relative flex items-center">
                  <div className="font-bold text-lg w-8 h-8 bg-white border-4 border-gray-300 rotate-45 z-10 flex-shrink-0 flex justify-center items-center transform">
                    <span className="transform -rotate-45">{item.id}</span>
                  </div>

                  <div className={`ml-12 flex-1 ${item.color} rounded-full border border-gray-200 px-8 md:px-12 py-20 shadow-sm`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
                          {item.description}
                        </p>
                      </div>
                      <div className="ml-0 md:ml-8 flex-shrink-0 hidden md:block">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 👇 Conditionally render RecommendedProducts BELOW first block */}
                {item.id === 1 && item.showRecommendation && (
                  <div className="mt-8 ml-20">
                    <RecommendedProducts />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16\"></div>
      </div>
    </div>
  );
};

export default HowtoDesign;

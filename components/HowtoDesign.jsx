import React from 'react';
import { Lightbulb, Brain, Pencil, Star, Palette, Search, Monitor, Trophy } from 'lucide-react';

const HowtoDesign = () => {
  const timelineData = [
    {
      id: 1,
      title: "BRIEF",
      description: "Initiate your project with a concise overview, setting the stage for success.",
      color: "bg-orange-200",
      icon: <Lightbulb className="w-12 h-12 text-gray-700" />
    },
    {
      id: 2,
      title: "BRAINSTORM",
      description: "Fuel your creativity by generating a plethora of innovative ideas to explore.",
      color: "bg-blue-200",
      icon: <Brain className="w-12 h-12 text-gray-700" />
    },
    {
      id: 3,
      title: "SKETCH",
      description: "Transform your ideas into visual concepts through preliminary sketches.",
      color: "bg-pink-200",
      icon: <Pencil className="w-12 h-12 text-gray-700" />
    },
    {
      id: 4,
      title: "SOLUTION",
      description: "Identify the optimal design approach and refine it for maximum impact.",
      color: "bg-yellow-200",
      icon: <Star className="w-12 h-12 text-gray-700" />
    },
    {
      id: 5,
      title: "DESIGN",
      description: "Breathe life into your concepts by incorporating compelling visual elements.",
      color: "bg-purple-200",
      icon: <Palette className="w-12 h-12 text-gray-700" />
    },
    {
      id: 6,
      title: "REVISION",
      description: "Fine-tune your design through careful review, ensuring it meets your standards.",
      color: "bg-cyan-200",
      icon: <Search className="w-12 h-12 text-gray-700" />
    },
    {
      id: 7,
      title: "PRESENTATION",
      description: "Showcase your thoughtfully crafted design to stakeholders and gather valuable feedback.",
      color: "bg-red-200",
      icon: <Monitor className="w-12 h-12 text-gray-700" />
    },
    {
      id: 8,
      title: "DELIVER",
      description: "Bring your design journey to a close by finalizing and sharing the completed project.",
      color: "bg-green-200",
      icon: <Trophy className="w-12 h-12 text-gray-700" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-8xl font-black text-gray-900 mb-6 tracking-tight">
            TIMELINE
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 tracking-widest mb-4">
            DESIGN PROCESS
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={item.id} className="relative flex items-center">
                {/* Square Connector */}
                <div className="w-8 h-8 bg-white border-4 border-gray-300 rotate-45 z-10 flex-shrink-0"></div>
                
                {/* Content Card */}
                <div className={`ml-12 flex-1 ${item.color} rounded-full px-12 py-10 shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {item.id}. {item.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed max-w-lg">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-8 flex-shrink-0">
                      {item.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-600 font-semibold tracking-widest">
            WWW.YOURWEBSITE.COM
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowtoDesign;
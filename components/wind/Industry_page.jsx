"use client"
import { useState, useEffect } from 'react';
import { ChevronRight, Star, Package, Shield, Clock, PenTool, Award, Zap, Menu, X } from 'lucide-react';
import RecommendedProducts from '../Recomended_product';

export default function Industry_page() {
  const [industry, setIndustry] = useState('Tea');
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const industries = [
    'Tea', 'Coffee', 'Spices', 'Snacks', 'Sweets', 'Chocolate', 
    'Fitness & Health', 'Dry Fruits', 'Pet Food', 'Cosmetics', 
    'House & Garden', 'Accessories'
  ];

  const industrySpecifics = {
    'Tea': {
      features: ['Aroma Protection', 'Custom Shapes', 'Transparent Windows'],
      brands: ['Green Leaf Tea Co.', 'Mountain Brew Organics'],
      testimonial: {
        quote: "We needed professional packaging for our specialty loose-leaf tea. PackIQ made the process easy and the quality is excellent.",
        name: "Sarah Johnson",
        brand: "Green Leaf Tea Co."
      }
    },
    'Coffee': {
      features: ['Degassing Valves', 'Aroma Protection', 'Resealable Options'],
      brands: ['Morning Ritual Coffee', 'Urban Roasters'],
      testimonial: {
        quote: "The degassing valves and premium finish on our coffee pouches have significantly improved our shelf presence and product freshness.",
        name: "Michael Torres",
        brand: "Morning Ritual Coffee"
      }
    },
    'Spices': {
      features: ['Moisture Barriers', 'Aroma Protection', 'Custom Sizes'],
      brands: ['Spice Market Collective', 'Flavor Journey'],
      testimonial: {
        quote: "Our spice packaging needed to preserve freshness while showcasing our brand. PackIQ delivered exactly what we needed.",
        name: "Priya Sharma",
        brand: "Spice Market Collective"
      }
    },
    'Snacks': {
      features: ['Tear Notches', 'Transparent Windows', 'Child-Friendly Options'],
      brands: ['Crunch Time Snacks', 'Healthy Nibbles'],
      testimonial: {
        quote: "The transparent windows on our snack pouches let our product shine through. Sales have increased 30% since the redesign.",
        name: "Alex Chen",
        brand: "Crunch Time Snacks"
      }
    },
    'Sweets': {
      features: ['Moisture Protection', 'Premium Finishes', 'Gift-Ready Options'],
      brands: ['Sugar Cloud Confections', 'Sweet Memories'],
      testimonial: {
        quote: "Our artisanal candies needed packaging that reflected their premium quality. PackIQ's solutions exceeded our expectations.",
        name: "Emma Wilson",
        brand: "Sugar Cloud Confections"
      }
    },
    'Chocolate': {
      features: ['Temperature Protection', 'Premium Finishes', 'Gift Packaging'],
      brands: ['Dark Matter Chocolate', 'Cacao Dreams'],
      testimonial: {
        quote: "The heat-resistant packaging has been a game-changer for our chocolate products. No more summer shipping concerns!",
        name: "David Ramos",
        brand: "Dark Matter Chocolate"
      }
    },
    'Fitness & Health': {
      features: ['Sustainable Materials', 'Resealable Options', 'Clear Nutrition Display'],
      brands: ['Peak Performance Nutrition', 'Wellness Blend'],
      testimonial: {
        quote: "Our customers appreciate the eco-friendly packaging that aligns with our brand values while keeping our supplements fresh.",
        name: "Taylor Kim",
        brand: "Peak Performance Nutrition"
      }
    },
    'Dry Fruits': {
      features: ['Moisture Barriers', 'Resealable Options', 'Visual Appeal'],
      brands: ['Nature\'s Harvest', 'Orchard Select'],
      testimonial: {
        quote: "The stand-up pouches with clear windows have transformed our product presentation. Our customers love seeing the quality before purchasing.",
        name: "James Peterson",
        brand: "Nature's Harvest"
      }
    },
    'Pet Food': {
      features: ['Heavy-Duty Materials', 'Easy-Pour Options', 'Resealable Zippers'],
      brands: ['Paws Premium', 'Happy Tails Nutrition'],
      testimonial: {
        quote: "Our premium pet food needed packaging that maintained freshness and was convenient for pet owners. PackIQ delivered both.",
        name: "Nicole Winters",
        brand: "Paws Premium"
      }
    },
    'Cosmetics': {
      features: ['Eco-Friendly Options', 'Moisture Protection', 'Premium Finishes'],
      brands: ['Glow Essentials', 'Pure Beauty Co.'],
      testimonial: {
        quote: "The biodegradable packaging options allowed us to maintain our sustainability commitment without compromising on elegance.",
        name: "Maya Rodriguez",
        brand: "Glow Essentials"
      }
    },
    'House & Garden': {
      features: ['Durable Materials', 'Resealable Options', 'Weather Resistance'],
      brands: ['Green Thumb Gardens', 'Home Harmony'],
      testimonial: {
        quote: "Our seed packets needed to be moisture-resistant yet biodegradable. PackIQ created the perfect solution for our gardening products.",
        name: "Robert Jenkins",
        brand: "Green Thumb Gardens"
      }
    },
    'Accessories': {
      features: ['Premium Finishes', 'Custom Shapes', 'Gift-Ready Options'],
      brands: ['Modern Accents', 'Style Essentials'],
      testimonial: {
        quote: "The metallic finish pouches give our accessories a luxury feel that perfectly matches our brand positioning.",
        name: "Sophia Martinez",
        brand: "Modern Accents"
      }
    }
  };

  const currentIndustry = industrySpecifics[industry] || industrySpecifics['Tea'];

  return (
    <div className="h-full w-full md:mt-16 bg-white text-gray-800 font-sans">
      {/* Mobile Industry Selector */}
      <div className="bg-gray-50 py-2 px-4 border-b border-gray-200 block md:hidden">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Current: {industry}</span>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-gray-600 p-2 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => {
                  setIndustry(ind);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm px-3 py-2 rounded-md transition-all duration-300
                  ${industry === ind ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                {ind}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Industry Selector */}
      <div className="bg-gray-50 py-2 px-4 border-b border-gray-200 hidden md:block">
        <div className="max-w-6xl mx-auto flex items-center overflow-x-auto scrollbar-hide">
          <span className="text-sm font-medium mr-4 text-gray-500 flex-shrink-0">Select Industry:</span>
          <div className="flex space-x-4 flex-wrap">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`text-sm px-3 py-1 rounded-full transition-all duration-300 whitespace-nowrap mb-2
                  ${industry === ind ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-10 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Premium <span className="text-blue-900">{industry}</span> Packaging That Builds Brands
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl">
              From startups to established brands, we create standout packaging that keeps your {industry.toLowerCase()} fresh, protected, and beautifully presented.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 sm:px-6 py-3 rounded-full font-medium transition-all flex items-center group">
                Start Your Order
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-blue-900 hover:bg-blue-50 text-blue-900 px-4 sm:px-6 py-3 rounded-full font-medium transition-all">
                Explore Packaging Styles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Packaging Matters */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Why Packaging Matters in the {industry} Industry</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8 sm:mb-12">
              Packaging is more than just protection — it is your first impression. In the {industry.toLowerCase()} world, 
              design, freshness, and convenience influence buying decisions. Our solutions help you stand out on shelves and online.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-50 p-5 sm:p-6 rounded-lg hover:shadow-md transition-all hover:-translate-y-1">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">Brand Impact</h3>
                <p className="text-gray-600">Create a memorable unboxing experience that communicates your brand values from the first glance.</p>
              </div>
              
              <div className="bg-gray-50 p-5 sm:p-6 rounded-lg hover:shadow-md transition-all hover:-translate-y-1">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">Product Protection</h3>
                <p className="text-gray-600">Preserve freshness, aroma, and quality with specialized materials designed for {industry.toLowerCase()} products.</p>
              </div>
              
              <div className="bg-gray-50 p-5 sm:p-6 rounded-lg hover:shadow-md transition-all hover:-translate-y-1">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">Stand Out</h3>
                <p className="text-gray-600">Differentiate from competitors with custom packaging that catches the eye and stays in mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pouch Styles */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Best-Suited Pouch Styles for {industry}</h2>
            
            <RecommendedProducts/>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Add-ons & Features:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-base">
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Zippers, Valves, Windows</span>
                </div>
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Gloss/Matt/Kraft/Metallic</span>
                </div>
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Resealability & Eco Options</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Industry-Specific Features:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {currentIndustry.features.map((feature, index) => (
                  <div key={index} className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-800 text-sm sm:text-base">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Why Choose PackIQ for Your {industry} Packaging?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Low Minimum Order Quantities</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Perfect for startups and smaller brands looking to make a big impact.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Faster Production Timelines</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Get your packaging in weeks, not months, without sacrificing quality.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0">
                  <PenTool className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Expert Design Support</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Our team helps translate your brand vision into outstanding packaging.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Premium Print Quality</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Digital and flexible printing options for vibrant, accurate colors.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Industry-compliant Materials</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Food-grade and specialized materials appropriate for {industry.toLowerCase()} products.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">No Cylinder or Plate Charges</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Save on setup costs with our digital printing technology.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Stories & Testimonials */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Featured Brand Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {currentIndustry.brands.map((brand, index) => (
                <div key={brand} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">{brand}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {index === 0 ? 
                      `Facing challenges with inconsistent packaging quality and high minimum orders, ${brand} partnered with PackIQ to create custom pouches that elevated their brand presence.` : 
                      `${brand} needed packaging that reflected their premium positioning while meeting sustainability goals. Our team delivered eco-friendly solutions without compromising on aesthetics.`}
                  </p>
                  <button className="mt-3 sm:mt-4 text-blue-600 font-medium flex items-center text-sm sm:text-base">
                    Read full story <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-600 text-white p-5 sm:p-8 rounded-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="text-3xl sm:text-4xl font-serif mr-4 mb-3 md:mb-0"></div>
                <div>
                  <p className="text-base sm:text-lg mb-4">{currentIndustry.testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-300 mr-3"></div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{currentIndustry.testimonial.name}</p>
                      <p className="text-blue-200 text-xs sm:text-sm">{currentIndustry.testimonial.brand}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Elevate Your {industry} Packaging?</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Let us help bring your idea to life. Whether it is your first pouch or your next big launch, we are here to support you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 sm:px-6 py-3 rounded-full font-medium transition-all flex items-center justify-center group">
                Get Free Design Support
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-blue-900 hover:bg-blue-50 text-blue-900 px-4 sm:px-6 py-3 rounded-full font-medium transition-all">
                Start Customizing Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
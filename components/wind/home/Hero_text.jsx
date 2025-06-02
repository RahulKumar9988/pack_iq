import React, { useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight, GoCheck } from "react-icons/go";
import { useRouter } from "next/navigation";
import { motion, useInView, useAnimation } from "framer-motion";

function Hero_text() {
  const router = useRouter();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full relative overflow-hidden py-8 md:py-12 lg:py-16">
      {/* Optimized decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 right-4 md:top-10 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-blue-600/8 to-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-8 left-4 md:bottom-20 md:left-10 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-blue-800/10 to-blue-700/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-purple-600/8 to-blue-600/8 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-6xl">
            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="flex flex-col items-center space-y-6 md:space-y-8"
            >
              {/* Main Headline */}
              <motion.div variants={itemVariants} className="w-full">
                <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-tight tracking-tight">
                  Turning Your Product Ideas Into{" "} <br />
                  <span className="relative inline-block">
                    <span className="text-6xl bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent font-extrabold">
                      Shelf-Stopping Pouch
                    </span>
                    <motion.span 
                      className="absolute bottom-0 -z-20 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-black to-blue-950 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </span>
                </h1>
              </motion.div>
              
              {/* Description - Responsive visibility */}
              <motion.div 
                variants={itemVariants}
                className="w-full max-w-5xl"
              >
                <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl space-y-4 md:space-y-6">
                  {/* Mobile version - simplified */}
                  <div className="block md:hidden">
                    <p className="leading-relaxed">
                      At Packiq, we <span className="text-blue-900 font-semibold italic">Inspire</span> bold ideas, 
                      <span className="text-blue-900 font-semibold italic"> Innovate</span> smarter solutions, and 
                      <span className="text-blue-900 font-semibold italic"> Create</span> designs that bring your brand to life.
                    </p>
                    <p className="leading-relaxed mt-3 text-lg font-medium italic text-gray-800">
                      Your one-stop packaging partner — fast, affordable, and refreshingly unique.
                    </p>
                  </div>
                  
                  {/* Desktop version - detailed */}
                  <div className="hidden md:block space-y-5">
                    <p className="leading-relaxed text-left">
                      At Packiq, we <span className="text-blue-900 font-semibold italic text-lg lg:text-xl">Inspire</span> bold ideas, 
                      <span className="text-blue-900 font-semibold italic text-lg lg:text-xl"> Innovate</span> smarter packaging solutions, and 
                      <span className="text-blue-900 font-semibold italic text-lg lg:text-xl"> Create</span> designs that bring your brand to life. 
                      With low MOQs, no cylinder costs, fast digital printing, and complete design freedom, we eliminate the barriers that hold small businesses back.
                    </p>
                    
                    <p className="leading-relaxed text-xl lg:text-2xl font-medium italic text-gray-800 ">
                      Packiq is your one-stop packaging partner — fast, affordable, and refreshingly unique.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* CTA Buttons - Fully responsive */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center items-center pt-4"
              >
                <Button 
                  className="flex justify-center items-center gap-2 bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-950 rounded-full font-semibold text-sm sm:text-base lg:text-lg text-white px-6 sm:px-8 py-3 sm:py-4 lg:py-6 w-full sm:w-auto min-w-[200px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-blue-600/25"
                  onClick={() => router.push('/packaging-type')}
                >
                  Customize now <GoArrowUpRight className="text-lg sm:text-xl" />
                </Button>
                
                <Button
                  className="flex justify-center items-center gap-2 border-2 border-blue-900 bg-white hover:bg-gradient-to-r hover:from-blue-950 hover:to-blue-900 rounded-full font-semibold text-blue-900 hover:text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 lg:py-6 w-full sm:w-auto min-w-[200px] transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-blue-600/15"
                  onClick={() => router.push('/free-sample')}
                  variant="bordered"
                >
                  Get Sample Products
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero_text;
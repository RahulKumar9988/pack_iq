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
    <div className=" w-full relative overflow-hidden py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
      {/* Responsive decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top right gradient */}
        <div className="absolute top-4 right-2 w-24 h-24 
                        sm:top-6 sm:right-4 sm:w-32 sm:h-32
                        md:top-8 md:right-6 md:w-48 md:h-48 
                        lg:top-10 lg:right-8 lg:w-64 lg:h-64
                        xl:top-12 xl:right-10 xl:w-80 xl:h-80
                        2xl:w-96 2xl:h-96 
                        bg-gradient-to-r from-blue-600/8 to-purple-600/8 rounded-full blur-2xl md:blur-3xl" />
        
        {/* Bottom left gradient */}
        <div className="absolute bottom-4 left-2 w-20 h-20
                        sm:bottom-6 sm:left-4 sm:w-28 sm:h-28
                        md:bottom-8 md:left-6 md:w-40 md:h-40
                        lg:bottom-12 lg:left-8 lg:w-56 lg:h-56
                        xl:bottom-16 xl:left-10 xl:w-72 xl:h-72
                        2xl:w-80 2xl:h-80
                        bg-gradient-to-r from-blue-800/10 to-blue-700/10 rounded-full blur-2xl md:blur-3xl" />
        
        {/* Center gradient */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16
                        sm:w-24 sm:h-24
                        md:w-32 md:h-32
                        lg:w-48 lg:h-48
                        xl:w-56 xl:h-56
                        2xl:w-64 2xl:h-64
                        bg-gradient-to-r from-purple-600/8 to-blue-600/8 rounded-full blur-2xl md:blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-7xl">
            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10"
            >
              {/* Main Headline - Fully responsive */}
              <motion.div variants={itemVariants} className="w-full">
                <h1 className="text-gray-900 leading-tight tracking-tight">
                  {/* First line - responsive text sizing */}
                  <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold ">
                    Turning Your Product Ideas Into
                  </div>
                  
                  {/* Second line - hero text with gradient */}
                  <div className="relative inline-block md:mt-2">
                    <span className="bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent font-extrabold
                                   text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
                                   leading-tight ">
                      Shelf-Stopping Pouch
                    </span>
                    <motion.span 
                      className="absolute bottom-0 -z-20 left-0 w-full 
                                h-0.5 sm:h-0.5 md:h-1 lg:h-1 xl:h-1.5 
                                bg-gradient-to-r from-black to-blue-950 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </div>
                </h1>
              </motion.div>
              
              {/* Description - Responsive content and sizing */}
              <motion.div 
                variants={itemVariants}
                className="w-full max-w-6xl"
              >
                <div className="text-gray-700 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                  {/* Mobile and small tablet version (xs to md) */}
                  <div className="block lg:hidden">
                    <p className="leading-relaxed text-sm sm:text-base md:text-lg">
                      At Packiq, we <span className="text-blue-900 font-semibold italic">Inspire</span> bold ideas, 
                      <span className="text-blue-900 font-semibold italic"> Innovate</span> smarter solutions, and 
                      <span className="text-blue-900 font-semibold italic"> Create</span> designs that bring your brand to life. 
                      With low MOQs, no cylinder costs, fast digital printing, and complete design freedom, we eliminate the barriers that hold small businesses back.
                    </p>
                    <p className="leading-relaxed  
                                 text-base sm:text-xl md:text-xl 
                                 font-medium italic text-gray-800">
                      Packiq is your one-stop packaging partner — fast, affordable, and refreshingly unique. 
                    </p>
                  </div>
                  
                  {/* Desktop version (lg and up) */}
                  <div className="hidden lg:block space-y-4 xl:space-y-5">
                    <p className="leading-relaxed text-lg xl:text-xl 2xl:text-2xl">
                      At Packiq, we <span className="text-blue-900 font-semibold italic text-xl xl:text-2xl 2xl:text-3xl">Inspire</span> bold ideas, 
                      <span className="text-blue-900 font-semibold italic text-xl xl:text-2xl 2xl:text-3xl"> Innovate</span> smarter packaging solutions, and 
                      <span className="text-blue-900 font-semibold italic text-xl xl:text-2xl 2xl:text-3xl"> Create</span> designs that bring your brand to life. 
                      With low MOQs, no cylinder costs, fast digital printing, and complete design freedom, we eliminate the barriers that hold small businesses back.
                    </p>
                    
                    <p className="leading-relaxed font-medium italic text-gray-800
                                 text-xl xl:text-2xl 2xl:text-3xl">
                      Packiq is your one-stop packaging partner — fast, affordable, and refreshingly unique.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* CTA Buttons - Fully responsive layout and sizing */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col xs:flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 
                          w-full sm:w-auto justify-center items-center 
                          "
              >
                <Button 
                  className="flex justify-center items-center gap-2 
                            bg-gradient-to-r from-blue-950 to-blue-900 
                            hover:from-blue-900 hover:to-blue-950 
                            rounded-full font-semibold text-white 
                            transition-all duration-300 transform hover:scale-105 
                            hover:shadow-xl shadow-blue-600/25
                            text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                            px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8
                            py-2.5 sm:py-3 md:py-6 lg:py-6 xl:py-6
                            w-full sm:w-auto min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]"
                  onClick={() => router.push('/packaging-type')}
                >
                  Customize Now <GoArrowUpRight className="text-sm sm:text-base md:text-lg lg:text-xl" />
                </Button>
                
                <Button
                  className="flex justify-center items-center gap-2 
                            border-2 border-blue-900 bg-white 
                            hover:bg-gradient-to-r hover:from-blue-950 hover:to-blue-900 
                            rounded-full font-semibold text-blue-900 hover:text-white 
                            transition-all duration-300 transform hover:scale-105 
                            hover:shadow-xl shadow-blue-600/15
                            text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                            px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8
                            py-2.5 sm:py-3 md:py-6 lg:py-6 xl:py-6
                            w-full sm:w-auto min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]"
                  onClick={() => router.push('/free-sample')}
                  variant="bordered"
                >
                  Get Free Sample 
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
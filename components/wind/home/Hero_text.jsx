import React, { useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight, GoCheck } from "react-icons/go";
import { useRouter } from "next/navigation";
import { motion, useInView, useAnimation } from "framer-motion";

function Hero_text() {
  const router = useRouter();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-[#2563eb]/10 to-[#7c3aed]/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-[#143761]/20 to-[#1e4a73]/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-[#7c3aed]/15 to-[#2563eb]/15 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="relative z-10 w-full sm:pt-8 md:px-6">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 w-full max-w-5xl">
            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="flex flex-col items-center text-start gap-2 sm:gap-3 md:gap-5 uppercase w-full"
            >
              <motion.div variants={itemVariants} className="w-full">
                <div className="bg-gradient-to-r from-[#000000] via-[#000000] to-[#000000] bg-clip-text text-transparent text-3xl md:text-4xl font-bold lg:text-[45px] leading-tight sm:leading-snug md:leading-[45px] lg:leading-[70px] tracking-tight">
                  Turning Your Product Ideas Into{" "}
                  <span className="bg-gradient-to-r from-[#2d3d7a] to-[#334488] bg-clip-text text-transparent relative inline-block font-extrabold text-[50px]">
                    Shelf-Stopping Packs
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1d274e] to-[#2d1556]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="font-normal text-[#000000] text-base sm:text-lg w-full max-w-4xl mt-6 sm:mt-4 normal-case text-start hidden md:block"
              >
                <ul className="space-y-4 sm:space-y-5 list-none">
                  <li className="leading-relaxed flex items-start">
                    
                    <span>At Packiq, we <span className="text-[21px] italic font-sans text-blue-900 font-semibold">Inspire</span>  bold ideas,<span className=" text-blue-900 text-[21px] italic font-sans font-semibold"> Innovate</span>  smarter packaging solutions, and <span className="text-[21px] font-semibold italic font-sans  text-blue-900">Create</span>  designs that bring your brand to life.With low MOQs, no cylinder costs, fast digital printing, and complete design freedom, we eliminate the barriers that hold small businesses back.</span>
                  </li>
                  
                  {/*  */}
                  
                  <li className="leading-relaxed flex items-start">
                    {/* <div className="bg-gradient-to-r from-[#1d274e] to-[#1d274e] p-1 rounded-full mr-3 mt-1">
                      <GoCheck className="text-white text-sm" />
                    </div> */}
                    <span className="text-xl font-sans italic">Packiq is your one-stop packaging partner — fast, affordable, and refreshingly unique.</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto justify-center  md:mt-5"
              >
                <Button 
                  className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#1d274e] to-[#130827] hover:from-[#091528] hover:to-[#10052a] rounded-full font-medium text-base sm:text-lg text-white px-6 py-6 w-full sm:w-auto transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-[#3b82f6]/30"
                  onClick={() => router.push('/packaging-type')}
                >
                  Customize now <GoArrowUpRight className="text-lg" />
                </Button>
                
                <Button
                  className="flex justify-center items-center gap-2 border-2 border-blue-900 bg-white hover:bg-gradient-to-r hover:from-[#1d274e] hover:to-[#0e071b] rounded-full font-medium text-blue-900 hover:text-white text-base sm:text-lg px-6 py-6 w-full sm:w-auto transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-[#3b82f6]/20"
                  onClick={() => router.push('/free-sample')}
                  variant="bordered"
                >
                  Get sample products
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
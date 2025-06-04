import React, { useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
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
      transition: { staggerChildren: 0.15, duration: 0.5 }
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
    <div className="md:mt-4 w-full relative overflow-hidden py-8 sm:py-12 md:py-14 lg:py-16 xl:py-20">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 right-4 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-2xl" />
        <div className="absolute bottom-6 left-4 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 bg-gradient-to-r from-blue-800/10 to-blue-700/10 rounded-full blur-2xl" />
        <div className="absolute top-1/3 left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14"
          >
            {/* Headline */}
            <motion.div variants={itemVariants} className="w-full text-center">
              <h1 className="text-gray-900 font-bold leading-tight tracking-tight">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  Turning Your Product Ideas Into
                </div>
                <div className="relative inline-block mt-3 sm:mt-4">
                  <span className="bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                    Shelf-Stopping Pouch
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-blue-950 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                </div>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="text-center max-w-5xl">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                At <strong className="text-blue-900 italic">Packiq</strong>, we <span className="italic font-semibold text-blue-900">Inspire</span> bold ideas,
                <span className="italic font-semibold text-blue-900"> Innovate</span> smarter solutions, and
                <span className="italic font-semibold text-blue-900"> Create</span> designs that bring your brand to life. With low MOQs, no cylinder costs,
                fast digital printing, and complete design freedom, we eliminate the barriers that hold small businesses back.
              </p>
              <p className="mt-4 text-gray-800 italic font-medium text-base sm:text-lg md:text-xl lg:text-2xl">
                Packiq is your one-stop packaging partner — fast, affordable, and refreshingly unique.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                onClick={() => router.push('/packaging-type')}
                className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-4 rounded-full text-white bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-950 transition-all transform hover:scale-105 hover:shadow-xl shadow-blue-600/25 text-sm sm:text-base md:text-lg min-w-[160px]"
              >
                Customize Now <GoArrowUpRight />
              </Button>
              <Button
                onClick={() => router.push('/free-sample')}
                className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-blue-900 text-blue-900 bg-white hover:bg-gradient-to-r hover:from-blue-950 hover:to-blue-900 hover:text-white transition-all transform hover:scale-105 hover:shadow-xl shadow-blue-600/15 text-sm sm:text-base md:text-lg min-w-[160px]"
                variant="bordered"
              >
                Get Free Sample
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero_text;

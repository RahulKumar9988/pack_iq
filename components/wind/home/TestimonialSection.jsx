import React from 'react';
import { Sparkles, Package, Recycle, PenTool, Globe, ArrowRight, Palette, Leaf, Box } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import { GoArrowUpRight } from 'react-icons/go';

function TestimonialSection() {
  const router = useRouter(); 
  return (
    <div className="rounded-3xl h-full relative bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 ">
      {/* Background elements */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight break-words">
                Experience it first 
                <p className=" text-blue-600 text-5xl bg-gradient-to-r from-blue-900 to-cyan-400 bg-clip-text text-transparent">request your free <br /> <span className='text-6xl'> sample now! </span> </p>
              </h2>
              <Sparkles className="absolute left-full top-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-amber-400" />
            </div>
            
            <p className="text-base sm:text-lg lg:text-lg text-slate-700/90 leading-relaxed">
              To ensure your complete satisfaction, we provide free sample kits for you to experience the quality and durability of our packaging firsthand. Simply request your sample kit at your convenience, and let us demonstrate the attention to detail and craftsmanship we put into every product. We look forward to helping you find the perfect packaging solution.
            </p>
            
            <div className="pt-2 sm:pt-4 w-fit hidden sm:block">
              <Button 
              className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#143761] to-[#1e4a73] hover:from-[#1e4a73] hover:to-[#143761] rounded-full font-normal text-lg text-white px-4 py-2 w-full sm:w-auto transition-all duration-300"
                onClick={() => router.push('/free-sample')}
              >
                Get Free Sample <GoArrowUpRight />
              </Button>
            </div>
          </div>

          {/* Right Column - For larger screens */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 hidden sm:block">
              <img src="/pack/all items.png" alt="" className='rounded-2xl' />
            </div>

          {/* Right Column - Mobile version */}
          <div className="w-full mt-2 block sm:hidden">
            <img src="/pack/all items.png" alt="" className='rounded-2xl' />
            <div className="pt-5 sm:pt-4 w-fit">
              <button 
              onClick={()=> router.push("/inspirations")}
                className="bg-gradient-to-r from-blue-950 to-cyan-950 hover:from-blue-950 hover:to-cyan-900 text-white font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-full inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Inspirations
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;



// import React, { useState, useEffect, useRef } from 'react';
// import { Avatar, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useAppSelector } from '@/redux/hooks';
// import { getUserDetails } from '@/app/action/getUserDetails';
// import { useRouter } from 'next/navigation';

// const TestimonialSection = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newTestimonial, setNewTestimonial] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   // Get authentication state and token from Redux
//   const { isAuthenticated, token } = useAppSelector(state => state.auth);
//   const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
//   // Get user details
//   const userDetails = isAuthenticated ? getUserDetails() : null;
//   const userId = userDetails?.user?.user_id;
//   const router = useRouter();
  
//   // Refs for scroll animation
//   const scrollerRef = useRef(null);
//   const scrollContentRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [needsClone, setNeedsClone] = useState(true);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${apiBaseUrl}/api/v1/user-reviews/`);
        
//         if (!response.ok) {
//           throw new Error(`Error fetching reviews: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.status === 200 && result.data) {
//           setTestimonials(result.data);
//         } else {
//           throw new Error('Invalid response format');
//         }
//       } catch (err) {
//         console.error("Failed to fetch testimonials:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, [apiBaseUrl, submitSuccess]);

//   // Clone testimonials for infinite scroll effect
//   useEffect(() => {
//     if (testimonials.length > 0 && scrollContentRef.current && needsClone) {
//       const scrollerContent = Array.from(scrollContentRef.current.children);
      
//       // Only clone if we haven't already
//       if (scrollerContent.length === testimonials.length) {
//         scrollerContent.forEach(item => {
//           const clone = item.cloneNode(true);
//           scrollContentRef.current.appendChild(clone);
//         });
//         setNeedsClone(false); // Prevent re-cloning on re-renders
        
//         // Start animation once clones are created
//         startAnimation();
//       }
//     }
//   }, [testimonials, needsClone]);

//   const startAnimation = () => {
//     if (scrollContentRef.current) {
//       // Reset animation if already there
//       scrollContentRef.current.classList.remove('animate-scroll');
//       void scrollContentRef.current.offsetWidth; // Force reflow
//       scrollContentRef.current.classList.add('animate-scroll');
//     }
//   };

//   const handleOpenModal = () => {
//     if (isAuthenticated) {
//       setIsModalOpen(true);
//     } else {
//       router.push('/auth/signin');
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setNewTestimonial('');
//     setSubmitError(null);
//   };

//   const handleSubmitTestimonial = async (e) => {
//     e.preventDefault();
    
//     if (!newTestimonial.trim()) {
//       return;
//     }

//     try {
//       setSubmitting(true);
//       setSubmitError(null);
//       setSubmitSuccess(false);
      
//       const response = await fetch(`${apiBaseUrl}/api/v1/user-reviews/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           description: newTestimonial
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `Error submitting review: ${response.status}`);
//       }

//       // Clear the form and close modal
//       setNewTestimonial('');
//       setSubmitSuccess(true);
//       setNeedsClone(true); // Need to re-clone after adding new testimonial
      
//       // Close modal after successful submission
//       setTimeout(() => {
//         setIsModalOpen(false);
//         setSubmitSuccess(false);
//       }, 2000);

//     } catch (err) {
//       console.error("Failed to submit testimonial:", err);
//       setSubmitError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

  

//   if (loading && testimonials.length === 0) {
//     return (
//       <div className="flex justify-center items-center bg-[#F5F5F7] py-16">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#143761] mx-auto"></div>
//           <p className="mt-4 text-[#143761]">Loading testimonials...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col justify-center items-center bg-[#F5F5F7] py-16">
//       {/* Add CSS for animation */}
//       <style jsx global>{`
//         @keyframes scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }
        
//         .animate-scroll {
//           animation: scroll 45s linear infinite;
//         }
        
//       `}</style>
      
//       <h2 className="text-center font-semibold text-[#143761] text-3xl mb-8">
//         Accelerating Innovations In<br />Packaging
//       </h2>

//       <div className="container mx-auto px-4">
//         {/* Share Experience Button */}
//         <div className="flex justify-center mb-12">
//           <Button 
//             onClick={handleOpenModal}
//             className="bg-[#143761] text-white rounded-full px-3 py-1 text-lg shadow-md hover:bg-[#0e2a4a] transition-colors"
//           >
//             {isAuthenticated ? 'Share Your Experience' : 'Login to Share Your Experience'}
//           </Button>
//         </div>
        
//         {/* Testimonial Modal */}
//         <Modal 
//           isOpen={isModalOpen} 
//           onClose={handleCloseModal}
//           size="lg"
//         >
//           <ModalContent>
//             <ModalHeader className="flex flex-col gap-1 border-b pb-4">
//               <h3 className="text-xl font-semibold text-[#143761]">Share Your Experience</h3>
//             </ModalHeader>
//             <ModalBody className="py-6">
//               <div>
//                 <Textarea
//                   placeholder="Write your testimonial here..."
//                   value={newTestimonial}
//                   onChange={(e) => setNewTestimonial(e.target.value)}
//                   className="mb-4 w-full"
//                   minRows={5}
//                   required
//                 />
                
//                 {submitError && (
//                   <div className="text-red-500 text-sm mb-4">
//                     {submitError}
//                   </div>
//                 )}
                
//                 {submitSuccess && (
//                   <div className="text-green-500 text-sm mb-4">
//                     Your testimonial was submitted successfully!
//                   </div>
//                 )}
//               </div>
//             </ModalBody>
//             <ModalFooter className="border-t pt-4">
//               <Button 
//                 className="bg-gray-200 text-gray-700 rounded-full"
//                 onClick={handleCloseModal}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 className="bg-[#143761] text-white rounded-full"
//                 disabled={submitting || !newTestimonial.trim()}
//                 isLoading={submitting}
//                 onClick={handleSubmitTestimonial}
//               >
//                 {submitting ? 'Submitting...' : 'Submit Testimonial'}
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
        
//         {error && !testimonials.length ? (
//           <div className="text-center text-red-500">
//             <p>Failed to load testimonials. Please try again later.</p>
//             <p className="text-sm mt-2">{error}</p>
//           </div>
//         ) : testimonials.length === 0 ? (
//           <div className="text-center text-gray-600 py-8">
//             <p>No testimonials available at the moment. Be the first to share your experience!</p>
//           </div>
//         ) : (
//           <>
//             {/* Horizontal scrolling testimonials */}
//             <div 
//               className="relative w-full overflow-hidden mb-8"
//               ref={scrollerRef}
//               onMouseEnter={() => setIsPaused(false)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               <div 
//                 ref={scrollContentRef}
//                 className={`flex ${isPaused ? '' : 'animate-scroll'}`}
//                 style={{ width: 'fit-content' }}
//               >
//                 {testimonials.map((testimonial) => (
//                   <div
//                     key={testimonial.review_id}
//                     className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md p-6 mx-3 hover:shadow-lg transition-shadow"
//                   >
//                     <div className="flex items-center mb-4">
//                       <Avatar 
//                         className="w-12 h-12 mr-4" 
//                         src={testimonial.user?.user_image_url || `https://i.pravatar.cc/150?u=${testimonial.review_id}`} 
//                       />
//                       <div>
//                         <h3 className="font-medium text-base">{testimonial.user?.user_name || 'Anonymous'}</h3>
//                         <p className="text-gray-500 text-sm">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                     <p className="text-gray-700">{testimonial.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestimonialSection;
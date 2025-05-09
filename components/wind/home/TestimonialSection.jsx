import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppSelector } from '@/redux/hooks';
import { getUserDetails } from '@/app/action/getUserDetails';
import { useRouter } from 'next/navigation';

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get authentication state and token from Redux
  const { isAuthenticated, token } = useAppSelector(state => state.auth);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  // Get user details
  const userDetails = isAuthenticated ? getUserDetails() : null;
  const userId = userDetails?.user?.user_id;
  const router = useRouter();
  
  // Refs for scroll animation
  const scrollerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [needsClone, setNeedsClone] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/api/v1/user-reviews/`);
        
        if (!response.ok) {
          throw new Error(`Error fetching reviews: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setTestimonials(result.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [apiBaseUrl, submitSuccess]);

  // Clone testimonials for infinite scroll effect
  useEffect(() => {
    if (testimonials.length > 0 && scrollContentRef.current && needsClone) {
      const scrollerContent = Array.from(scrollContentRef.current.children);
      
      // Only clone if we haven't already
      if (scrollerContent.length === testimonials.length) {
        scrollerContent.forEach(item => {
          const clone = item.cloneNode(true);
          scrollContentRef.current.appendChild(clone);
        });
        setNeedsClone(false); // Prevent re-cloning on re-renders
        
        // Start animation once clones are created
        startAnimation();
      }
    }
  }, [testimonials, needsClone]);

  const startAnimation = () => {
    if (scrollContentRef.current) {
      // Reset animation if already there
      scrollContentRef.current.classList.remove('animate-scroll');
      void scrollContentRef.current.offsetWidth; // Force reflow
      scrollContentRef.current.classList.add('animate-scroll');
    }
  };

  const handleOpenModal = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push('/auth/signin');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTestimonial('');
    setSubmitError(null);
  };

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    
    if (!newTestimonial.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      
      const response = await fetch(`${apiBaseUrl}/api/v1/user-reviews/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          description: newTestimonial
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error submitting review: ${response.status}`);
      }

      // Clear the form and close modal
      setNewTestimonial('');
      setSubmitSuccess(true);
      setNeedsClone(true); // Need to re-clone after adding new testimonial
      
      // Close modal after successful submission
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);

    } catch (err) {
      console.error("Failed to submit testimonial:", err);
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  

  if (loading && testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center bg-[#F5F5F7] py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#143761] mx-auto"></div>
          <p className="mt-4 text-[#143761]">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#F5F5F7] py-16">
      {/* Add CSS for animation */}
      <style jsx global>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        
      `}</style>
      
      <h2 className="text-center font-semibold text-[#143761] text-3xl mb-8">
        Accelerating Innovations In<br />Packaging
      </h2>

      <div className="container mx-auto px-4">
        {/* Share Experience Button */}
        <div className="flex justify-center mb-12">
          <Button 
            onClick={handleOpenModal}
            className="bg-[#143761] text-white rounded-full px-3 py-1 text-lg shadow-md hover:bg-[#0e2a4a] transition-colors"
          >
            {isAuthenticated ? 'Share Your Experience' : 'Login to Share Your Experience'}
          </Button>
        </div>
        
        {/* Testimonial Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          size="lg"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 border-b pb-4">
              <h3 className="text-xl font-semibold text-[#143761]">Share Your Experience</h3>
            </ModalHeader>
            <ModalBody className="py-6">
              <div>
                <Textarea
                  placeholder="Write your testimonial here..."
                  value={newTestimonial}
                  onChange={(e) => setNewTestimonial(e.target.value)}
                  className="mb-4 w-full"
                  minRows={5}
                  required
                />
                
                {submitError && (
                  <div className="text-red-500 text-sm mb-4">
                    {submitError}
                  </div>
                )}
                
                {submitSuccess && (
                  <div className="text-green-500 text-sm mb-4">
                    Your testimonial was submitted successfully!
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="border-t pt-4">
              <Button 
                className="bg-gray-200 text-gray-700 rounded-full"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#143761] text-white rounded-full"
                disabled={submitting || !newTestimonial.trim()}
                isLoading={submitting}
                onClick={handleSubmitTestimonial}
              >
                {submitting ? 'Submitting...' : 'Submit Testimonial'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {error && !testimonials.length ? (
          <div className="text-center text-red-500">
            <p>Failed to load testimonials. Please try again later.</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            <p>No testimonials available at the moment. Be the first to share your experience!</p>
          </div>
        ) : (
          <>
            {/* Horizontal scrolling testimonials */}
            <div 
              className="relative w-full overflow-hidden mb-8"
              ref={scrollerRef}
              onMouseEnter={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                ref={scrollContentRef}
                className={`flex ${isPaused ? '' : 'animate-scroll'}`}
                style={{ width: 'fit-content' }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.review_id}
                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md p-6 mx-3 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <Avatar 
                        className="w-12 h-12 mr-4" 
                        src={testimonial.user?.user_image_url || `https://i.pravatar.cc/150?u=${testimonial.review_id}`} 
                      />
                      <div>
                        <h3 className="font-medium text-base">{testimonial.user?.user_name || 'Anonymous'}</h3>
                        <p className="text-gray-500 text-sm">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialSection;
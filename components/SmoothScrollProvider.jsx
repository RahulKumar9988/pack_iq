'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollProvider({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
  ScrollTrigger.normalizeScroll(true); // normalizes native scroll behavior

  const smoother = ScrollSmoother.create({
    wrapper: wrapperRef.current,
    content: contentRef.current,
    smooth: 1.2,
    effects: false,
  });

  return () => {
    smoother.kill();
  };
}, []);


  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

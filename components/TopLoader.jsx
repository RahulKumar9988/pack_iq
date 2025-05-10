'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import "../styles/nprogress.css";


NProgress.configure({ showSpinner: false });

export default function TopLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Fake a small delay for a smoother UX
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

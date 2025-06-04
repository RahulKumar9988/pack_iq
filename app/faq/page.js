"use client"
import FAQ from '@/components/wind/home/FAQ';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function Page() {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col items-center">
      <FAQ />
    </div>
  );
}

export default Page;

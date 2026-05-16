"use client";

import dynamic from 'next/dynamic';

const MouseTrailer = dynamic(() => import('@/utils/MouseTrailer'), { 
  ssr: false 
});

export default function ClientSideFeatures() {
  return <MouseTrailer />;
}

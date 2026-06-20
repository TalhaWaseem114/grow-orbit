"use client";

import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { initializeUtmTracker } from "@/utils/utmTracker";

const MouseTrailer = dynamic(() => import('@/utils/MouseTrailer'), { 
  ssr: false 
});

export default function ClientSideFeatures() {
  useEffect(() => {
    initializeUtmTracker();
  }, []);

  return <MouseTrailer />;
}


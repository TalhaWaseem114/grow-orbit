import React from 'react';

const PlanetIcon = ({ baseColor = "249,115,22", width = "26", height = "26", className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 32 32" className={`shrink-0 transition-transform duration-500 hover:rotate-12 ${className}`}>
    <g transform="rotate(-23 16 16)">
      {/* 1. Back Half of the Ring (Behind the planet) */}
      <path d="M 5 16 A 11 2.5 0 0 1 27 16" stroke={`rgba(${baseColor},0.25)`} strokeWidth="1.5" fill="none" />
      
      {/* 2. Planet Body */}
      <circle 
        cx="16" cy="16" r="5" 
        fill={`rgba(${baseColor},0.95)`} 
        style={{ filter: `drop-shadow(0px 0px 6px rgba(${baseColor},0.4))` }} 
      />
      
      {/* 3. Front Half of the Ring (In front of the planet) */}
      <path d="M 27 16 A 11 2.5 0 0 1 5 16" stroke={`rgba(${baseColor},0.6)`} strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

export default PlanetIcon;

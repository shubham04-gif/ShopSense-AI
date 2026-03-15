import React, { useState } from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img 
        src="/logo.png" 
        alt="ShopSense AI Logo" 
        className={`${className} object-contain dark:invert`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
        {/* Outer dashed/dotted ring */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
        
        {/* Tech accents */}
        <path d="M 50 5 A 45 45 0 0 1 95 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M 5 50 A 45 45 0 0 0 50 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="20" r="1.5" fill="currentColor" />
        <circle cx="80" cy="80" r="1.5" fill="currentColor" />
        <circle cx="20" cy="80" r="1.5" fill="currentColor" />
        
        {/* Inner stylized shape (A/S) */}
        <path d="M 35 60 C 25 60 25 40 50 25 C 75 40 75 60 65 60 C 60 60 60 50 50 50 C 45 50 45 60 50 65 C 55 70 45 75 35 70" 
              stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Center dot */}
        <circle cx="50" cy="45" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

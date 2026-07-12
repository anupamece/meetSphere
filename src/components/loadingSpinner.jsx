import React from 'react';

const LoadingSpinner = ({ fullPage = false, message = "Loading..." }) => {
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center animate-fade-in">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        .anim-spin-glow {
          animation: spin-glow 1.2s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
        }
        .anim-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
      `}} />

      {/* Spinner Graphic Container */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        
        {/* Pulsing Outer Ring (Soft Lavender) */}
        <div className="absolute inset-0 rounded-full border-4 border-[#D4BEE4]/40 anim-pulse-ring"></div>
        
        {/* Futuristic Dual Ring Spinner (Amethyst to Royal Purple) */}
        <svg 
          className="w-16 h-16 anim-spin-glow" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="spinnerGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9B7EBD" />
              <stop offset="100%" stopColor="#4A1E6D" />
            </linearGradient>
          </defs>
          
          {/* Main spinning arc */}
          <path 
            d="M 50 10 A 40 40 0 0 1 90 50" 
            stroke="url(#spinnerGrad)" 
            strokeWidth="5.5" 
            strokeLinecap="round" 
          />
          
          {/* Subtle trail arc */}
          <path 
            d="M 50 90 A 40 40 0 0 1 10 50" 
            stroke="#D4BEE4" 
            strokeWidth="2" 
            strokeLinecap="round" 
            opacity="0.3"
          />
        </svg>

        {/* Small glowing center dot */}
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#4A1E6D] shadow-md shadow-[#9B7EBD]/50"></div>
      </div>

      {/* Message Text */}
      {message && (
        <p className="font-premium text-sm font-semibold tracking-wide text-[#4A1E6D] animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#EEEEEE]/75 backdrop-blur-md">
        <div className="bg-white/80 rounded-3xl border border-[#D4BEE4]/60 p-8 shadow-xl max-w-xs w-full">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;
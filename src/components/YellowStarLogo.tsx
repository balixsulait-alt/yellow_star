import React from 'react';

interface YellowStarLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const YellowStarLogo: React.FC<YellowStarLogoProps> = ({ 
  className = "w-10 h-10", 
  variant = 'full' 
}) => {
  return (
    <div className={`flex items-center select-none ${variant === 'full' ? 'gap-3' : ''}`} id="yellow-star-logo-root">
      {/* SVG Icon part - High-Fidelity Vector Emblem */}
      <svg 
        viewBox="0 0 120 120" 
        className={className} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        id="yellow-star-logo-svg"
      >
        {/* Soft elegant shadow mask */}
        <defs>
          <filter id="logo-drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <linearGradient id="green-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#008E54" />
            <stop offset="100%" stopColor="#005F36" />
          </linearGradient>
          <linearGradient id="gold-star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC72C" />
            <stop offset="100%" stopColor="#F6A800" />
          </linearGradient>
        </defs>

        {/* 1. Behind-the-scenes Golden Orbit/Swoosh Ring */}
        <path 
          d="M 12 42 C 22 10, 85 -5, 108 25 C 118 38, 114 58, 100 74 C 86 90, 52 110, 24 104 C 10 101, 2 88, 6 74 C 9 60, 28 42, 44 46 C 58 50, 54 74, 76 76 C 92 78, 102 62, 94 44 C 86 26, 44 20, 28 38" 
          stroke="url(#gold-star-gradient)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          opacity="0.85"
        />

        {/* 2. Outer White Glow Shield Container */}
        <path 
          d="M 22 44 C 22 44, 60 16, 98 44 L 98 84 C 98 98, 76 112, 60 116 C 44 112, 22 98, 22 84 Z" 
          fill="white" 
          filter="url(#logo-drop-shadow)"
        />

        {/* 3. Main Brand Green Shield/Badge */}
        <path 
          d="M 25 47 C 25 47, 60 20, 95 47 L 95 82 C 95 95, 74 108, 60 112 C 46 108, 25 95, 25 82 Z" 
          fill="url(#green-gold-gradient)" 
        />

        {/* 4. Large Golden Star at Top-Center */}
        {/* Five-pointed star centered at X=60, Y=44 */}
        <polygon 
          points="60,18 64.5,32 79,32 67.5,41 72,55 60,46 48,55 52.5,41 41,32 55.5,32" 
          fill="url(#gold-star-gradient)" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />

        {/* 5. Star Core Circle for high-end badge detail */}
        <circle cx="60" cy="38" r="3.5" fill="#FFF" />

        {/* 6. Curved banner text base "YELLOW" & "STAR" */}
        {/* Structured text embedded beautifully in white */}
        <text 
          x="60" 
          y="74" 
          fill="#FFF" 
          fontSize="12" 
          fontWeight="900" 
          fontFamily="'Inter', 'Arial Black', sans-serif" 
          textAnchor="middle" 
          letterSpacing="1.5"
        >
          YELLOW
        </text>

        <text 
          x="60" 
          y="87" 
          fill="#FFC72C" 
          fontSize="12" 
          fontWeight="950" 
          fontFamily="'Inter', 'Arial Black', sans-serif" 
          textAnchor="middle" 
          letterSpacing="2"
        >
          STAR
        </text>

        {/* Tiny ribbon decoration line */}
        <line x1="42" y1="94" x2="78" y2="94" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        
        {/* Small subtitle on badge */}
        <text 
          x="60" 
          y="102" 
          fill="#FFF" 
          fontSize="5" 
          fontWeight="700" 
          fontFamily="'Inter', sans-serif" 
          textAnchor="middle" 
          letterSpacing="1"
          opacity="0.9"
        >
          PREMIUM
        </text>
      </svg>

      {/* Brand title text - side typography if full variant */}
      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xl font-black tracking-tight text-[#007A48]">YELLOW STAR</span>
            <span className="text-amber-500 text-xs font-black">★</span>
          </div>
          <span className="text-[8.5px] uppercase tracking-wider text-gray-500 font-extrabold leading-tight mt-1">
            Produce & Food Processors (U) Ltd
          </span>
        </div>
      )}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#EEEEEE] pt-16 pb-24 md:pt-20 md:pb-32 border-b border-[#D4BEE4]/40">
      
      {/* ─── CSS Animations ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(1.5deg); }
        }
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes laser-sweep {
          0%, 100% { transform: translateY(-5px); opacity: 0.3; }
          50% { transform: translateY(70px); opacity: 1; }
        }
        @keyframes dash-pulse {
          to { stroke-dashoffset: -40; }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 4px #9B7EBD); opacity: 0.7; }
          50% { filter: drop-shadow(0 0 15px #9B7EBD); opacity: 1; }
        }
        
        .anim-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .anim-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .anim-float-delayed { animation: float-delayed 6s ease-in-out infinite; }
        .anim-spin-cw { animation: spin-clockwise 25s linear infinite; transform-origin: 300px 300px; }
        .anim-spin-ccw { animation: spin-counter 30s linear infinite; transform-origin: 300px 300px; }
        .anim-laser { animation: laser-sweep 3s ease-in-out infinite; }
        .anim-dash { stroke-dasharray: 8 6; animation: dash-pulse 2s linear infinite; }
        .anim-glow { animation: glow-pulse 3s ease-in-out infinite; }
      `}} />

      {/* ─── Immersive Background Vector Mesh (Bleeds Behind Text) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 sm:opacity-40">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1440 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid Lines spanning across left to right */}
          <path d="M 0 100 L 1440 100 M 0 250 L 1440 250 M 0 400 L 1440 400 M 0 550 L 1440 550 M 0 700 L 1440 700" stroke="#D4BEE4" strokeWidth="1" opacity="0.3" />
          <path d="M 150 0 L 150 800 M 450 0 L 450 800 M 750 0 L 750 800 M 1050 0 L 1050 800 M 1350 0 L 1350 800" stroke="#D4BEE4" strokeWidth="1" opacity="0.3" />

          {/* Curved glowing connection rays bleeding from right toward the text column */}
          <path d="M 1100 400 C 850 450, 450 300, 150 350" stroke="url(#bgRayGrad)" strokeWidth="2.5" className="anim-dash" />
          <path d="M 1100 400 C 700 200, 300 450, 100 200" stroke="url(#bgRayGrad)" strokeWidth="1.5" className="anim-dash" />
          <path d="M 1100 400 C 900 650, 500 500, 200 600" stroke="url(#bgRayGrad)" strokeWidth="2" className="anim-dash" />

          {/* Interactive Dot Matrix glowing nodes */}
          <circle cx="150" cy="350" r="4" fill="#9B7EBD" opacity="0.6" className="anim-glow" />
          <circle cx="300" cy="450" r="5" fill="#D4BEE4" opacity="0.8" />
          <circle cx="200" cy="600" r="4" fill="#9B7EBD" opacity="0.5" />
          <circle cx="100" cy="200" r="6" fill="#4A1E6D" opacity="0.4" />

          <defs>
            <linearGradient id="bgRayGrad" x1="1100" y1="400" x2="100" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9B7EBD" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4BEE4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4A1E6D" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D4BEE4]/50 border border-[#D4BEE4] text-[#4A1E6D]">
              <span className="h-2 w-2 rounded-full bg-[#9B7EBD] animate-pulse"></span>
              <span className="text-xs font-bold font-premium tracking-wide uppercase">All-In-One Event Platform</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-[#4A1E6D] leading-tight">
              Connect Your <br />
              <span className="gradient-text">Event Sphere</span>
            </h1>
            
            <p className="font-premium text-base sm:text-lg text-[#4A1E6D]/80 leading-relaxed max-w-xl">
              Host E-sports matches, concerts, workshops, and business conferences. Create customizable tickets, track dashboard sales, and scan passes securely at the gate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#explore" 
                className="gradient-brand text-white font-premium font-semibold px-8 py-3.5 rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20 text-center cursor-pointer"
              >
                Explore Events
              </a>
              <a 
                href="#create-event" 
                className="bg-white border-2 border-[#D4BEE4] text-[#4A1E6D] hover:bg-[#D4BEE4]/20 hover:border-[#9B7EBD] font-premium font-semibold px-8 py-3.5 rounded-xl transition-premium text-center cursor-pointer"
              >
                Post an Event
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#D4BEE4]/60 max-w-md">
              <div>
                <p className="font-display text-3xl font-bold text-[#4A1E6D]">12k+</p>
                <p className="font-premium text-xs text-[#4A1E6D]/60 mt-1">Active Events</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-[#4A1E6D]">450k+</p>
                <p className="font-premium text-xs text-[#4A1E6D]/60 mt-1">Attendees</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-[#4A1E6D]">99.9%</p>
                <p className="font-premium text-xs text-[#4A1E6D]/60 mt-1">Check-in Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Wide-Span Animated Isometric SVG Illustration */}
          <div className="lg:col-span-7 flex justify-center w-full relative">
            <div className="w-full aspect-[4/3] max-w-2xl relative select-none">
              
              <svg 
                className="w-full h-full filter drop-shadow-lg" 
                viewBox="0 0 600 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                
                {/* ─── LinearGradients & Definitions ─── */}
                <defs>
                  <linearGradient id="mainSphereGrad" x1="300" y1="120" x2="300" y2="380" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#9B7EBD" />
                    <stop offset="100%" stopColor="#4A1E6D" />
                  </linearGradient>
                  
                  <linearGradient id="glowColor" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D4BEE4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#9B7EBD" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="nodeTextGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A1E6D" />
                    <stop offset="100%" stopColor="#5C3B76" />
                  </linearGradient>
                  
                  <linearGradient id="laserLine" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#9B7EBD" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#9B7EBD" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* ─── Network Rays / Linking Lines (Pulse Dash) ─── */}
                <g opacity="0.6">
                  <path d="M 300 250 L 140 130" stroke="#9B7EBD" strokeWidth="2.5" className="anim-dash" />
                  <path d="M 300 250 L 460 130" stroke="#9B7EBD" strokeWidth="2.5" className="anim-dash" />
                  <path d="M 300 250 L 140 370" stroke="#9B7EBD" strokeWidth="2.5" className="anim-dash" />
                  <path d="M 300 250 L 460 370" stroke="#9B7EBD" strokeWidth="2.5" className="anim-dash" />
                </g>

                {/* ─── Rotating Orbital Rings ─── */}
                <g className="anim-spin-cw">
                  {/* Inner ring */}
                  <ellipse cx="300" cy="250" rx="140" ry="60" stroke="#D4BEE4" strokeWidth="2" strokeDasharray="10 12" />
                  <circle cx="160" cy="250" r="6" fill="#9B7EBD" />
                  <circle cx="440" cy="250" r="6" fill="#4A1E6D" />
                </g>

                <g className="anim-spin-ccw">
                  {/* Outer ring */}
                  <ellipse cx="300" cy="250" rx="190" ry="85" stroke="#9B7EBD" strokeWidth="1.5" strokeDasharray="15 8" opacity="0.75" />
                  <circle cx="300" cy="165" r="5" fill="#D4BEE4" />
                  <circle cx="300" cy="335" r="5" fill="#9B7EBD" />
                </g>

                {/* ─── Central Holographic Sphere (meetSphere) ─── */}
                <g className="anim-glow">
                  {/* Sphere Shadow base */}
                  <ellipse cx="300" cy="285" rx="80" ry="25" fill="#4A1E6D" opacity="0.15" />
                  
                  {/* Main glowing sphere body */}
                  <circle cx="300" cy="250" r="65" fill="url(#mainSphereGrad)" />
                  
                  {/* Inner grid patterns to make it look futuristic */}
                  <ellipse cx="300" cy="250" rx="65" ry="22" stroke="#EEEEEE" strokeWidth="1.5" opacity="0.4" />
                  <ellipse cx="300" cy="250" rx="25" ry="65" stroke="#EEEEEE" strokeWidth="1.5" opacity="0.4" />
                </g>

                {/* ─── Floating Node 1: E-sports Match Card (Top-Left) ─── */}
                <g className="anim-float-slow">
                  {/* Card Background */}
                  <rect x="50" y="50" width="150" height="90" rx="16" fill="#FFFFFF" stroke="#D4BEE4" strokeWidth="1.5" />
                  {/* Header Badge */}
                  <rect x="62" y="62" width="55" height="18" rx="6" fill="#4A1E6D" />
                  <text x="90" y="74" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">ESPORTS</text>
                  
                  {/* Controller Icon SVG Inline */}
                  <path d="M 68 95 C 68 90, 78 88, 86 88 C 94 88, 104 90, 104 95 C 104 102, 94 104, 86 104 C 78 104, 68 102, 68 95 Z" fill="#D4BEE4" opacity="0.7" />
                  <rect x="74" y="93" width="10" height="4" rx="1" fill="#4A1E6D" />
                  <rect x="77" y="90" width="4" height="10" rx="1" fill="#4A1E6D" />
                  <circle cx="94" cy="93" r="2" fill="#4A1E6D" />
                  <circle cx="98" cy="97" r="2" fill="#4A1E6D" />

                  {/* Text details */}
                  <text x="65" y="122" fill="url(#nodeTextGrad)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Championship finals</text>
                </g>

                {/* ─── Floating Node 2: Concert Music Card (Top-Right) ─── */}
                <g className="anim-float-medium">
                  {/* Card Background */}
                  <rect x="400" y="60" width="150" height="90" rx="16" fill="#FFFFFF" stroke="#D4BEE4" strokeWidth="1.5" />
                  {/* Header Badge */}
                  <rect x="412" y="72" width="50" height="18" rx="6" fill="#9B7EBD" />
                  <text x="437" y="84" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">CONCERT</text>
                  
                  {/* Music Note Icon SVG Inline */}
                  <circle cx="425" cy="110" r="6" fill="#4A1E6D" />
                  <circle cx="438" cy="106" r="6" fill="#4A1E6D" />
                  <path d="M 431 110 L 431 96 L 444 92 L 444 106" stroke="#4A1E6D" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 431 98 L 444 94" stroke="#9B7EBD" strokeWidth="4" strokeLinecap="round" />

                  {/* Text Details */}
                  <text x="460" y="112" fill="url(#nodeTextGrad)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Live Acoustics</text>
                  <text x="460" y="125" fill="#9B7EBD" fontSize="8" fontWeight="bold" fontFamily="sans-serif">July 22, 2026</text>
                </g>

                {/* ─── Floating Node 3: Encrypted QR Ticket Scanner (Bottom-Left) ─── */}
                <g className="anim-float-delayed">
                  {/* Container Card */}
                  <rect x="40" y="320" width="170" height="110" rx="16" fill="#FFFFFF" stroke="#D4BEE4" strokeWidth="1.5" />
                  
                  {/* Stylized Ticket Pass */}
                  <g>
                    <rect x="55" y="340" width="80" height="70" rx="8" fill="#4A1E6D" />
                    
                    {/* Ticket dotted divider line */}
                    <line x1="55" y1="385" x2="135" y2="385" stroke="#D4BEE4" strokeWidth="2" strokeDasharray="4 4" />
                    
                    {/* Dynamic QR Grid Mockup */}
                    <rect x="65" y="350" width="24" height="24" rx="2" fill="#FFFFFF" />
                    <rect x="68" y="353" width="7" height="7" fill="#4A1E6D" />
                    <rect x="80" y="363" width="6" height="6" fill="#4A1E6D" />
                    <rect x="68" y="365" width="4" height="4" fill="#9B7EBD" />

                    {/* Ticket Text */}
                    <text x="96" y="358" fill="#D4BEE4" fontSize="7" fontWeight="bold" fontFamily="sans-serif">ADMIT ONE</text>
                    <text x="96" y="368" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">VIP PASS</text>
                    <text x="95" y="400" fill="#D4BEE4" fontSize="6" fontFamily="sans-serif" textAnchor="middle">#MS-7492-AX</text>
                  </g>

                  {/* Active Green Scanning Laser Beam (Animates Sweep) */}
                  <g className="anim-laser">
                    <line x1="50" y1="345" x2="140" y2="345" stroke="#9B7EBD" strokeWidth="3" opacity="0.8" />
                    {/* Laser glow background */}
                    <polygon points="50,345 140,345 140,335 50,335" fill="url(#glowColor)" opacity="0.3" />
                  </g>
                  
                  {/* Status Badge */}
                  <circle cx="158" cy="375" r="10" fill="#EEEEEE" />
                  <path d="M 154 375 L 157 378 L 163 372" stroke="#9B7EBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* ─── Floating Node 4: Conference Analytics Card (Bottom-Right) ─── */}
                <g className="anim-float-slow">
                  {/* Card Background */}
                  <rect x="390" y="310" width="160" height="110" rx="16" fill="#FFFFFF" stroke="#D4BEE4" strokeWidth="1.5" />
                  
                  {/* Header */}
                  <text x="405" y="332" fill="#4A1E6D" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Registration Stats</text>
                  
                  {/* Bar Graph Illustration */}
                  <rect x="405" y="375" width="12" height="25" rx="2" fill="#D4BEE4" />
                  <rect x="423" y="360" width="12" height="40" rx="2" fill="#9B7EBD" />
                  <rect x="441" y="350" width="12" height="50" rx="2" fill="#4A1E6D" />
                  <rect x="459" y="365" width="12" height="35" rx="2" fill="#9B7EBD" />

                  {/* Attendee Count Badge */}
                  <rect x="480" y="362" width="58" height="28" rx="8" fill="#EEEEEE" />
                  <text x="509" y="375" fill="#4A1E6D" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Capacity</text>
                  <text x="509" y="386" fill="#9B7EBD" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">88% Full</text>
                </g>

              </svg>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

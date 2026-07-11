import React from 'react';

const SecuritySection = () => {
  return (
    <section className="py-20 bg-[#EEEEEE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* SVG Security Shield Graphic */}
          <div className="lg:col-span-5 flex justify-center w-full order-last lg:order-first">
            <div className="relative w-full max-w-sm aspect-square bg-white rounded-3xl border border-[#D4BEE4] shadow-sm p-8 overflow-hidden flex items-center justify-center">
              
              <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-[#D4BEE4]/40 blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-[#9B7EBD]/15 blur-2xl"></div>

              <svg 
                className="w-full h-full object-contain" 
                viewBox="0 0 400 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Shield definitions */}
                <defs>
                  <linearGradient id="shieldGrad" x1="200" y1="50" x2="200" y2="350">
                    <stop offset="0%" stopColor="#9B7EBD" />
                    <stop offset="100%" stopColor="#3B1E54" />
                  </linearGradient>
                </defs>

                {/* Outer concentric security waves */}
                <circle cx="200" cy="200" r="160" stroke="#D4BEE4" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
                <circle cx="200" cy="200" r="120" stroke="#9B7EBD" strokeWidth="1.5" opacity="0.3" />

                {/* The Security Shield */}
                <path 
                  d="M200 60 C260 60 310 80 310 80 C310 80 310 200 310 240 C310 300 240 340 200 350 C160 340 90 300 90 240 C90 200 90 80 90 80 C90 80 140 60 200 60 Z" 
                  fill="url(#shieldGrad)" 
                  shadow-sm="true"
                />

                {/* Inner Shield Overlay for depth */}
                <path 
                  d="M200 80 C245 80 285 96 285 96 C285 96 285 190 285 224 C285 272 230 306 200 315 C170 306 115 272 115 224 C115 190 115 96 115 96 C115 96 155 80 200 80 Z" 
                  fill="#3B1E54" 
                  opacity="0.3"
                />

                {/* Glowing checkmark in shield */}
                <path 
                  d="M150 190 L185 225 L255 155" 
                  stroke="#EEEEEE" 
                  strokeWidth="16" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Dynamic lock indicators */}
                <rect x="185" y="270" width="30" height="20" rx="4" fill="#D4BEE4" />
                <path d="M190 270 V260 C190 250 210 250 210 260 V270" stroke="#D4BEE4" strokeWidth="3" fill="none" />

              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4BEE4]/45 border border-[#D4BEE4] text-[#3B1E54]">
              <span className="text-xs font-bold font-premium tracking-wide uppercase">Enterprise Grade Safety</span>
            </div>
            
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#3B1E54]">
              Fortified Security & <br />
              <span className="gradient-text">Encrypted Payments</span>
            </h2>
            
            <p className="font-premium text-base text-[#3B1E54]/75 leading-relaxed">
              Every ticket issued by meetSphere carries a digitally signed token encrypted into a dynamic QR code. This ensures zero ticket counterfeiting and stops double-scans instantly.
            </p>

            {/* List of security checks */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <span className="p-1 bg-white rounded-lg text-[#9B7EBD] border border-[#D4BEE4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-premium font-bold text-slate-800">Fraud-Proof QR Passes</h4>
                  <p className="font-premium text-sm text-[#3B1E54]/70">Dynamic barcodes prevent ticket duplication and coordinate verification databases in real-time.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="p-1 bg-white rounded-lg text-[#9B7EBD] border border-[#D4BEE4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-premium font-bold text-slate-800">Secure Payment Gateways</h4>
                  <p className="font-premium text-sm text-[#3B1E54]/70">Stripe and SSL-secured checkout layers handle all payments, ensuring user transaction details are never stored on our servers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="p-1 bg-white rounded-lg text-[#9B7EBD] border border-[#D4BEE4]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-premium font-bold text-slate-800">Privacy & Verification Compliance</h4>
                  <p className="font-premium text-sm text-[#3B1E54]/70">Organizers undergo authentication before hosting events, ensuring a vetted community space for attendees.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;

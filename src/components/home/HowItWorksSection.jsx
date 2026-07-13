const HowItWorksSection = () => {
  const attendeeSteps = [
    { num: "01", title: "Browse & Filter", text: "Search events by category, location tags, or calendar dates." },
    { num: "02", title: "Secure Checkout", text: "Choose your ticket tier and check out instantly via encrypted gateways." },
    { num: "03", title: "Scan & Attend", text: "Access your QR ticket inside your account and show it at the gate." }
  ];

  const organizerSteps = [
    { num: "01", title: "Host in Minutes", text: "Create an event profile, configure ticket tiers, and set timing." },
    { num: "02", title: "Promote & Track", text: "Watch real-time ticketing metrics grow on your dashboard console." },
    { num: "03", title: "Scan at the Gate", text: "Verify attendees using our built-in camera QR check-in scanner." }
  ];

  return (
    <section className="py-20 bg-[#EEEEEE] border-b border-[#D4BEE4]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#4A1E6D]">How meetSphere Works</h2>
          <p className="font-premium text-base text-[#4A1E6D]/75 max-w-xl mx-auto leading-relaxed">
            A frictionless flow designed to bring communities together securely and efficiently.
          </p>
        </div>

        {/* Two Column Layout: Attendee vs Organizer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Attendee Column */}
          <div className="bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-[#D4BEE4]/60 shadow-sm space-y-8">
            <div className="border-b border-[#D4BEE4]/50 pb-4">
              <h3 className="font-display text-2xl font-bold text-[#4A1E6D] flex items-center">
                <span className="p-2 bg-[#D4BEE4]/30 rounded-xl text-[#9B7EBD] mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </span>
                For Attendees
              </h3>
            </div>
            
            <div className="space-y-6">
              {attendeeSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="font-display text-xl font-bold text-[#9B7EBD] bg-[#EEEEEE]/50 px-3 py-1.5 rounded-xl border border-[#D4BEE4]/40">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-premium font-bold text-lg text-[#4A1E6D]">{step.title}</h4>
                    <p className="font-premium text-sm text-[#4A1E6D]/70 mt-1 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer Column */}
          <div className="bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-[#D4BEE4]/60 shadow-sm space-y-8">
            <div className="border-b border-[#D4BEE4]/50 pb-4">
              <h3 className="font-display text-2xl font-bold text-[#4A1E6D] flex items-center">
                <span className="p-2 bg-[#D4BEE4]/30 rounded-xl text-[#9B7EBD] mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>
                For Organizers
              </h3>
            </div>
            
            <div className="space-y-6">
              {organizerSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="font-display text-xl font-bold text-[#9B7EBD] bg-[#EEEEEE]/50 px-3 py-1.5 rounded-xl border border-[#D4BEE4]/40">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-premium font-bold text-lg text-[#4A1E6D]">{step.title}</h4>
                    <p className="font-premium text-sm text-[#4A1E6D]/70 mt-1 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;

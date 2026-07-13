const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" />
        </svg>
      ),
      title: "Intelligent Event Filters",
      description: "Find exactly what you want using robust category selectors, location markers, and custom calendars."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Dynamic QR Ticketing",
      description: "Instant secure ticket generation with unique, encrypted QR passes delivered to your account upon checkout."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Organizer Command Center",
      description: "Track event analytics, watch transaction statistics grow, and manage your attendee list from a single dashboard."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Built-In Scanner Console",
      description: "Scan and validate ticket holders instantly at the gate using the integrated browser webcam scanner tool."
    }
  ];

  return (
    <section className="py-20 bg-[#EEEEEE] border-b border-[#D4BEE4]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#4A1E6D]">
            Everything You Need to Host or Attend
          </h2>
          <p className="font-premium text-base text-[#4A1E6D]/75 max-w-xl mx-auto leading-relaxed">
            meetSphere provides a full suite of event management and booking features, eliminating security issues and payment delays.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="hover-premium bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#D4BEE4]/60 flex flex-col justify-between h-full group hover:bg-white hover:border-[#9B7EBD] hover:shadow-lg hover:shadow-[#9B7EBD]/10 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-[#EEEEEE]/50 rounded-xl border border-[#D4BEE4]/45 text-primary group-hover:scale-110 group-hover:bg-[#D4BEE4]/30 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-premium font-bold text-lg text-[#4A1E6D]">{feature.title}</h3>
                <p className="font-premium text-sm text-[#4A1E6D]/70 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;

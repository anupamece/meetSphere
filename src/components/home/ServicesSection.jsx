import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: "Concerts & Shows",
      desc: "Live music sessions, acoustic nights, festivals, and theatrical stage plays.",
      tag: "Entertainment",
      color: "border-[#9B7EBD]"
    },
    {
      title: "E-sports Matches",
      desc: "Local LAN parties, multiplayer tournament streams, and professional gaming leagues.",
      tag: "Gaming",
      color: "border-[#3B1E54]"
    },
    {
      title: "Workshops & Bootcamps",
      desc: "Hands-on coding masterclasses, painting galleries, cooking classes, and design reviews.",
      tag: "Education",
      color: "border-[#9B7EBD]"
    },
    {
      title: "Tech Conferences",
      desc: "Developer gatherings, keynote panels, venture summits, and professional networking meetups.",
      tag: "Business",
      color: "border-[#3B1E54]"
    },
    {
      title: "Local Meetups",
      desc: "Book clubs, local board game nights, weekend hikes, and community discussions.",
      tag: "Social",
      color: "border-[#D4BEE4]"
    },
    {
      title: "Sports Tournaments",
      desc: "Intramural football leagues, tennis tournaments, run clubs, and fitness gatherings.",
      tag: "Athletics",
      color: "border-[#9B7EBD]"
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#D4BEE4]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#3B1E54]">Events We Power</h2>
          <p className="font-premium text-base text-[#3B1E54]/75 max-w-xl mx-auto leading-relaxed">
            From close-knit local groups to large-scale conferences and live stadium tournaments, we scale with you.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`bg-[#EEEEEE]/30 p-8 rounded-3xl border-l-4 ${service.color} border-y border-r border-[#D4BEE4]/50 hover:bg-[#D4BEE4]/10 transition-all duration-300 shadow-sm`}
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-[#D4BEE4]/40 border border-[#D4BEE4] rounded-full text-xs font-bold font-premium text-[#3B1E54]">
                  {service.tag}
                </span>
                <h3 className="font-premium font-bold text-xl text-[#3B1E54]">{service.title}</h3>
                <p className="font-premium text-sm text-[#3B1E54]/70 leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

import React from 'react';
import { Music, Gamepad2, BookOpen, Presentation, Users, Trophy } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: "Concerts & Shows",
      desc: "Live music sessions, acoustic nights, festivals, and theatrical stage plays.",
      tag: "Entertainment",
      color: "border-[#9B7EBD]",
      icon: <Music className="w-6 h-6 text-[#9B7EBD]" />
    },
    {
      title: "E-sports Matches",
      desc: "Local LAN parties, multiplayer tournament streams, and professional gaming leagues.",
      tag: "Gaming",
      color: "border-[#4A1E6D]",
      icon: <Gamepad2 className="w-6 h-6 text-[#4A1E6D]" />
    },
    {
      title: "Workshops & Bootcamps",
      desc: "Hands-on coding masterclasses, painting galleries, cooking classes, and design reviews.",
      tag: "Education",
      color: "border-[#9B7EBD]",
      icon: <BookOpen className="w-6 h-6 text-[#9B7EBD]" />
    },
    {
      title: "Tech Conferences",
      desc: "Developer gatherings, keynote panels, venture summits, and professional networking meetups.",
      tag: "Business",
      color: "border-[#4A1E6D]",
      icon: <Presentation className="w-6 h-6 text-[#4A1E6D]" />
    },
    {
      title: "Local Meetups",
      desc: "Book clubs, local board game nights, weekend hikes, and community discussions.",
      tag: "Social",
      color: "border-[#D4BEE4]",
      icon: <Users className="w-6 h-6 text-[#9B7EBD]" />
    },
    {
      title: "Sports Tournaments",
      desc: "Intramural football leagues, tennis tournaments, run clubs, and fitness gatherings.",
      tag: "Athletics",
      color: "border-[#9B7EBD]",
      icon: <Trophy className="w-6 h-6 text-[#4A1E6D]" />
    }
  ];

  return (
    <section className="py-20 bg-[#EEEEEE] border-b border-[#D4BEE4]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#4A1E6D]">Events We Power</h2>
          <p className="font-premium text-base text-[#4A1E6D]/75 max-w-xl mx-auto leading-relaxed">
            From close-knit local groups to large-scale conferences and live stadium tournaments, we scale with you.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`bg-white/50 backdrop-blur-sm p-8 rounded-3xl border-l-4 ${service.color} border-y border-r border-[#D4BEE4]/60 hover:bg-white hover:scale-[1.03] hover:-translate-y-2 hover:shadow-lg hover:shadow-[#9B7EBD]/15 hover:border-[#9B7EBD] transition-all duration-300 shadow-sm cursor-pointer group`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 py-1 bg-[#D4BEE4]/40 border border-[#D4BEE4] rounded-full text-xs font-bold font-premium text-[#4A1E6D]">
                    {service.tag}
                  </span>
                  <div className="p-2 bg-[#EEEEEE]/50 rounded-xl border border-[#D4BEE4]/40 group-hover:scale-110 group-hover:bg-[#D4BEE4]/20 transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="font-premium font-bold text-xl text-[#4A1E6D]">{service.title}</h3>
                <p className="font-premium text-sm text-[#4A1E6D]/70 leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

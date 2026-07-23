import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Film, Utensils, Plus, Sparkles, ShieldCheck } from 'lucide-react';

const HostEvent = () => {
  // Options configuration using standard router paths
  const eventOptions = [
    {
      id: 'standard',
      title: 'Live & General Event',
      category: 'Concerts, Workshops & Meetups',
      description: 'Host live music shows, sports matches, tech conferences, workshops, or community meetups.',
      icon: <Calendar className="w-6 h-6 text-[#4A1E6D]" />,
      badgeBg: 'bg-[#4A1E6D]/10 text-[#4A1E6D]',
      href: '/add-event',
    },
    {
      id: 'movie',
      title: 'Movie Screening',
      category: 'Cinema, Premieres & Festivals',
      description: 'Organize theatrical film premieres, cinema screenings, or indie movie night gatherings.',
      icon: <Film className="w-6 h-6 text-[#4A1E6D]" />,
      badgeBg: 'bg-[#9B7EBD]/20 text-[#4A1E6D]',
      href: '/add-movies',
    },
    {
      id: 'dining',
      title: 'Dining & Culinary',
      category: 'Restaurants, Cafes & Tastings',
      description: 'List gourmet dining experiences, food tasting festivals, pop-up cafes, or fine dining events.',
      icon: <Utensils className="w-6 h-6 text-[#4A1E6D]" />,
      badgeBg: 'bg-[#D4BEE4]/40 text-[#4A1E6D]',
      href: '/add-dining',
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-premium uppercase tracking-widest bg-[#4A1E6D]/10 text-[#4A1E6D] border border-[#4A1E6D]/20">
            <Sparkles className="w-3.5 h-3.5" />
            Organizer Portal
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#4A1E6D]">
            What type of event are you hosting?
          </h1>
          <p className="font-premium text-sm text-[#4A1E6D]/75 leading-relaxed">
            Select an event category below to get started with your creation form.
          </p>
        </div>

        {/* 3 Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventOptions.map((option) => (
            <Link key={option.id} to={option.href} className="block h-full">
              <div className="h-full flex flex-col justify-between p-7 bg-white/80 backdrop-blur-sm border border-[#D4BEE4]/60 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#9B7EBD] transition-all duration-300 group cursor-pointer">
                
                {/* Top Section */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#EEEEEE] rounded-2xl border border-[#D4BEE4]/40 group-hover:scale-110 transition-transform duration-300">
                      {option.icon}
                    </div>
                    <span className={`text-[11px] font-bold font-premium uppercase tracking-wider px-2.5 py-1 rounded-full ${option.badgeBg}`}>
                      {option.id}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-display text-xl font-bold text-[#4A1E6D] group-hover:text-[#9B7EBD] transition-colors duration-200">
                      {option.title}
                    </h2>
                    <p className="font-premium text-xs font-semibold text-[#9B7EBD]">
                      {option.category}
                    </p>
                  </div>

                  <p className="font-premium text-xs text-[#4A1E6D]/70 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* CTA Footer */}
                <div className="pt-6 mt-6 border-t border-[#D4BEE4]/40 flex items-center justify-between text-xs font-bold font-premium text-[#4A1E6D] group-hover:text-[#9B7EBD]">
                  <span>Create Listing</span>
                  <div className="p-1.5 rounded-full bg-[#EEEEEE] group-hover:bg-[#4A1E6D] group-hover:text-white transition-all duration-300">
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Informational Footer Note */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/40 border border-[#D4BEE4]/40 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#4A1E6D]">
            <ShieldCheck className="w-4 h-4 text-[#9B7EBD]" />
            Verified Organizer Listings
          </div>
          <p className="font-premium text-[11px] text-[#4A1E6D]/60">
            All hosted events are published directly to the meetSphere discovery feed upon submission.
          </p>
        </div>

      </div>
    </div>
  );
};

export default HostEvent;

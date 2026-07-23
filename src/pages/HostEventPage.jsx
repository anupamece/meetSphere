import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Film, Utensils, Plus, Sparkles } from 'lucide-react';

const HostEventPage = () => {
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
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B7EBD]/15 text-[#4A1E6D] font-premium font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#9B7EBD]" /> Host Portal
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#4A1E6D]">
            What type of experience are you hosting?
          </h1>
          <p className="font-premium text-sm text-[#4A1E6D]/70">
            Select a category below to list your experience on meetSphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {eventOptions.map((opt) => (
            <div
              key={opt.id}
              className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl inline-flex ${opt.badgeBg}`}>
                  {opt.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-premium font-bold uppercase tracking-wider text-[#9B7EBD]">
                    {opt.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#4A1E6D] group-hover:text-[#9B7EBD] transition-colors">
                    {opt.title}
                  </h3>
                </div>
                <p className="font-premium text-xs text-[#4A1E6D]/70 leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <Link
                to={opt.href}
                className="inline-flex items-center justify-center gap-2 gradient-brand text-white font-premium font-bold py-3 px-4 rounded-xl text-xs shadow-md hover:opacity-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create Listing
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostEventPage;

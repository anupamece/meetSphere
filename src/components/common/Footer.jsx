import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#160B24] text-[#EEEEEE] pt-16 pb-8 border-t border-[#160B24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#D4BEE4]/20">
          
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/Logos/favicon.png" 
                alt="meetSphere Logo" 
                className="w-9 h-9 object-contain bg-white p-1 rounded-lg"
              />
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                meetSphere
              </span>
            </div>
            <p className="font-premium text-sm text-[#D4BEE4] leading-relaxed max-w-sm">
              A modern event management and ticketing platform that makes it effortless for organizers to host, promote, and validate gatherings.
            </p>
          </div>

          {/* Quick links columns */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-premium font-bold text-sm uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 font-premium text-sm text-[#D4BEE4]">
              <li><a href="/explore" className="hover:text-white transition-colors duration-200">Browse Events</a></li>
              <li><a href="/host-event" className="hover:text-white transition-colors duration-200">Host Event</a></li>
              <li><a href="/dining" className="hover:text-white transition-colors duration-200">Dining</a></li>
              <li><a href="/movies" className="hover:text-white transition-colors duration-200">Movies</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-premium font-bold text-sm uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 font-premium text-sm text-[#D4BEE4]">
              <li><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#press" className="hover:text-white transition-colors duration-200">Press Kit</a></li>
              <li><a href="#security" className="hover:text-white transition-colors duration-200">Safety & Trust</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-premium font-bold text-sm uppercase tracking-wider text-white">Stay Connected</h4>
            <p className="font-premium text-sm text-[#D4BEE4]">Get weekly updates on popular local workshops, match tournaments, and gatherings.</p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="px-4 py-2.5 bg-[#EEEEEE] text-[#4A1E6D] border border-[#D4BEE4]/40 rounded-xl font-premium text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
              />
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-[#9B7EBD] text-white hover:bg-[#80639E] font-premium font-bold rounded-xl transition-premium shadow-md shadow-[#9B7EBD]/10 text-center cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom Details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-premium text-[#D4BEE4]/60 gap-4">
          <p>© {new Date().getFullYear()} meetSphere Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

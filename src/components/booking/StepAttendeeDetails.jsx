import React from "react";
import { User, Mail, Phone, ArrowLeft, ArrowRight } from "lucide-react";

const StepAttendeeDetails = ({
  attendeeName,
  setAttendeeName,
  attendeeEmail,
  setAttendeeEmail,
  attendeePhone,
  setAttendeePhone,
  handleBack,
  handleNext,
  canProceedStep2,
  isFree,
}) => {
  return (
    <div className="relative z-10 space-y-6">
      <div className="space-y-1">
        <h3 className="font-display text-2xl font-bold text-[#4A1E6D]">
          Your Details
        </h3>
        <p className="font-premium text-sm text-[#4A1E6D]/60">
          We'll use this for your digital ticket.
        </p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B7EBD]" />
            <input
              type="text"
              required
              placeholder="Anupam Poddar"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B7EBD]" />
            <input
              type="email"
              required
              placeholder="anupam@email.com"
              value={attendeeEmail}
              onChange={(e) => setAttendeeEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
            Phone Number{" "}
            <span className="text-[#4A1E6D]/30">(optional)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B7EBD]" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={attendeePhone}
              onChange={(e) => setAttendeePhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleBack}
          className="flex-1 py-3.5 rounded-xl border border-[#D4BEE4]/60 bg-white/80 font-premium font-semibold text-[#4A1E6D] text-sm hover:bg-[#EEEEEE] transition-premium flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceedStep2}
          className="flex-[2] gradient-brand text-white font-premium font-semibold py-3.5 rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isFree ? "Confirm Booking" : "Continue to Payment"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StepAttendeeDetails;

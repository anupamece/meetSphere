import React from "react";
import { CircleCheck } from "lucide-react";

const BookingStepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-premium text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              currentStep === step.num
                ? "gradient-brand text-white shadow-md shadow-[#9B7EBD]/20"
                : currentStep > step.num
                ? "bg-[#9B7EBD]/20 text-[#4A1E6D]"
                : "bg-white/60 text-[#4A1E6D]/40 border border-[#D4BEE4]/40"
            }`}
          >
            {currentStep > step.num ? (
              <CircleCheck className="w-4 h-4" />
            ) : (
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                {step.num}
              </span>
            )}
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${
                currentStep > step.num ? "bg-[#9B7EBD]" : "bg-[#D4BEE4]/40"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingStepIndicator;

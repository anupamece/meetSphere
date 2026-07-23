import React from "react";
import { CreditCard, ShieldCheck, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const StepPayment = ({
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  upiId,
  setUpiId,
  formatCardNumber,
  formatExpiry,
  handleBack,
  handlePaymentSubmit,
  canProceedStep3,
  totalAmount,
  processingPayment,
}) => {
  return (
    <div className="relative z-10 space-y-6">
      <div className="space-y-1">
        <h3 className="font-display text-2xl font-bold text-[#4A1E6D]">
          Payment
        </h3>
        <p className="font-premium text-sm text-[#4A1E6D]/60">
          Select your payment method and enter details.
        </p>
      </div>

      {/* Payment method tabs */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { key: "card", label: "Card", icon: <CreditCard className="w-4 h-4" /> },
          { key: "upi", label: "UPI", icon: <span className="font-bold text-xs">₹</span> },
          { key: "paypal", label: "PayPal", icon: <span className="font-bold text-xs">P</span> },
        ].map((method) => (
          <button
            key={method.key}
            onClick={() => setPaymentMethod(method.key)}
            className={`py-3 rounded-xl font-premium text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              paymentMethod === method.key
                ? "gradient-brand text-white shadow-md shadow-[#9B7EBD]/20"
                : "bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 text-[#4A1E6D]/70 hover:border-[#9B7EBD]/40"
            }`}
          >
            {method.icon}
            {method.label}
          </button>
        ))}
      </div>

      {/* Card form */}
      {paymentMethod === "card" && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B7EBD]" />
              <input
                type="text"
                placeholder="4111 1111 1111 1111"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                maxLength={19}
                className="w-full pl-10 pr-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] tracking-widest focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) =>
                  setCardExpiry(formatExpiry(e.target.value))
                }
                maxLength={5}
                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] tracking-wider focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                CVV
              </label>
              <input
                type="password"
                placeholder="•••"
                value={cardCvv}
                onChange={(e) =>
                  setCardCvv(
                    e.target.value.replace(/\D/g, "").slice(0, 4)
                  )
                }
                maxLength={4}
                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] tracking-widest focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Test cards hint */}
          <div className="bg-[#9B7EBD]/5 border border-[#D4BEE4]/40 rounded-xl p-3.5">
            <p className="font-premium text-[10px] uppercase tracking-wider text-[#9B7EBD] font-bold mb-1.5">
              Test mode
            </p>
            <p className="font-premium text-xs text-[#4A1E6D]/60 leading-relaxed">
              Use{" "}
              <code className="px-1.5 py-0.5 bg-[#D4BEE4]/20 rounded text-[#4A1E6D] font-semibold">
                4111 1111 1111 1111
              </code>{" "}
              for success,{" "}
              <code className="px-1.5 py-0.5 bg-[#D4BEE4]/20 rounded text-[#4A1E6D] font-semibold">
                ×××× ×××× ×××× 0000
              </code>{" "}
              for failure.
            </p>
          </div>
        </div>
      )}

      {/* UPI form */}
      {paymentMethod === "upi" && (
        <div className="space-y-1.5">
          <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
            UPI ID
          </label>
          <input
            type="text"
            placeholder="yourname@paytm"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
          />
        </div>
      )}

      {/* PayPal */}
      {paymentMethod === "paypal" && (
        <div className="bg-[#EEEEEE]/50 rounded-2xl p-6 text-center">
          <p className="font-premium text-sm text-[#4A1E6D]/60">
            You'll be redirected to PayPal to complete payment.
          </p>
        </div>
      )}

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 text-[#4A1E6D]/40">
        <ShieldCheck className="w-4 h-4" />
        <span className="font-premium text-xs">
          Simulated payment — no real charges
        </span>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handleBack}
          disabled={processingPayment}
          className="flex-1 py-3.5 rounded-xl border border-[#D4BEE4]/60 bg-white/80 font-premium font-semibold text-[#4A1E6D] text-sm hover:bg-[#EEEEEE] transition-premium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handlePaymentSubmit}
          disabled={!canProceedStep3 || processingPayment}
          className="flex-[2] gradient-brand text-white font-premium font-semibold py-3.5 rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {processingPayment ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              Pay ₹{totalAmount}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepPayment;

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { eventDetails } from "../api/eventApi";
import { getDiningById } from "../api/diningApi";
import { movieDetails } from "../api/movieApi";
import { initiateBooking, simulatePayment, confirmBooking } from "../api/bookingApi";
import { ArrowLeft, Ticket, Loader2, Film, Sparkles, Utensils, ShieldCheck } from "lucide-react";

import BookingStepIndicator from "../components/booking/BookingStepIndicator";
import BookingSummaryCard from "../components/booking/BookingSummaryCard";
import StepSelectQuantity from "../components/booking/StepSelectQuantity";
import StepAttendeeDetails from "../components/booking/StepAttendeeDetails";
import StepPayment from "../components/booking/StepPayment";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const itemType = searchParams.get("type");
  const itemId = searchParams.get("id");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const passedQuantity = location.state?.quantity || 1;

  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(passedQuantity);

  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeePhone, setAttendeePhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        if (itemType === "Event") {
          const data = await eventDetails(itemId);
          setItem(data.event);
        } else if (itemType === "Dining") {
          const data = await getDiningById(itemId);
          setItem(data.dining);
        } else if (itemType === "Movie") {
          const data = await movieDetails(itemId);
          setItem(data.movie);
        }
      } catch (err) {
        console.error("Error fetching item details:", err);
        setError("Failed to load details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [itemType, itemId]);

  const price = item
    ? itemType === "Dining"
      ? item.price
      : item.ticketPrice
    : 0;
  const title = item
    ? itemType === "Dining"
      ? item.name
      : item.title
    : "";
  const availableTickets = item
    ? itemType === "Dining"
      ? Infinity
      : item.totalTickets - item.ticketsSold
    : 0;
  const totalAmount = price * quantity;
  const isFree = price === 0;
  const totalSteps = isFree ? 2 : 3;

  const executePaymentFlow = async () => {
    setProcessingPayment(true);
    setError(null);
    try {
      const data = await initiateBooking({
        itemType,
        itemId,
        quantity,
        paymentMethod: isFree ? "card" : paymentMethod,
        attendeeName,
        attendeeEmail,
      });

      const bookingId = data.booking._id;

      if (!isFree) {
        const payment = await simulatePayment({
          bookingId,
          cardNumber,
        });

        if (payment.success) {
          const confirmedData = await confirmBooking(bookingId);
          setPaymentSuccess(true);
          navigate(`/booking/${bookingId}`, {
            state: { booking: confirmedData.booking || data.booking }
          });
        } else {
          setError(payment.message || "Payment failed. Please try a different card.");
        }
      } else {
        const payment = await simulatePayment({ bookingId, cardNumber: "1111" });
        if (payment.success) {
          const confirmedData = await confirmBooking(bookingId);
          setPaymentSuccess(true);
          navigate(`/booking/${bookingId}`, {
            state: { booking: confirmedData.booking || data.booking }
          });
        }
      }
    } catch (err) {
      console.error("Error occurred while processing payment:", err);
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const getItemImage = () => {
    if (!item) return null;
    if (itemType === "Movie") return item.poster;
    if (itemType === "Event") return item.coverImage;
    if (itemType === "Dining") return item.image;
    return null;
  };

  const getItemMeta = () => {
    if (!item) return {};
    if (itemType === "Movie")
      return {
        subtitle: item.theatre || "Theatre",
        date: item.releaseDate,
        icon: <Film className="w-4 h-4" />,
        label: "Movie",
      };
    if (itemType === "Event")
      return {
        subtitle: item.venue?.name
          ? `${item.venue.name}, ${item.venue.city}`
          : "Venue",
        date: item.startDateTime,
        icon: <Sparkles className="w-4 h-4" />,
        label: item.category || "Event",
      };
    if (itemType === "Dining")
      return {
        subtitle: item.location || "Location",
        date: null,
        icon: <Utensils className="w-4 h-4" />,
        label: "Dining",
      };
    return {};
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    return cleaned;
  };

  const soldPercent = item
    ? itemType !== "Dining"
      ? Math.round((item.ticketsSold / item.totalTickets) * 100)
      : 0
    : 0;

  const canProceedStep1 = quantity >= 1 && quantity <= availableTickets;
  const canProceedStep2 = attendeeName.trim() && attendeeEmail.trim();
  const canProceedStep3 =
    paymentMethod === "card"
      ? cardNumber.replace(/\s/g, "").length === 16 &&
        cardExpiry.length >= 4 &&
        cardCvv.length >= 3
      : paymentMethod === "upi"
      ? upiId.includes("@")
      : true;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const steps = isFree
    ? [
        { num: 1, label: "Select" },
        { num: 2, label: "Details" },
      ]
    : [
        { num: 1, label: "Select" },
        { num: 2, label: "Details" },
        { num: 3, label: "Payment" },
      ];

  const meta = getItemMeta();
  const itemImage = getItemImage();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#9B7EBD] animate-spin" />
          <p className="font-premium text-sm text-[#4A1E6D]/60">
            Loading booking details...
          </p>
        </div>
      </div>
    );
  }

  if (error && !processingPayment && !item) {
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center px-4">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-10 text-center max-w-md">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-7 h-7 text-rose-400" />
          </div>
          <h2 className="font-display text-xl font-bold text-[#4A1E6D] mb-2">
            {error || "Item not found"}
          </h2>
          <p className="font-premium text-sm text-[#4A1E6D]/60 mb-6">
            We couldn't load the booking details. Please go back and try again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 gradient-brand text-white rounded-xl font-premium font-semibold text-sm transition-premium hover:opacity-90 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEEEEE] pt-14 pb-12 px-4 sm:px-6 lg:px-8 relative">
      
      {processingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 rounded-3xl border border-[#D4BEE4]/80 p-8 max-w-sm w-full text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-[#9B7EBD]/15 flex items-center justify-center mx-auto text-[#4A1E6D]">
              <Loader2 className="w-8 h-8 text-[#9B7EBD] animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-[#4A1E6D]">
                {isFree ? "Generating Free Pass..." : "Processing Payment..."}
              </h3>
              <p className="font-premium text-xs text-[#4A1E6D]/70 leading-relaxed">
                {isFree
                  ? "Reserving your tickets and issuing digital pass."
                  : "Communicating securely with payment simulation gateway."}
              </p>
            </div>
            <div className="w-full bg-[#EEEEEE] h-1.5 rounded-full overflow-hidden">
              <div className="h-full gradient-brand animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2 text-[#4A1E6D]/50 font-premium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9B7EBD]" />
              <span>Please do not close or refresh this page</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          disabled={processingPayment}
          className="mb-4 inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-premium font-semibold text-center animate-fade-in">
            {error}
          </div>
        )}

        <BookingStepIndicator steps={steps} currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <BookingSummaryCard
              itemImage={itemImage}
              title={title}
              meta={meta}
              itemType={itemType}
              availableTickets={availableTickets}
              soldPercent={soldPercent}
              price={price}
              quantity={quantity}
              totalAmount={totalAmount}
              isFree={isFree}
            />
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#9B7EBD]/10 rounded-full blur-2xl pointer-events-none" />

              {currentStep === 1 && (
                <StepSelectQuantity
                  itemType={itemType}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  availableTickets={availableTickets}
                  isFree={isFree}
                  price={price}
                  totalAmount={totalAmount}
                  canProceedStep1={canProceedStep1}
                  handleNext={handleNext}
                />
              )}

              {currentStep === 2 && (
                <StepAttendeeDetails
                  attendeeName={attendeeName}
                  setAttendeeName={setAttendeeName}
                  attendeeEmail={attendeeEmail}
                  setAttendeeEmail={setAttendeeEmail}
                  attendeePhone={attendeePhone}
                  setAttendeePhone={setAttendeePhone}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  handlePaymentSubmit={executePaymentFlow}
                  canProceedStep2={canProceedStep2}
                  isFree={isFree}
                  processingPayment={processingPayment}
                />
              )}

              {currentStep === 3 && !isFree && (
                <StepPayment
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  cardNumber={cardNumber}
                  setCardNumber={setCardNumber}
                  cardExpiry={cardExpiry}
                  setCardExpiry={setCardExpiry}
                  cardCvv={cardCvv}
                  setCardCvv={setCardCvv}
                  upiId={upiId}
                  setUpiId={setUpiId}
                  formatCardNumber={formatCardNumber}
                  formatExpiry={formatExpiry}
                  handleBack={handleBack}
                  handlePaymentSubmit={executePaymentFlow}
                  canProceedStep3={canProceedStep3}
                  totalAmount={totalAmount}
                  processingPayment={processingPayment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

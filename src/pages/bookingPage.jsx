import { useState, useEffect } from "react";
import { useSearchParams, useNavigate ,useLocation} from "react-router-dom";
import { eventDetails } from "../api/eventApi";
import { getDiningById } from "../api/diningApi";
import { movieDetails } from "../api/movieApi";
import { initiateBooking, simulatePayment, confirmBooking } from "../api/bookingApi";
import { ArrowLeft, Ticket, Loader2, Film, Sparkles, Utensils } from "lucide-react";

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

  const passedQuantity=location.state?.quantity || 1;


  //booking loader
  const [processingPayment,setProcessingPayment]=useState(false);
  // ─── Wizard state ──────────────────────────────────
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(passedQuantity);

  // ─── Attendee form state ───────────────────────────
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeePhone, setAttendeePhone] = useState("");

  // ─── Payment form state ────────────────────────────
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ─── Fetch item details ────────────────────────────
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

  // ─── Payment Handler ───────────────────────────────
  const handlePaymentSubmit = async () => {
    setProcessingPayment(true);
    setError(null);
    try {
      const data = await initiateBooking({
        itemType,
        itemId,
        quantity,
        paymentMethod,
        attendeeName,
        attendeeEmail,
      });

      const bookingId = data.booking._id;
      const payment = await simulatePayment({
        bookingId,
        cardNumber,
      });
      if (payment.success) {
        await confirmBooking(bookingId);
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error("Error occurred while processing payment:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  // ─── Derived values ────────────────────────────────
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

  // ─── Helpers ───────────────────────────────────────
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

  // ─── Step navigation ───────────────────────────────
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

  // ─── Step labels ───────────────────────────────────
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

  // ─── Loading / Error states ────────────────────────
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

  if (error || !item) {
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
    <div className="min-h-screen bg-[#EEEEEE] pt-14 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ── Back button ──────────────────────────── */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* ── Step indicator ───────────────────────── */}
        <BookingStepIndicator steps={steps} currentStep={currentStep} />

        {/* ── Main layout: sidebar + form ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── LEFT: Item summary card (sticky) ───── */}
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

          {/* ─── RIGHT: Step form area ──────────────── */}
          <div className="lg:col-span-8">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#9B7EBD]/10 rounded-full blur-2xl pointer-events-none" />

              {/* STEP 1: Select Quantity */}
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

              {/* STEP 2: Attendee Details */}
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
                  canProceedStep2={canProceedStep2}
                  isFree={isFree}
                />
              )}

              {/* STEP 3: Payment */}
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
                  handlePaymentSubmit={handlePaymentSubmit}
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
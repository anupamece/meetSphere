import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDining } from '../api/diningApi';
import { Utensils, MapPin, AlignLeft, DollarSign, Image, ArrowLeft, Loader2 } from 'lucide-react';

const AddDiningPage = () => {
  const navigate = useNavigate();
  const [diningData, setDiningData] = useState({
    name: '',
    location: '',
    description: '',
    price: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate fields
    if (!diningData.name || !diningData.location || !diningData.description || !diningData.price || !imageFile) {
      setError("Please fill out all fields and select a dining image.");
      setLoading(false);
      return;
    }

    try {
      // Build FormData to send multipart/form-data with actual file
      const formData = new FormData();
      formData.append('name', diningData.name);
      formData.append('location', diningData.location);
      formData.append('description', diningData.description);
      formData.append('price', diningData.price);
      formData.append('image', imageFile);

      await createDining(formData);
      setSuccess(true);
      setDiningData({
        name: '',
        location: '',
        description: '',
        price: ''
      });
      setImageFile(null);
      setImagePreview('');
    } catch (err) {
      console.error('Error creating dining:', err);
      setError(err.response?.data?.message || 'Failed to add dining spot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Subtle Top-Right Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#9B7EBD]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Form Header */}
          <div className="text-center mb-8 space-y-2 relative z-10">
            <div className="p-3 bg-[#4A1E6D]/10 rounded-2xl inline-flex text-[#4A1E6D] mb-2">
              <Utensils className="w-6 h-6" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Add Dining Venue</h1>
            <p className="font-premium text-sm text-[#4A1E6D]/70">
              List a new restaurant, café or dining spot on meetSphere.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-premium font-semibold text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-600 text-xs font-premium font-semibold text-center animate-fade-in">
              Dining spot created successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* ─── Section 1: Venue Information ─── */}
            <div className="space-y-5">
              <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                Venue Information
              </h3>

              {/* Dining Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="The Grand Buffet"
                  value={diningData.name}
                  onChange={(e) => setDiningData({ ...diningData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                    font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                    focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the dining experience, special cuisines, vibes..."
                  value={diningData.description}
                  onChange={(e) => setDiningData({ ...diningData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                    font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                    focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 resize-none"
                />
              </div>

              {/* Location & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bandra West, Mumbai"
                    value={diningData.location}
                    onChange={(e) => setDiningData({ ...diningData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                    Average Price per Person (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="1200"
                    value={diningData.price}
                    onChange={(e) => setDiningData({ ...diningData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                      font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                      focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* ─── Section 2: Media ─── */}
            <div className="space-y-5">
              <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                Venue Artwork
              </h3>

              <div className="space-y-2">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                  Venue Image *
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm font-premium text-[#4A1E6D]/70
                    file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border
                    file:border-[#D4BEE4] file:text-xs file:font-semibold file:font-premium
                    file:bg-[#9B7EBD]/10 file:text-[#4A1E6D] file:cursor-pointer
                    hover:file:bg-[#9B7EBD]/20 transition-all"
                />
                {imagePreview && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#D4BEE4]/60 max-w-sm bg-[#EEEEEE]/50">
                    <img
                      src={imagePreview}
                      alt="Venue preview"
                      className="w-full max-h-52 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full gradient-brand text-white font-premium font-semibold py-3.5 px-6
                rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20
                flex items-center justify-center gap-2 cursor-pointer ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Listing...
                </>
              ) : (
                'Add Dining Venue'
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDiningPage;
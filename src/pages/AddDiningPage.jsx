import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDining } from '../api/diningApi';
import { Utensils, ArrowLeft, Loader2 } from 'lucide-react';

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

    if (!diningData.name || !diningData.location || !diningData.description || !diningData.price || !imageFile) {
      setError("Please fill out all fields and select a dining image.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', diningData.name);
      formData.append('location', diningData.location);
      formData.append('description', diningData.description);
      formData.append('price', diningData.price);
      formData.append('image', imageFile);

      await createDining(formData);
      navigate('/dining');
    } catch (err) {
      console.error('Error creating dining:', err);
      setError(err.response?.data?.message || 'Failed to add dining spot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="text-center mb-8 space-y-2">
            <div className="p-3 bg-[#4A1E6D]/10 rounded-2xl inline-flex text-[#4A1E6D] mb-1">
              <Utensils className="w-6 h-6" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Add Dining Venue</h1>
            <p className="font-premium text-sm text-[#4A1E6D]/70">List a new restaurant, café or dining spot on meetSphere.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-premium font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Venue Name *</label>
              <input
                type="text"
                required
                placeholder="The Grand Buffet"
                value={diningData.name}
                onChange={(e) => setDiningData({ ...diningData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Description *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe dining experience..."
                value={diningData.description}
                onChange={(e) => setDiningData({ ...diningData, description: e.target.value })}
                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="Bandra West, Mumbai"
                  value={diningData.location}
                  onChange={(e) => setDiningData({ ...diningData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Average Price per Person (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="1200"
                  value={diningData.price}
                  onChange={(e) => setDiningData({ ...diningData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Venue Image *</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="w-full text-xs font-premium text-[#4A1E6D] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#D4BEE4] file:bg-[#9B7EBD]/15 file:text-[#4A1E6D] hover:file:bg-[#9B7EBD]/25"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Venue preview" className="mt-2 max-h-40 rounded-xl border border-[#D4BEE4]" />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-brand text-white font-premium font-bold py-3.5 px-6 rounded-xl hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Dining Venue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDiningPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../api/eventApi';
import LoadingSpinner from '../LoadingSpinner';
import { Calendar, ArrowLeft, Image, MapPin, Tag, Clock, FileText } from 'lucide-react';

const HostEventForm = () => {
    const categories = [
        'music',
        'nightlife',
        'comedy',
        'sports',
        'conference',
        'food',
        'festival',
        'theater',
        'workshop',
        'fitness',
    ];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'music',
        startDateTime: '',
        endDateTime: '',
        tags: '',                     // comma-separated string → split to array on submit
        venue: {
            name: '',
            address: '',
            city: '',
        },
    });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [coverImage, setCoverImage] = useState(null); 
    const [images, setImages] = useState([]);

    const [coverPreview, setCoverPreview] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCoverImage = (e) => {
        const file = e.target.files[0];
        setCoverImage(file || null);
        if (file) {
            setCoverPreview(URL.createObjectURL(file));
        } else {
            setCoverPreview(null);
        }
    };

    const handleVenueChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            venue: {
                ...prev.venue,
                [e.target.name]: e.target.value
            }
        }));
    };

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setImagePreviews(files.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const eventData = new FormData();

            eventData.append('title', formData.title);
            eventData.append('description', formData.description);
            eventData.append('category', formData.category);
            eventData.append('startDateTime', formData.startDateTime);
            eventData.append('endDateTime', formData.endDateTime);
            eventData.append('ticketPrice', formData.ticketPrice);
            eventData.append('totalTickets', formData.totalTickets);
           
            eventData.append('venueName', formData.venue.name);
            eventData.append('venueAddress', formData.venue.address);
            eventData.append('venueCity', formData.venue.city);

            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
            eventData.append('tags', JSON.stringify(tagsArray));

            if (coverImage) {
                eventData.append('coverImage', coverImage);
            }
            if (images.length > 0) {
                images.forEach((file) => {
                    eventData.append('images', file);
                });
            }
            const data = await createEvent(eventData);
            console.log('Event created successfully:', data);
            navigate('/explore'); // Redirect to the live events list after successful creation
        } catch (err) {
            const message =
                err.response?.data?.message ||
                'Failed to create event. Please try again.';
            setError(message);
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

                {loading && <LoadingSpinner fullPage={true} message="Publishing your event..." />}
                
                {/* Form Card Container */}
                <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden">
                    
                    {/* Subtle Top-Right Ambient Glow */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[#9B7EBD]/10 rounded-full blur-2xl pointer-events-none"></div>

                    {/* Form Header */}
                    <div className="text-center mb-8 space-y-2 relative z-10">
                        <div className="p-3 bg-[#4A1E6D]/10 rounded-2xl inline-flex text-[#4A1E6D] mb-2">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Host a New Event</h1>
                        <p className="font-premium text-sm text-[#4A1E6D]/70">
                            Fill in the details below to create your general event listing on meetSphere.
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-premium font-semibold text-center animate-fade-in">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                        {/* ─── Section 1: Basic Details ─── */}
                        <div className="space-y-5">
                            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                                Event Details
                            </h3>

                            {/* Title */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                    Event Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="E-sports Championship 2026"
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
                                    name="description"
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your event, what attendees can expect..."
                                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                        font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                        focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 resize-none"
                                />
                            </div>

                            {/* Category Select & Tags */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                            font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                            focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 cursor-pointer"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="gaming, tournament, esports"
                                        className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                            font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                            focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ─── Section 2: Date & Time ─── */}
                        <div className="space-y-5">
                            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                                Schedule
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                        Start Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="startDateTime"
                                        required
                                        value={formData.startDateTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                            font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                            focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                        End Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="endDateTime"
                                        required
                                        value={formData.endDateTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                            font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                            focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ─── Section 3: Venue ─── */}
                        <div className="space-y-5">
                            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                                Venue Location
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                        Venue Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.venue.name}
                                        onChange={handleVenueChange}
                                        placeholder="Convention Center Hall B"
                                        className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                            font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                            focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.venue.address}
                                        onChange={handleVenueChange}
                                        placeholder="123 Main Street"
                                        className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                            font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                            focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.venue.city}
                                        onChange={handleVenueChange}
                                        placeholder="Mumbai"
                                        className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl
                                            font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30
                                            focus:border-[#9B7EBD] focus:bg-white transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ─── Section 4: Media Uploads ─── */}
                        <div className="space-y-5">
                            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-[#9B7EBD] border-b border-[#D4BEE4]/40 pb-2">
                                Media & Gallery
                            </h3>

                            {/* Cover Image */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                    Cover Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverImage}
                                    className="block w-full text-sm font-premium text-[#4A1E6D]/70
                                        file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border
                                        file:border-[#D4BEE4] file:text-xs file:font-semibold file:font-premium
                                        file:bg-[#9B7EBD]/10 file:text-[#4A1E6D] file:cursor-pointer
                                        hover:file:bg-[#9B7EBD]/20 transition-all"
                                />
                                {coverPreview && (
                                    <img
                                        src={coverPreview}
                                        alt="Cover preview"
                                        className="mt-2 w-full max-h-48 object-cover rounded-xl border border-[#D4BEE4]/60"
                                    />
                                )}
                            </div>

                            {/* Additional Images */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                                    Additional Event Images
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImages}
                                    className="block w-full text-sm font-premium text-[#4A1E6D]/70
                                        file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border
                                        file:border-[#D4BEE4] file:text-xs file:font-semibold file:font-premium
                                        file:bg-[#9B7EBD]/10 file:text-[#4A1E6D] file:cursor-pointer
                                        hover:file:bg-[#9B7EBD]/20 transition-all"
                                />
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {imagePreviews.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt={`Preview ${i}`}
                                                className="w-full h-24 object-cover rounded-lg border border-[#D4BEE4]/60"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>




                        {/* Ticket Price & Total Tickets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                              Ticket Price *
                            </label>
                            <input
                              type="number"
                              placeholder="Enter ticket price"
                              value={formData.ticketPrice}
                              onChange={(e) => setFormData({ ...formData, ticketPrice: parseFloat(e.target.value) || 0 })}
                              className="block w-full text-sm font-premium text-[#4A1E6D]/70 border border-[#D4BEE4] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                            />
                          </div>
                          <div className="flex-col">
                            <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                              Total Tickets *
                            </label>
                            <input
                              type="number"
                              placeholder="Enter total number of tickets"
                              value={formData.totalTickets}
                              onChange={(e) => setFormData({ ...formData, totalTickets: parseInt(e.target.value) || 0 })}
                              className="block w-full text-sm font-premium text-[#4A1E6D]/70 border border-[#D4BEE4] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                            />
                          </div>
                        </div>
            

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full gradient-brand text-white font-premium font-semibold py-3.5 px-6
                                rounded-xl hover:opacity-95 transition-premium shadow-md shadow-[#9B7EBD]/20
                                cursor-pointer ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating Event...' : 'Publish Event'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default HostEventForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/eventApi';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import { Calendar, ArrowLeft, Image, MapPin, Tag, Clock, FileText } from 'lucide-react';

const AddEventPage = () => {
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
        tags: '',
        venue: {
            name: '',
            address: '',
            city: '',
        },
        ticketPrice: 0,
        totalTickets: 100,
    });

    const [coverImageFile, setCoverImageFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [coverPreview, setCoverPreview] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('venue.')) {
            const venueField = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                venue: {
                    ...prev.venue,
                    [venueField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImageFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('startDateTime', formData.startDateTime);
            data.append('endDateTime', formData.endDateTime);
            data.append('ticketPrice', formData.ticketPrice);
            data.append('totalTickets', formData.totalTickets);

            if (formData.tags) {
                const tagsArray = formData.tags
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean);
                tagsArray.forEach((tag) => data.append('tags[]', tag));
            }

            data.append('venue[name]', formData.venue.name);
            data.append('venue[address]', formData.venue.address);
            data.append('venue[city]', formData.venue.city);

            if (coverImageFile) {
                data.append('coverImage', coverImageFile);
            }

            for (let i = 0; i < imageFiles.length; i++) {
                data.append('images', imageFiles[i]);
            }

            await createEvent(data);
            navigate('/explore');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#EEEEEE] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 font-premium text-xs font-bold uppercase tracking-wider text-[#4A1E6D] hover:text-[#9B7EBD] bg-white/80 border border-[#D4BEE4]/60 px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#D4BEE4]/60 p-8 sm:p-10 shadow-sm relative overflow-hidden">
                    <div className="text-center mb-8 space-y-2">
                        <div className="p-3 bg-[#4A1E6D]/10 rounded-2xl inline-flex text-[#4A1E6D] mb-1">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Host a New Event</h1>
                        <p className="font-premium text-sm text-[#4A1E6D]/70">Publish your event to meetSphere attendees.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-premium font-semibold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Event Title *</label>
                            <input
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Summer Music Festival"
                                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 capitalize"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Description *</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe event schedule, highlights..."
                                className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Start Date & Time *</label>
                                <input
                                    name="startDateTime"
                                    type="datetime-local"
                                    required
                                    value={formData.startDateTime}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">End Date & Time</label>
                                <input
                                    name="endDateTime"
                                    type="datetime-local"
                                    value={formData.endDateTime}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Venue Name *</label>
                                <input
                                    name="venue.name"
                                    type="text"
                                    required
                                    value={formData.venue.name}
                                    onChange={handleChange}
                                    placeholder="Grand Stadium"
                                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">City *</label>
                                <input
                                    name="venue.city"
                                    type="text"
                                    required
                                    value={formData.venue.city}
                                    onChange={handleChange}
                                    placeholder="Mumbai"
                                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Ticket Price (₹) *</label>
                                <input
                                    name="ticketPrice"
                                    type="number"
                                    min="0"
                                    required
                                    value={formData.ticketPrice}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Total Available Tickets *</label>
                                <input
                                    name="totalTickets"
                                    type="number"
                                    min="1"
                                    required
                                    value={formData.totalTickets}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#EEEEEE]/50 border border-[#D4BEE4]/60 rounded-xl font-premium text-sm text-[#4A1E6D] focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]/30"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">Cover Image *</label>
                            <input
                                type="file"
                                accept="image/*"
                                required
                                onChange={handleCoverImageChange}
                                className="w-full text-xs font-premium text-[#4A1E6D] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#D4BEE4] file:bg-[#9B7EBD]/15 file:text-[#4A1E6D] hover:file:bg-[#9B7EBD]/25"
                            />
                            {coverPreview && (
                                <img src={coverPreview} alt="Cover preview" className="mt-2 max-h-40 rounded-xl border border-[#D4BEE4]" />
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-brand text-white font-premium font-bold py-3.5 px-6 rounded-xl hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? <LoadingSpinner message="" /> : 'Publish Event'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEventPage;

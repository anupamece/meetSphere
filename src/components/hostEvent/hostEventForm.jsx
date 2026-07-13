import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { createEvent } from '../../api/eventApi';
import LoadingSpinner from '../LoadingSpinner';

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
    const navigate=useNavigate();

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const [coverImage, setCoverImage] = useState(null); 
    const [images, setImages] = useState([]);

    const [coverPreview, setCoverPreview] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const handleCoverImage=(e)=>{
        const file=e.target.files[0];

        setCoverImage(file || null);
        if(file){
            setCoverPreview(URL.createObjectURL(file));
        } else {
            setCoverPreview(null);
        }
    }

    const handleVenueChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            venue:{
                ...prev.venue,
                [e.target.name]:e.target.value
            }
        }))
    }

    const handleImages=(e)=>{
        const files=Array.from(e.target.files);
        setImages(files);
        setImagePreviews(files.map(file=>URL.createObjectURL(file)));
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log('Submitting form data:', formData);
        try{
            const eventData=new FormData();

            eventData.append('title',formData.title);
            eventData.append('description',formData.description);
            eventData.append('category',formData.category);
            eventData.append('startDateTime',formData.startDateTime);
            eventData.append('endDateTime',formData.endDateTime);
           
            eventData.append('venueName',formData.venue.name);
            eventData.append('venueAddress',formData.venue.address);
            eventData.append('venueCity',formData.venue.city);


            const tagsArray=formData.tags.split(',').map(tag=>tag.trim()).filter(Boolean);
            eventData.append('tags',JSON.stringify(tagsArray));

            if(coverImage){
                eventData.append('coverImage',coverImage);
            }
            if(images.length >0){
                images.forEach((file)=>{
                    eventData.append('images',file);
                });
            }
            const data= await createEvent(eventData);
            console.log('Event created successfully:', data);
            navigate('/explore'); // Redirect to the live events list after successful creation
        }
        catch(err){
            const message =
                err.response?.data?.message ||
                'Failed to create event. Please try again.';
            setError(message);
        }
        
        finally{
            setLoading(false);
        }
    }


    return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {loading && <LoadingSpinner fullPage={true} message="Publishing your event..." />}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-brand-muted/6060 p-8 sm:p-10 shadow-sm">

        {/* Form Header */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="font-display text-3xl font-bold text-[#4A1E6D]">Host a New Event</h1>
          <p className="font-premium text-sm text-[#4A1E6D]/70">
            Fill in the details below to create your event listing.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-xl
            text-rose-600 text-xs font-premium font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ─── Section 1: Basic Details ─── */}
          <div className="space-y-5">
            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-primary border-b border-brand-muted/40 pb-2">
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
                className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-muted/60 rounded-xl
                  font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/30
                  focus:border-primary focus:bg-white transition-all duration-200"
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
                className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-muted/60 rounded-xl
                  font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/30
                  focus:border-primary focus:bg-white transition-all duration-200 resize-none"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-muted/60 rounded-xl
                  font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/30
                  focus:border-primary focus:bg-white transition-all duration-200 cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
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
                className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-muted/60 rounded-xl
                  font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/30
                  focus:border-primary focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* ─── Section 2: Date & Time ─── */}
          <div className="space-y-5">
            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-primary border-b border-brand-muted/40 pb-2">
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
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-muted/60 rounded-xl
                    font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/30
                    focus:border-primary focus:bg-white transition-all duration-200"
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
                  className="w-full px-4 py-3 bg-brand-bg/50 border border-brand-muted/60 rounded-xl
                    font-premium text-sm focus:outline-none focus:ring-2 focus:ring-primary/30
                    focus:border-primary focus:bg-white transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* ─── Section 3: Venue ─── */}
          <div className="space-y-5">
            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-primary border-b border-brand-muted/40 pb-2">
              Venue
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="...">Venue Name</label>
                <input type="text" name="name" value={formData.venue.name}
                  onChange={handleVenueChange} placeholder="Convention Center Hall B" className="..." />
              </div>
              <div className="space-y-1.5">
                <label className="...">Address</label>
                <input type="text" name="address" value={formData.venue.address}
                  onChange={handleVenueChange} placeholder="123 Main Street" className="..." />
              </div>
              <div className="space-y-1.5">
                <label className="...">City</label>
                <input type="text" name="city" value={formData.venue.city}
                  onChange={handleVenueChange} placeholder="Mumbai" className="..." />
              </div>
            </div>
          </div>

          {/* ─── Section 4: Images ─── */}
          <div className="space-y-5">
            <h3 className="font-premium font-bold text-sm uppercase tracking-wider text-primary border-b border-brand-muted/40 pb-2">
              Media
            </h3>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                Cover Image
              </label>
              <input type="file" accept="image/*" onChange={handleCoverImage}
                className="block w-full text-sm font-premium text-[#4A1E6D]/70
                  file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border
                  file:border-brand-muted file:text-sm file:font-semibold file:font-premium
                  file:bg-brand-muted/30 file:text-[#4A1E6D] file:cursor-pointer
                  hover:file:bg-brand-muted/50 transition-all"
              />
              {/* Live Preview */}
              {coverPreview && (
                <img src={coverPreview} alt="Cover preview"
                  className="mt-2 w-full max-h-48 object-cover rounded-xl border border-brand-muted/60" />
              )}
            </div>

            {/* Additional Images */}
            <div className="space-y-2">
              <label className="block text-xs font-bold font-premium text-[#4A1E6D]/60 uppercase tracking-wider">
                Additional Images
              </label>
              <input type="file" accept="image/*" multiple onChange={handleImages} className="..." />
              {/* Previews Grid */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {imagePreviews.map((src, i) => (
                    <img key={i} src={src} alt={`Preview ${i}`}
                      className="w-full h-24 object-cover rounded-lg border border-brand-muted/60" />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── Submit Button ─── */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full gradient-brand text-white font-premium font-semibold py-3.5 px-6
              rounded-xl hover:opacity-95 transition-premium shadow-md shadow-primary/20
              cursor-pointer ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Event...' : 'Publish Event'}
          </button>

        </form>
      </div>
    </div>
  );
};
export default HostEventForm;

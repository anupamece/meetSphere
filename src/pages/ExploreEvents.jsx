import React, { useEffect, useMemo, useState } from 'react';
import { getEvents } from '../api/eventApi';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ExploreEvents = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
    let isActive = true;
    
		const loadEvents = async () => {
      try {
        setLoading(true);
				setError('');
				const data = await getEvents();
				if (!isActive) {
          return;
				}
				setEvents(Array.isArray(data.events) ? data.events : []);
			} catch (err) {
        if (!isActive) {
          return;
				}
				setError(err.response?.data?.message || 'Failed to load events.');
			} finally {
        if (isActive) {
          setLoading(false);
				}
			}
		};
    
		loadEvents();
    
		return () => {
      isActive = false;
		};
	}, []);

	const sortedEvents = useMemo(
		() => [...events].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)),
		[events],
	);

	return (
		<main className="relative overflow-hidden bg-brand-bg">
			<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(155,126,189,0.22),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(74,30,109,0.12),_transparent_28%)]" />

			<section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
				<div className="max-w-3xl">
					<p className="font-premium text-xs font-bold uppercase tracking-[0.35em] text-primary">
						Live Events
					</p>
					<h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
						Explore events from the database.
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-6 text-brand-dark/70 sm:text-base">
						This page pulls the stored event records directly from your backend and renders the
						current listings, including title, venue, timing, and status.
					</p>
				</div>

				<div className="mt-10">
					{loading && (
						<div className="flex justify-center py-16">
							<LoadingSpinner message="Loading events from the database..." />
						</div>
					)}

					{!loading && error && (
						<div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm font-semibold text-rose-600 shadow-sm">
							{error}
						</div>
					)}

					{!loading && !error && sortedEvents.length === 0 && (
						<div className="rounded-3xl border border-dashed border-brand-muted/80 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm">
							<p className="font-display text-2xl font-semibold text-brand-dark">
								No events yet.
							</p>
							<p className="mt-2 text-sm text-brand-dark/65">
								Create an event from the host form and it will appear here.
							</p>
						</div>
					)}

					{!loading && !error && sortedEvents.length > 0 && (
						<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{sortedEvents.map((event) => (
								<EventCard key={event._id} event={event} />
							))}
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default ExploreEvents;

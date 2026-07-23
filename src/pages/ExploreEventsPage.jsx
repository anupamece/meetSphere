import React, { useEffect, useMemo, useState } from 'react';
import { getEvents, isfav } from '../api/eventApi';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ExploreEventsPage = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [favoriteEvents, setFavoriteEvents] = useState({});

	useEffect(() => {
		let isActive = true;

		const loadEvents = async () => {
			try {
				setLoading(true);
				setError('');
				const data = await getEvents();
				if (!isActive) return;
				setEvents(Array.isArray(data.events) ? data.events : []);
			} catch (err) {
				if (!isActive) return;
				setError(err.response?.data?.message || 'Failed to load events.');
			} finally {
				if (isActive) setLoading(false);
			}
		};

		loadEvents();

		return () => {
			isActive = false;
		};
	}, []);

	const toggleFavorite = async (eventId) => {
		try {
			const response = await isfav(eventId);
			setFavoriteEvents((currentFavorites) => ({
				...currentFavorites,
				[eventId]: response.isfavorite,
			}));
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to update favorite.');
		}
	};

	const sortedEvents = useMemo(
		() => [...events].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)),
		[events],
	);

	return (
		<main className="relative overflow-hidden bg-[#EEEEEE] min-h-screen">
			<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(155,126,189,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(74,30,109,0.12),transparent_28%)]" />

			<section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
				<div className="max-w-3xl">
					<p className="font-premium text-xs font-bold uppercase tracking-[0.35em] text-[#9B7EBD]">
						Live Events
					</p>
					<h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#4A1E6D] sm:text-5xl">
						Explore Events
					</h1>
					<p className="mt-4 max-w-2xl font-premium text-sm leading-6 text-[#4A1E6D]/70 sm:text-base">
						Discover concerts, workshops, sports matches, and community meetups happening near you.
					</p>
				</div>

				<div className="mt-10">
					{loading && (
						<div className="flex justify-center py-16">
							<LoadingSpinner message="Loading events..." />
						</div>
					)}

					{!loading && error && (
						<div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm font-semibold text-rose-600 shadow-sm">
							{error}
						</div>
					)}

					{!loading && !error && sortedEvents.length === 0 && (
						<div className="rounded-3xl border border-dashed border-[#D4BEE4]/80 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm">
							<p className="font-display text-2xl font-semibold text-[#4A1E6D]">
								No events found.
							</p>
							<p className="mt-2 font-premium text-sm text-[#4A1E6D]/65">
								Create an event from the host portal to get started.
							</p>
						</div>
					)}

					{!loading && !error && sortedEvents.length > 0 && (
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{sortedEvents.map((event) => (
								<EventCard
									key={event._id}
									event={event}
									isFavorite={Boolean(favoriteEvents[event._id])}
									onToggleFavorite={toggleFavorite}
								/>
							))}
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default ExploreEventsPage;

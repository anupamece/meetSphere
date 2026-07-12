import React, { useEffect, useMemo, useState } from 'react';
import { getEvents } from '../api/eventApi';

const ExploreEvents = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);
  
  
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
  
  const isfav = (isFavorite) => {
    setFavorite(!isFavorite);
    data.events.isfavorite = isFavorite;
  }
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
						<div className="rounded-3xl border border-brand-muted/60 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm">
							<p className="font-premium text-sm font-semibold text-brand-dark/70">
								Loading events from the database...
							</p>
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
							{sortedEvents.map((event) => {
								const startLabel = event.startDateTime
									? new Date(event.startDateTime).toLocaleString(undefined, {
											dateStyle: 'medium',
											timeStyle: 'short',
										})
									: 'TBD';
								const venueLabel = [event?.venue?.name, event?.venue?.city].filter(Boolean).join(' • ');
								const tags = Array.isArray(event.tags) ? event.tags : [];

								return (
									<article
										key={event._id}
										className="group overflow-hidden rounded-3xl border border-brand-muted/60 bg-white/80 shadow-[0_18px_45px_-30px_rgba(74,30,109,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-35px_rgba(74,30,109,0.55)]"
									>
										<div className="relative h-56 overflow-hidden bg-gradient-to-br from-secondary via-primary to-brand-muted">
											{event.coverImage ? (
												<img
													src={event.coverImage}
													alt={event.title}
													className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
												/>
											) : (
												<div className="flex h-full w-full items-end p-6 text-white">
													<div>
														<p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
															{event.category || 'event'}
														</p>
														<h2 className="mt-2 font-display text-3xl font-semibold leading-tight">
															{event.title}
														</h2>
													</div>
												</div>
											)}

											<span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark shadow-sm">
												{event.status || 'draft'}
											</span>
										</div>

										<div className="space-y-4 p-6">
											<div>
												<p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
													{event.category || 'Event'}
												</p>
												<h2 className="mt-2 font-display text-2xl font-semibold text-brand-dark">
													{event.title}
												</h2>
											</div>

											<p className="line-clamp-3 text-sm leading-6 text-brand-dark/70">
												{event.description}
											</p>

											<div className="space-y-2 text-sm text-brand-dark/75">
												<p>
													<span className="font-semibold text-brand-dark">When:</span> {startLabel}
												</p>
												<p>
													<span className="font-semibold text-brand-dark">Where:</span>{' '}
													{venueLabel || 'Venue not set'}
												</p>
												<p>
													<span className="font-semibold text-brand-dark">Attendees:</span>{' '}
													{typeof event.attendeeCount === 'number' ? event.attendeeCount : 0}
												</p>
											</div>
                      <div>
                        <button onClick={() => isfav(favorite)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-primary/90">
                          {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                      </div>

											{tags.length > 0 && (
												<div className="flex flex-wrap gap-2 pt-1">
													{tags.map((tag) => (
														<span
															key={tag}
															className="rounded-full bg-brand-bg px-3 py-1 text-xs font-semibold text-brand-dark"
														>
															#{tag}
														</span>
													))}
												</div>
											)}
										</div>
									</article>
								);
							})}
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default ExploreEvents;

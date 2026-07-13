import React, { useEffect, useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { favEvents } from '../api/favApi';

const Favourites = () => {
	const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadFavoriteEvents = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await favEvents();
        if (!isActive) {
          return;
        }
				setFavorites(Array.isArray(data.fav) ? data.fav : []);
			} catch (err) {
        if (!isActive) {
          return;
        }
				setError(err.response?.data?.message || 'Failed to load favorite events.');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
		};

		loadFavoriteEvents();

		return () => {
			isActive = false;
		};
	}, []);

	const favoriteEvents = useMemo(
		() => favorites
			.map((item) => item.event)
			.filter(Boolean)
			.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)),
		[favorites],
	);

  return (
		<main className="relative overflow-hidden bg-brand-bg">
			<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(155,126,189,0.22),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(74,30,109,0.12),_transparent_28%)]" />

			<section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
				<div className="max-w-3xl">
					<p className="font-premium text-xs font-bold uppercase tracking-[0.35em] text-primary">
						Favorite Events
					</p>
					<h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
						Your saved events.
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-6 text-brand-dark/70 sm:text-base">
						This page shows only the events you marked as favorite from your current account.
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

					{!loading && !error && favoriteEvents.length === 0 && (
						<div className="rounded-3xl border border-dashed border-brand-muted/80 bg-white/70 p-10 text-center shadow-sm backdrop-blur-sm">
							<p className="font-display text-2xl font-semibold text-brand-dark">
								No favorite events yet.
							</p>
							<p className="mt-2 text-sm text-brand-dark/65">
								Tap the heart on an event to save it here.
							</p>
						</div>
					)}

					{!loading && !error && favoriteEvents.length > 0 && (
						<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{favoriteEvents.map((event) => {
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
											<span className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
												<Heart className="mr-1 inline h-3.5 w-3.5 fill-current align-[-2px]" />
												Favorite
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
											<div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
												<Heart className="h-3.5 w-3.5 fill-current" />
												Saved to favorites
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
}
export default Favourites;
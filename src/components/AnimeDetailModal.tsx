import { useState, useEffect } from 'react'
import { useGetAnimeFull } from '../hooks/getAnime'
import type { JikanAnimeFull } from '../types/jikan'
import { useFavorite } from '../store/appStore'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { Link } from '@tanstack/react-router'


const EXIT_DURATION_MS = 220

function getCoverUrl(anime: JikanAnimeFull): string | null {
    const img = anime.images
    return (
        img?.webp?.large_image_url ??
        img?.jpg?.large_image_url ??
        img?.webp?.image_url ??
        img?.jpg?.image_url ??
        null
    )
}

interface AnimeDetailModalProps {
    animeId: number
    onClose: () => void
}

export default function AnimeDetailModal({ animeId, onClose }: AnimeDetailModalProps) {
    const { anime, loading, error } = useGetAnimeFull(animeId)
    const [isExiting, setIsExiting] = useState(false)
    const { favorites, setFavorites } = useFavorite()
    const isFavorite = favorites.includes(animeId)

    const handleClose = () => {
        if (isExiting) return
        setIsExiting(true)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleClose])


    useEffect(() => {
        if (!isExiting) return
        const t = setTimeout(onClose, EXIT_DURATION_MS)
        return () => clearTimeout(t)
    }, [isExiting, onClose])

    const backdropClass = isExiting ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
    const contentClass = isExiting ? 'modal-content-exit' : 'modal-content-enter'

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-page/85 p-4 ${backdropClass}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className={`relative flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl ${contentClass}`}
                onClick={e => e.stopPropagation()}
            >
                {loading && (
                    <div className="flex min-h-[320px] items-center justify-center text-text-muted">
                        <span className="text-lg">Carregando...</span>
                    </div>
                )}

                {error && (
                    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8 text-error">
                        <p>Erro ao carregar o anime.</p>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-xl bg-accent px-4 py-2 text-white transition hover:bg-accent-hover"
                        >
                            Fechar
                        </button>
                    </div>
                )}

                {!loading && !error && anime && (
                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                        {/* Capa do anime (imagem pura) */}
                        <header className="relative aspect-2/1 min-h-[200px] shrink-0 overflow-hidden bg-surface-elevated">
                            {getCoverUrl(anime) && (
                                <img
                                    src={getCoverUrl(anime)!}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            )}
                            <div
                                className="absolute bottom-0 left-0 right-0 flex h-32 min-h-28 flex-col justify-center bg-linear-to-t from-surface to-transparent px-5 py-4"
                                aria-hidden
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0 flex-1">
                                        <h1
                                            id="modal-title"
                                            className="text-2xl font-bold leading-tight text-text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-3xl"
                                        >
                                            {anime.title}
                                        </h1>
                                        {(anime.title_english || anime.title_japanese) && (
                                            <p className="mt-1 text-sm text-text-secondary drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                                                {[anime.title_english, anime.title_japanese]
                                                    .filter(Boolean)
                                                    .join(' · ')}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => isFavorite ? setFavorites(prev => prev.filter(id => id !== anime.mal_id)) : setFavorites(prev => [...prev, anime.mal_id])}
                                        className={`shrink-0 rounded-full p-2.5 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 ${isFavorite
                                            ? 'bg-error text-white ring-2 ring-error/80 hover:opacity-90'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                            }`}
                                        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                                    >
                                        {isFavorite ? (
                                            <HeartSolid className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                                        ) : (
                                            <HeartOutline className="h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={2} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="absolute right-3 top-3 rounded-full bg-page/70 p-2 text-text-primary backdrop-blur-sm hover:bg-page/90"
                                aria-label="Fechar"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </header>

                        {/* Conteúdo rolável: flex-1 + min-h-0 para o scroll aparecer */}
                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 pb-8">
                            {/* Score + meta em linha */}
                            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
                                {anime.score != null && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-badge-soft px-3 py-1 text-badge">
                                        ⭐ {anime.score.toFixed(1)}
                                        {anime.scored_by != null && (
                                            <span className="text-badge/80">({anime.scored_by.toLocaleString()})</span>
                                        )}
                                    </span>
                                )}
                                {anime.type && (
                                    <span className="rounded-full bg-surface-elevated px-3 py-1 text-text-secondary">{anime.type}</span>
                                )}
                                {anime.episodes != null && (
                                    <span className="text-text-muted">{anime.episodes} eps</span>
                                )}
                                {anime.status && (
                                    <span className="text-accent">{anime.status}</span>
                                )}
                                {anime.year != null && (
                                    <span className="text-text-muted">{anime.season ? `${anime.season} ${anime.year}` : anime.year}</span>
                                )}
                                {anime.duration && (
                                    <span className="text-text-muted">{anime.duration}</span>
                                )}
                            </div>

                            {anime.synopsis && (
                                <section className="mb-5">
                                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Sinopse</h2>
                                    <p className="leading-relaxed text-text-secondary">{anime.synopsis}</p>
                                </section>
                            )}

                            {anime.genres && anime.genres.length > 0 && (
                                <section className="mb-5">
                                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Gêneros</h2>
                                    <ul className="flex flex-wrap gap-2">
                                        {anime.genres.map(g => (
                                            <li
                                                key={g.mal_id}
                                                className="rounded-full bg-zinc-700/80 px-3 py-1 text-sm text-zinc-200"
                                            >
                                                {g.name}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {anime.studios && anime.studios.length > 0 && (
                                <section className="mb-5">
                                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Estúdios</h2>
                                    <p className="text-text-secondary">{anime.studios.map(s => s.name).join(', ')}</p>
                                </section>
                            )}

                            <section className="flex flex-wrap gap-3">
                                <Link
                                    to="/anime/$id"
                                    params={{ id: anime.mal_id.toString() }}
                                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
                                >
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                    Ver página completa
                                </Link>
                                {anime.trailer?.embed_url && (
                                    <a
                                        href={anime.trailer.embed_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-error px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                                    >
                                        Assistir trailer
                                    </a>
                                )}
                                {anime.url && (
                                    <a
                                        href={anime.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-4 py-2 text-sm text-text-secondary transition hover:border-accent hover:text-accent"
                                    >
                                        Ver no MyAnimeList
                                    </a>
                                )}
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

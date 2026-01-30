import { useState, useEffect } from 'react'
import { useGetAnimeFull } from '../hooks/getAnime'
import type { JikanAnimeFull } from '../types/jikan'

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

    const handleClose = () => {
        if (isExiting) return
        setIsExiting(true)
    }

    useEffect(() => {
        if (!isExiting) return
        const t = setTimeout(onClose, EXIT_DURATION_MS)
        return () => clearTimeout(t)
    }, [isExiting, onClose])

    const backdropClass = isExiting ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
    const contentClass = isExiting ? 'modal-content-exit' : 'modal-content-enter'

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${backdropClass}`}
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className={`relative flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl ${contentClass}`}
                onClick={e => e.stopPropagation()}
            >
                {loading && (
                    <div className="flex min-h-[320px] items-center justify-center text-zinc-400">
                        <span className="text-lg">Carregando...</span>
                    </div>
                )}

                {error && (
                    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8 text-red-400">
                        <p>Erro ao carregar o anime.</p>
                        <button
                            onClick={handleClose}
                            className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                        >
                            Fechar
                        </button>
                    </div>
                )}

                {!loading && !error && anime && (
                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                        {/* Capa do anime (imagem pura) */}
                        <header className="relative aspect-2/1 min-h-[200px] shrink-0 overflow-hidden bg-zinc-800">
                            {getCoverUrl(anime) && (
                                <img
                                    src={getCoverUrl(anime)!}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            )}
                            <div
                                className="absolute bottom-0 left-0 right-0 flex h-32 min-h-28 flex-col justify-center bg-linear-to-t from-zinc-900 to-transparent px-5 py-4"
                                aria-hidden
                            >
                                <h1
                                    id="modal-title"
                                    className="text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-3xl"
                                >
                                    {anime.title}
                                </h1>
                                {(anime.title_english || anime.title_japanese) && (
                                    <p className="mt-1 text-sm text-zinc-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                                        {[anime.title_english, anime.title_japanese]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white/90 backdrop-blur-sm hover:bg-black/70 hover:text-white"
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
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-amber-200">
                                        ⭐ {anime.score.toFixed(1)}
                                        {anime.scored_by != null && (
                                            <span className="text-amber-200/70">({anime.scored_by.toLocaleString()})</span>
                                        )}
                                    </span>
                                )}
                                {anime.type && (
                                    <span className="rounded-full bg-zinc-700/80 px-3 py-1 text-zinc-200">{anime.type}</span>
                                )}
                                {anime.episodes != null && (
                                    <span className="text-zinc-400">{anime.episodes} eps</span>
                                )}
                                {anime.status && (
                                    <span className="text-emerald-400">{anime.status}</span>
                                )}
                                {anime.year != null && (
                                    <span className="text-zinc-400">{anime.season ? `${anime.season} ${anime.year}` : anime.year}</span>
                                )}
                                {anime.duration && (
                                    <span className="text-zinc-400">{anime.duration}</span>
                                )}
                            </div>

                            {anime.synopsis && (
                                <section className="mb-5">
                                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Sinopse</h2>
                                    <p className="leading-relaxed text-zinc-300">{anime.synopsis}</p>
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
                                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Estúdios</h2>
                                    <p className="text-zinc-300">{anime.studios.map(s => s.name).join(', ')}</p>
                                </section>
                            )}

                            {(anime.trailer?.embed_url || anime.url) && (
                                <section className="flex flex-wrap gap-3">
                                    {anime.trailer?.embed_url && (
                                        <a
                                            href={anime.trailer.embed_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg bg-red-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                                        >
                                            Assistir trailer
                                        </a>
                                    )}
                                    {anime.url && (
                                        <a
                                            href={anime.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg bg-zinc-600 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-500"
                                        >
                                            Ver no MyAnimeList
                                        </a>
                                    )}
                                </section>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

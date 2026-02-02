import type { AnimeCardModel } from '../types/anime'
import { TiltCard } from './TiltCard'
import { useFavorite } from '../context/FavoriteContext'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'

interface AnimeCardProps {
    anime: AnimeCardModel
    onClick: (id: number) => void
}

export default function AnimeCard({ anime, onClick }: AnimeCardProps) {
    const { title, imageUrl, score, year, season, status, genres, synopsis, id } =
        anime
    const { favorites } = useFavorite()
    const isFavorite = favorites.includes(id)

    return (
        <TiltCard className="w-full h-full cursor-pointer" onClick={() => onClick(id)}>
            <article className="relative bg-zinc-900/80 border border-white/5 hover:border-emerald-400/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_18px_45px_rgba(0,0,0,0.75)] transition-shadow">
                <button
                    type="button"
                    className="absolute z-9 top-2 left-2 rounded-full bg-zinc-900/90 border border-amber-400/70 px-2 py-0.5 text-[11px] font-semibold text-amber-200 shadow-md"
                    aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                    {isFavorite ? <HeartSolid className="h-4 w-4 text-amber-200" /> : <HeartOutline className="h-4 w-4 text-amber-200" strokeWidth={2} />}
                </button>
                <div className="relative aspect-3/4 w-full bg-zinc-800 overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="absolute inset-0 size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                    {typeof score === 'number' && (
                        <div className="absolute top-2 right-2 rounded-full bg-zinc-900/90 border border-amber-400/70 px-2 py-0.5 text-[11px] font-semibold text-amber-200 shadow-md">
                            ⭐ {score.toFixed(1)}
                        </div>
                    )}
                </div>
                <div className="p-3 flex flex-col gap-1.5">
                    <h3 className="text-zinc-50 text-sm font-semibold leading-snug line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-zinc-300 text-xs mt-0.5">
                        {year ? `${year}` : 'Ano desconhecido'}
                        {season ? ` • ${season}` : ''}
                    </p>
                    {status ? (
                        <p className="text-emerald-300 text-[11px] mt-0.5">
                            {status}
                        </p>
                    ) : null}
                    {synopsis ? (
                        <p className="text-zinc-400 text-[11px] leading-snug mt-1 line-clamp-3">
                            {synopsis}
                        </p>
                    ) : null}
                    {genres.length ? (
                        <ul className="flex flex-wrap gap-1 mt-2">
                            {genres.slice(0, 3).map(g => (
                                <li
                                    key={g}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900/80 text-zinc-200 border border-white/10"
                                >
                                    {g}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </article>
        </TiltCard>
    )
}

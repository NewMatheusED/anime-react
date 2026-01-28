import type { AnimeCardModel } from '../types/anime'
import { TiltCard } from './TiltCard'

interface AnimeCardProps {
    anime: AnimeCardModel
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
    const { title, imageUrl, score, year, season, status, genres } = anime
    return (
        <TiltCard className="w-full h-full">
            <article className="bg-zinc-900/60 border border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-3/4 bg-zinc-800">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : null}
                </div>
                <div className="p-3">
                    <h3 className="text-zinc-50 font-semibold leading-tight line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-zinc-300 text-sm mt-1">
                        {score ? `Score: ${score}` : 'Sem score'}
                        {year ? ` • ${year}` : ''}
                        {season ? ` • ${season}` : ''}
                    </p>
                    {status ? (
                        <p className="text-zinc-400 text-xs mt-1">{status}</p>
                    ) : null}
                    {genres.length ? (
                        <ul className="flex flex-wrap gap-1 mt-2">
                            {genres.slice(0, 3).map(g => (
                                <li
                                    key={g}
                                    className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-white/10"
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

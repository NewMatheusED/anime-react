import { AnimeCard } from './AnimeCard'
import type { AnimeCardModel } from '../types/anime'

interface AnimeListProps {
    animes: AnimeCardModel[]
}

export const AnimeList = ({ animes }: AnimeListProps) => {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-zinc-100 text-sm font-medium mb-3">
                Top {animes.length} resultados
            </h2>
            <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {animes.map(anime => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </div>
        </section>
    )
}

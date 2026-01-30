import AnimeCard from './AnimeCard'
import type { AnimeCardModel } from '../types/anime'

interface AnimeListProps {
    animes: AnimeCardModel[]
}

export default function AnimeList({ animes }: AnimeListProps) {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {animes.map(anime => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </div>
        </section>
    )
}

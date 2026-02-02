import AnimeCard from './AnimeCard'
import type { AnimeCardModel } from '../types/anime'
import AnimeDetailModal from './AnimeDetailModal'
import { useState } from 'react'

interface AnimeListProps {
    animes: AnimeCardModel[]
}

export default function AnimeList({ animes }: AnimeListProps) {
    const [animeId, setAnimeId] = useState<number | null>(null)
    const handleAnimeClick = (id: number) => setAnimeId(id)
    const handleCloseModal = () => setAnimeId(null)

    return (
        <section className="w-full max-w-6xl mx-auto">
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {animes.map(anime => (
                    <AnimeCard key={anime.id} anime={anime} onClick={handleAnimeClick} />
                ))}
            </div>
            {animeId != null && <AnimeDetailModal animeId={animeId} onClose={handleCloseModal} />}
        </section>
    )
}

import AnimeCard from './AnimeCard'
import VirtualAnimeGrid from './VirtualAnimeGrid'
import type { AnimeCardModel } from '../types/anime'
import AnimeDetailModal from './AnimeDetailModal'
import { useState } from 'react'

const VIRTUAL_THRESHOLD = 20

interface AnimeListProps {
    animes: AnimeCardModel[]
}

export default function AnimeList({ animes }: AnimeListProps) {
    const [animeId, setAnimeId] = useState<number | null>(null)
    const handleAnimeClick = (id: number) => setAnimeId(id)
    const handleCloseModal = () => setAnimeId(null)
    const useVirtual = animes.length > VIRTUAL_THRESHOLD

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8">
            {useVirtual ? (
                <VirtualAnimeGrid animes={animes} onAnimeClick={handleAnimeClick} />
            ) : (
                <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {animes.map(anime => (
                        <AnimeCard key={anime.id} anime={anime} onClick={handleAnimeClick} />
                    ))}
                </div>
            )}
            {animeId != null && <AnimeDetailModal animeId={animeId} onClose={handleCloseModal} />}
        </section>
    )
}

import { useRef, useState, useEffect } from 'react'
import AnimeCard from './AnimeCard'
import type { AnimeCardModel } from '../types/anime'
import AnimeDetailModal from './AnimeDetailModal'
import SkeletonCard from './SkeletonCard'

interface AnimeListProps {
  animes: AnimeCardModel[]
  fetchNextPage?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}

export default function AnimeList({
  animes,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
}: AnimeListProps) {
  const [animeId, setAnimeId] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleAnimeClick = (id: number) => setAnimeId(id)
  const handleCloseModal = () => setAnimeId(null)

  const hasInfinite = typeof fetchNextPage === 'function' && hasNextPage

  useEffect(() => {
    if (!hasInfinite || !sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting || isFetchingNextPage) return
        fetchNextPage()
      },
      { rootMargin: '200px', threshold: 0 }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasInfinite, fetchNextPage, isFetchingNextPage])

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} onClick={handleAnimeClick} />
        ))}
      </div>
      {hasInfinite && <div ref={sentinelRef} className="h-2 w-full" aria-hidden />}
      {hasInfinite && isFetchingNextPage && (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-5 lg:grid-cols-5">
          <SkeletonCard quantity={5} />
        </div>
      )}
      {animeId != null && <AnimeDetailModal animeId={animeId} onClose={handleCloseModal} />}
    </section>
  )
}

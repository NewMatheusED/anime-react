import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import AnimeCard from './AnimeCard'
import type { AnimeCardModel } from '../types/anime'

const ROW_HEIGHT = 490
const COLUMNS = 5

interface VirtualAnimeGridProps {
  animes: AnimeCardModel[]
  onAnimeClick: (id: number) => void
}

export default function VirtualAnimeGrid({ animes, onAnimeClick }: VirtualAnimeGridProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const rowCount = Math.ceil(animes.length / COLUMNS)

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 2,
  })

  return (
    <div
      ref={parentRef}
      className="w-full max-w-6xl mx-auto overflow-y-auto overscroll-contain"
      style={{ maxHeight: 'calc(100vh - 12rem)' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const start = virtualRow.index * COLUMNS
          const rowAnimes = animes.slice(start, start + COLUMNS)
          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 w-full px-4"
              style={{
                top: 0,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {rowAnimes.map(anime => (
                  <AnimeCard key={anime.id} anime={anime} onClick={onAnimeClick} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

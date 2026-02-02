import { useState } from 'react'
import AnimeList from '../components/AnimeList'
import SkeletonCard from '../components/SkeletonCard'
import { useGetTopAnimeInfinite } from '../hooks/getAnime'
import type { JikanAnimeType, JikanTopAnimeFilter, JikanAnimeRating } from '../types/jikan'

const TYPE_OPTIONS: { value: JikanAnimeType | ''; label: string }[] = [
  { value: '', label: 'Todos os tipos' },
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Filme' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' },
  { value: 'cm', label: 'CM' },
  { value: 'pv', label: 'PV' },
  { value: 'tv_special', label: 'TV Special' },
]

const FILTER_OPTIONS: { value: JikanTopAnimeFilter | ''; label: string }[] = [
  { value: '', label: 'Padrão' },
  { value: 'airing', label: 'Em exibição' },
  { value: 'upcoming', label: 'Em breve' },
  { value: 'bypopularity', label: 'Por popularidade' },
  { value: 'favorite', label: 'Favoritos' },
]

const RATING_OPTIONS: { value: JikanAnimeRating | ''; label: string }[] = [
  { value: '', label: 'Padrão' },
  { value: 'g', label: 'G - Todas as idades' },
  { value: 'pg', label: 'PG - Crianças' },
  { value: 'pg13', label: 'PG-13 - 13+' },
  { value: 'r17', label: 'R - 17+ (violência)' },
  { value: 'r', label: 'R+ - Conteúdo leve' },
  { value: 'rx', label: 'Rx - Hentai' },
]

export default function Top() {
  const [type, setType] = useState<JikanAnimeType | ''>('')
  const [filter, setFilter] = useState<JikanTopAnimeFilter | ''>('')
  const [rating, setRating] = useState<JikanAnimeRating | ''>('')
  const [sfw, setSfw] = useState(false)

  const filters = {
    ...(type && { type }),
    ...(filter && { filter }),
    ...(rating && { rating }),
    ...(sfw && { sfw: true }),
  }

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPending,
  } = useGetTopAnimeInfinite(filters)

  const selectClass =
    'rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

  if (error) {
    return (
      <section className="w-full">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Tipo
            <select value={type} onChange={(e) => setType((e.target.value || '') as JikanAnimeType | '')} className={selectClass}>
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value || 'all'} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Filtro
            <select value={filter} onChange={(e) => setFilter((e.target.value || '') as JikanTopAnimeFilter | '')} className={selectClass}>
              {FILTER_OPTIONS.map((o) => (
                <option key={o.value || 'default'} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Classificação
            <select value={rating} onChange={(e) => setRating((e.target.value || '') as JikanAnimeRating | '')} className={selectClass}>
              {RATING_OPTIONS.map((o) => (
                <option key={o.value || 'all'} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
            <input type="checkbox" checked={sfw} onChange={(e) => setSfw(e.target.checked)} className="h-4 w-4 rounded border-border-subtle text-accent focus:ring-accent" />
            SFW (sem +18)
          </label>
        </div>
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-semibold text-error">Erro ao carregar o top</h2>
          <p className="mt-2 text-sm text-text-secondary">{error?.message ?? 'Erro desconhecido'}</p>
        </div>
      </section>
    )
  }

  if (isPending && !data) {
    return (
      <section className="w-full">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Tipo
            <select
              value={type}
              onChange={(e) => setType((e.target.value || '') as JikanAnimeType | '')}
              className={selectClass}
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value || 'all'} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Filtro
            <select
              value={filter}
              onChange={(e) => setFilter((e.target.value || '') as JikanTopAnimeFilter | '')}
              className={selectClass}
            >
              {FILTER_OPTIONS.map((o) => (
                <option key={o.value || 'default'} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Classificação
            <select
              value={rating}
              onChange={(e) => setRating((e.target.value || '') as JikanAnimeRating | '')}
              className={selectClass}
            >
              {RATING_OPTIONS.map((o) => (
                <option key={o.value || 'all'} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={sfw}
              onChange={(e) => setSfw(e.target.checked)}
              className="h-4 w-4 rounded border-border-subtle text-accent focus:ring-accent"
            />
            SFW (sem +18)
          </label>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-5 lg:grid-cols-5">
          <SkeletonCard quantity={10} />
        </div>
      </section>
    )
  }

  const lista = data?.pages.flatMap((page) => page.lista) ?? []
  const isEmpty = lista.length === 0

  return (
    <section className="w-full">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          Tipo
          <select
            value={type}
            onChange={(e) => setType((e.target.value || '') as JikanAnimeType | '')}
            className={selectClass}
          >
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value || 'all'} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          Filtro
          <select
            value={filter}
            onChange={(e) => setFilter((e.target.value || '') as JikanTopAnimeFilter | '')}
            className={selectClass}
          >
            {FILTER_OPTIONS.map((o) => (
              <option key={o.value || 'default'} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          Classificação
          <select
            value={rating}
            onChange={(e) => setRating((e.target.value || '') as JikanAnimeRating | '')}
            className={selectClass}
          >
            {RATING_OPTIONS.map((o) => (
              <option key={o.value || 'all'} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={sfw}
            onChange={(e) => setSfw(e.target.checked)}
            className="h-4 w-4 rounded border-border-subtle text-accent focus:ring-accent"
          />
          SFW (sem +18)
        </label>
      </div>

      {isEmpty ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-8 text-center">
          <h2 className="text-xl font-semibold text-text-primary">Nenhum anime encontrado</h2>
          <p className="mt-2 text-sm text-text-secondary">Tente alterar os filtros.</p>
        </div>
      ) : (
        <AnimeList
          animes={lista}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </section>
  )
}

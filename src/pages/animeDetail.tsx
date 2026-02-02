import { Link, useParams } from '@tanstack/react-router'
import { useGetAnimeFull } from '../hooks/getAnime'
import { useFavorite } from '../store/appStore'
import type { JikanAnimeFull } from '../types/jikan'
import {
  ArrowLeftIcon,
  HeartIcon as HeartSolid,
  HeartIcon as HeartOutline,
  PlayCircleIcon,
  LinkIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { PlayCircleIcon as PlayCircleSolid } from '@heroicons/react/24/solid'

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
      {children}
    </h2>
  )
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border-subtle bg-surface-elevated px-3 py-1 text-sm text-text-secondary">
      {children}
    </span>
  )
}

export default function AnimeDetail() {
  const { id } = useParams({ from: '/anime/$id' })
  const animeId = Number(id)
  const { anime, loading, error } = useGetAnimeFull(animeId)
  const { favorites, setFavorites } = useFavorite()
  const isFavorite = anime ? favorites.includes(anime.mal_id) : false

  if (Number.isNaN(animeId) || animeId < 1) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-8 text-center">
        <p className="text-text-secondary">ID inválido.</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Voltar
        </Link>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="w-full">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </section>
    )
  }

  if (error || !anime) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-error">Erro ao carregar o anime.</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Voltar
        </Link>
      </section>
    )
  }

  const coverUrl = getCoverUrl(anime)
  const hasTrailer = Boolean(anime.trailer?.embed_url ?? anime.trailer?.url)
  const hasRelations = anime.relations && anime.relations.length > 0
  const hasTheme = anime.theme && (anime.theme.openings?.length > 0 || anime.theme.endings?.length > 0)
  const hasStreaming = anime.streaming && anime.streaming.length > 0
  const hasExternal = anime.external && anime.external.length > 0

  const toggleFavorite = () => {
    if (isFavorite) setFavorites((prev) => prev.filter((f) => f !== anime.mal_id))
    else setFavorites((prev) => [...prev, anime.mal_id])
  }

  return (
    <article className="w-full">
      {/* Back link */}
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" /> Voltar
      </Link>

      {/* Hero: capa + gradiente + título + favorito */}
      <header className="relative -mx-4 mb-8 overflow-hidden rounded-2xl border border-border bg-surface-elevated sm:-mx-6 lg:-mx-8">
        <div className="relative aspect-2/1 min-h-[220px] w-full sm:min-h-[280px]">
          {coverUrl && (
            <img
              src={coverUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div
            className="absolute inset-0 bg-linear-to-t from-page via-page/40 to-transparent"
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold leading-tight text-text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-3xl lg:text-4xl">
                  {anime.title}
                </h1>
                {(anime.title_english || anime.title_japanese) && (
                  <p className="mt-1 text-sm text-text-secondary drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-base">
                    {[anime.title_english, anime.title_japanese].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={toggleFavorite}
                className={`flex shrink-0 items-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-medium shadow-lg transition sm:self-auto ${
                  isFavorite
                    ? 'bg-error text-white hover:opacity-90'
                    : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                }`}
                aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                {isFavorite ? (
                  <HeartSolid className="h-5 w-5" />
                ) : (
                  <HeartOutline className="h-5 w-5" strokeWidth={2} />
                )}
                {isFavorite ? 'Favoritado' : 'Favoritar'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Meta pills */}
      <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3">
        {anime.score != null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-badge-soft px-3 py-1.5 text-sm font-medium text-badge">
            ⭐ {anime.score.toFixed(1)}
            {anime.scored_by != null && (
              <span className="text-badge/80">({anime.scored_by.toLocaleString()})</span>
            )}
          </span>
        )}
        {anime.type && <MetaPill>{anime.type}</MetaPill>}
        {anime.episodes != null && <MetaPill>{anime.episodes} eps</MetaPill>}
        {anime.status && <MetaPill>{anime.status}</MetaPill>}
        {anime.year != null && (
          <MetaPill>{anime.season ? `${anime.season} ${anime.year}` : String(anime.year)}</MetaPill>
        )}
        {anime.duration && <MetaPill>{anime.duration}</MetaPill>}
        {anime.rating && <MetaPill>{anime.rating}</MetaPill>}
        {anime.source && <MetaPill>{anime.source}</MetaPill>}
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        {/* Coluna principal: 2/3 */}
        <div className="space-y-8 lg:col-span-2">
          {anime.synopsis && (
            <section>
              <SectionTitle>Sinopse</SectionTitle>
              <p className="leading-relaxed text-text-secondary">{anime.synopsis}</p>
            </section>
          )}

          {anime.background && (
            <section>
              <SectionTitle>Contexto</SectionTitle>
              <p className="leading-relaxed text-text-secondary">{anime.background}</p>
            </section>
          )}

          {anime.genres && anime.genres.length > 0 && (
            <section>
              <SectionTitle>Gêneros</SectionTitle>
              <ul className="flex flex-wrap gap-2">
                {anime.genres.map((g) => (
                  <li
                    key={g.mal_id}
                    className="rounded-full border border-border-subtle bg-surface-elevated px-3 py-1 text-sm text-text-secondary"
                  >
                    {g.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(anime.studios?.length ?? 0) > 0 && (
            <section>
              <SectionTitle>Estúdios</SectionTitle>
              <p className="text-text-secondary">
                {anime.studios!.map((s) => s.name).join(', ')}
              </p>
            </section>
          )}

          {(anime.producers?.length ?? 0) > 0 && (
            <section>
              <SectionTitle>Produtores</SectionTitle>
              <p className="text-text-secondary">
                {anime.producers!.map((p) => p.name).join(', ')}
              </p>
            </section>
          )}

          {(anime.licensors?.length ?? 0) > 0 && (
            <section>
              <SectionTitle>Licenciadores</SectionTitle>
              <p className="text-text-secondary">
                {anime.licensors!.map((l) => l.name).join(', ')}
              </p>
            </section>
          )}

          {((anime.themes?.length ?? 0) > 0 || (anime.demographics?.length ?? 0) > 0) && (
            <section>
              <SectionTitle>Temas e demografia</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {anime.themes?.map((t) => (
                  <MetaPill key={t.mal_id}>{t.name}</MetaPill>
                ))}
                {anime.demographics?.map((d) => (
                  <MetaPill key={d.mal_id}>{d.name}</MetaPill>
                ))}
              </div>
            </section>
          )}

          {hasRelations && (
            <section>
              <SectionTitle>Relacionados</SectionTitle>
              <ul className="space-y-3">
                {anime.relations!.map((rel) => (
                  <li key={rel.relation}>
                    <span className="block text-xs font-medium text-text-muted">{rel.relation}</span>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {rel.entry.map((entry) => (
                        <li key={`${entry.mal_id}-${entry.type}`}>
                          {entry.type === 'anime' ? (
                            <Link
                              to="/anime/$id"
                              params={{ id: String(entry.mal_id) }}
                              className="rounded-lg border border-border-subtle bg-surface-elevated px-3 py-1.5 text-sm text-text-secondary transition hover:border-accent hover:text-accent"
                            >
                              {entry.name}
                            </Link>
                          ) : (
                            <a
                              href={entry.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-border-subtle bg-surface-elevated px-3 py-1.5 text-sm text-text-secondary transition hover:border-accent hover:text-accent"
                            >
                              {entry.name}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasTheme && (
            <section>
              <SectionTitle>Trilha sonora</SectionTitle>
              <div className="space-y-3">
                {anime.theme!.openings?.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-text-muted">Openings</span>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-text-secondary">
                      {anime.theme!.openings.map((op, i) => (
                        <li key={i}>{op}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {anime.theme!.endings?.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-text-muted">Endings</span>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-text-secondary">
                      {anime.theme!.endings.map((ed, i) => (
                        <li key={i}>{ed}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: 1/3 */}
        <aside className="space-y-6 lg:col-span-1 sticky top-20 h-fit">
          <div className="rounded-2xl border border-border-subtle bg-surface p-5">
            <SectionTitle>
              <span className="inline-flex items-center gap-1.5">
                <ChartBarIcon className="h-3.5 w-3.5" /> Estatísticas
              </span>
            </SectionTitle>
            <ul className="space-y-2 text-sm text-text-secondary">
              {anime.rank != null && <li>Rank: #{anime.rank}</li>}
              {anime.popularity != null && <li>Popularidade: #{anime.popularity}</li>}
              {anime.members != null && (
                <li>Membros: {anime.members.toLocaleString()}</li>
              )}
              {anime.favorites != null && (
                <li>Favoritos: {anime.favorites.toLocaleString()}</li>
              )}
            </ul>
          </div>

          {(anime.aired?.string || anime.broadcast?.string) && (
            <div className="rounded-2xl border border-border-subtle bg-surface p-5">
              <SectionTitle>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDaysIcon className="h-3.5 w-3.5" /> Exibição
                </span>
              </SectionTitle>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                {anime.aired?.string && <li>{anime.aired.string}</li>}
                {anime.broadcast?.string && (
                  <li className="inline-flex items-center gap-1">
                    <ClockIcon className="h-4 w-4 text-text-muted" /> {anime.broadcast.string}
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {hasTrailer && (
              <a
                href={anime.trailer!.embed_url ?? anime.trailer!.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-error px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                <PlayCircleSolid className="h-5 w-5" /> Trailer
              </a>
            )}
            {anime.url && (
              <a
                href={anime.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-secondary transition hover:border-accent hover:text-accent"
              >
                <LinkIcon className="h-5 w-5" /> MyAnimeList
              </a>
            )}
          </div>

          {hasStreaming && (
            <div className="rounded-2xl border border-border-subtle bg-surface p-5">
              <SectionTitle>Onde assistir</SectionTitle>
              <ul className="flex flex-wrap gap-2">
                {anime.streaming!.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-elevated px-3 py-1.5 text-sm text-text-secondary transition hover:border-accent hover:text-accent"
                    >
                      <PlayCircleIcon className="h-4 w-4" /> {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasExternal && (
            <div className="rounded-2xl border border-border-subtle bg-surface p-5">
              <SectionTitle>Links externos</SectionTitle>
              <ul className="flex flex-wrap gap-2">
                {anime.external!.map((e) => (
                  <li key={e.name}>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-elevated px-3 py-1.5 text-sm text-text-secondary transition hover:border-accent hover:text-accent"
                    >
                      <LinkIcon className="h-4 w-4" /> {e.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  )
}

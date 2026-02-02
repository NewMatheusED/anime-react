import AnimeList from '../components/AnimeList'
import SkeletonCard from '../components/SkeletonCard'
import { useSearch } from '../store/appStore'
import { useGetAnimesInfinite } from '../hooks/getAnime'

export default function Home() {
  const search = useSearch()
  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage, isPending } =
    useGetAnimesInfinite(search)

  if (error) {
    return (
      <section className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold text-error">Erro ao carregar os animes</h2>
        <p className="mt-2 text-sm text-text-secondary">{error?.message ?? 'Erro desconhecido'}</p>
      </section>
    )
  }

  if (isPending && !data) {
    return (
      <section className="w-full">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-5 lg:grid-cols-5">
          <SkeletonCard quantity={10} />
        </div>
      </section>
    )
  }

  const lista = data?.pages.flatMap((page) => page.lista) ?? []
  const isEmpty = lista.length === 0

  if (isEmpty) {
    return (
      <section className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold text-text-primary">Nenhum anime encontrado</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Tente outra busca ou verifique sua conexão com a internet.
        </p>
      </section>
    )
  }

  return (
    <AnimeList
      animes={lista}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage ?? false}
      isFetchingNextPage={isFetchingNextPage}
    />
  )
}


import { useGetAnimesByIds } from '../hooks/getAnime'
import AnimeList from '../components/AnimeList'
import { useFavorites } from '../store/appStore'
import SkeletonCard from '../components/SkeletonCard'


export default function Favorites() {
    const favorites = useFavorites()

    const { lista, loading, error } = useGetAnimesByIds(favorites)

    if (favorites.length === 0) {
        return (
            <section className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-8 text-center">
                <h2 className="text-xl font-semibold text-text-primary">Nenhum anime favorito encontrado</h2>
                <p className="mt-2 text-sm text-text-secondary">Adicione alguns animes aos favoritos para ver a lista.</p>
            </section>
        )
    }

    if (loading) {
        return (
            <section className="w-full max-w-6xl mx-auto px-4 py-8">
                <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    <SkeletonCard quantity={10} />
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
                <h2 className="text-xl font-semibold text-error">Erro ao carregar os animes</h2>
                <p className="mt-2 text-sm text-text-secondary">{error?.message ?? 'Erro desconhecido'}</p>
            </section>
        )
    }

    if (lista.length === 0) {
        return (
            <section className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-8 text-center">
                <h2 className="text-xl font-semibold text-text-primary">Nenhum anime favorito encontrado</h2>
                <p className="mt-2 text-sm text-text-secondary">Adicione alguns animes aos favoritos para ver a lista.</p>
            </section>
        )
    }

    return (
        <AnimeList key={favorites.join(',')} animes={lista} />
    )
}
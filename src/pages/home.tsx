import AnimeList from '../components/AnimeList'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'
import { useSearch } from '../store/appStore'
import { useGetAnime } from '../hooks/getAnime'
import { useState, useEffect } from 'react'

export const Home = () => {
    const search = useSearch()
    const [page, setPage] = useState(1)
    const { lista, loading, pagination, error } = useGetAnime(page, search)

    useEffect(() => {
        setPage(1)
    }, [search])

    const handlePageChange = (page: number) => {
        setPage(page)
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
            <section className="w-full max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-red-500">Erro ao carregar os animes</h1>
                    <p className="text-zinc-400">{error?.message ?? 'Erro desconhecido'}</p>
                </div>
            </section>
        )
    }

    if (lista.length === 0) {
        return (
            <section className="w-full max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold text-zinc-400">Nenhum anime encontrado</h1>
                    <p className="text-zinc-400">Tente outra busca ou verifique sua conexão com a internet</p>
                </div>
            </section>
        )
    }

    return (
        <>
            <AnimeList animes={lista} />
            <Pagination page={page} totalPages={pagination?.last_visible_page ?? 0} onPageChange={handlePageChange} />
        </>
    )
}

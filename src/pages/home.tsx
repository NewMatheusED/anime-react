import AnimeList from '../components/AnimeList'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'
import { useSearch } from '../store/appStore'
import { useGetAnime } from '../hooks/getAnime'
import { useState, useEffect } from 'react'

export default function Home() {
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
            <section className="w-full">
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
                <h2 className="text-xl font-semibold text-text-primary">Nenhum anime encontrado</h2>
                <p className="mt-2 text-sm text-text-secondary">Tente outra busca ou verifique sua conexão com a internet.</p>
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

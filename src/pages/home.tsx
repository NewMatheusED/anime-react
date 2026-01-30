import AnimeList from '../components/AnimeList'
import SkeletonCard from '../components/SkeletonCard'
import Pagination from '../components/Pagination'
import { useSearch } from '../context/SearchContext'
import { useGetAnime } from '../hooks/getAnime'
import { useState, useEffect } from 'react'

export const Home = () => {
    const { search } = useSearch()
    const [page, setPage] = useState(1)
    const { lista, loading, pagination } = useGetAnime(page, search)

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

    return (
        <>
            <AnimeList animes={lista} />
            <Pagination page={page} totalPages={pagination?.last_visible_page ?? 0} onPageChange={handlePageChange} />
        </>
    )
}

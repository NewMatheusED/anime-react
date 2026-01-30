import { useState, useEffect } from "react";
import { AnimeCardModel, PaginationModel, toAnimeCardModel } from "../types/anime";
import { buscarAnimes, buscarAnimeFull } from "../services/animeService";
import { JikanAnimeFull } from "../types/jikan";

export function useGetAnime(page: number, search: string = '') {
    const [lista, setLista] = useState<AnimeCardModel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [pagination, setPagination] = useState<PaginationModel | null>(null)

    useEffect(() => {
        async function carregarAnimes() {
            try {
                setLoading(true)
                const dados = await buscarAnimes(page, search)
                setLista(dados.animes.map(toAnimeCardModel))
                setPagination(dados.pagination)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }
        carregarAnimes()
    }, [page, search])

    return { lista, loading, error, pagination }
}

export function useGetAnimeFull(animeId: number) {
    const [anime, setAnime] = useState<JikanAnimeFull | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function carregarAnime() {
            try {
                setLoading(true)
                const dados = await buscarAnimeFull(animeId)
                setAnime(dados)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }
        carregarAnime()
    }, [animeId])

    return { anime, loading, error }
}
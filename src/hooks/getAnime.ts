import { useQuery } from '@tanstack/react-query'
import { AnimeCardModel, PaginationModel, toAnimeCardModel } from '../types/anime'
import { buscarAnimes, buscarAnimeFull } from '../services/animeService'
import type { JikanAnimeFull } from '../types/jikan'

export const animeKeys = {
  all: ['animes'] as const,
  lists: () => [...animeKeys.all, 'list'] as const,
  list: (page: number, search: string) => [...animeKeys.lists(), page, search] as const,
  details: () => [...animeKeys.all, 'detail'] as const,
  detail: (id: number) => [...animeKeys.details(), id] as const,
}

export function useGetAnime(page: number, search: string = '') {
  const query = useQuery({
    queryKey: animeKeys.list(page, search),
    queryFn: async () => {
      const { animes, pagination } = await buscarAnimes(page, search)
      return {
        lista: animes.map(toAnimeCardModel),
        pagination,
      }
    },
  })

  const lista: AnimeCardModel[] = query.data?.lista ?? []
  const pagination: PaginationModel | null = query.data?.pagination ?? null

  return {
    lista,
    loading: query.isPending,
    error: query.error as Error | null,
    pagination,
    refetch: query.refetch,
  }
}

export function useGetAnimeFull(animeId: number) {
  const query = useQuery({
    queryKey: animeKeys.detail(animeId),
    queryFn: () => buscarAnimeFull(animeId),
    enabled: animeId > 0,
  })

  return {
    anime: query.data ?? null,
    loading: query.isPending,
    error: query.error as Error | null,
    refetch: query.refetch,
  }
}

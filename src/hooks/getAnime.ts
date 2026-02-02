import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AnimeCardModel, PaginationModel, toAnimeCardModel } from '../types/anime'
import type { JikanTopAnimeParams } from '../types/jikan'
import {
  buscarAnimes,
  buscarAnimeFull,
  buscarAnimeById,
  buscarTopAnimes,
} from '../services/animeService'

export const animeKeys = {
  all: ['animes'] as const,
  lists: () => [...animeKeys.all, 'list'] as const,
  list: (page: number, search: string) => [...animeKeys.lists(), page, search] as const,
  topLists: () => [...animeKeys.all, 'top'] as const,
  topList: (page: number, filters: JikanTopAnimeParams) =>
    [...animeKeys.topLists(), page, filters] as const,
  details: () => [...animeKeys.all, 'detail'] as const,
  detail: (id: number) => [...animeKeys.details(), id] as const,
  ids: (ids: number[]) => [...animeKeys.all, 'ids', ...ids] as const,
}

export function useGetAnimesByIds(ids: number[]) {
  const query = useQuery({
    queryKey: animeKeys.ids(ids),
    queryFn: () => Promise.all(ids.map(buscarAnimeById)),
    enabled: ids.length > 0,
  })

  const lista: AnimeCardModel[] = query.data?.map(toAnimeCardModel) ?? []
  
  return {
    lista,
    loading: query.isPending,
    error: query.error as Error | null,
    refetch: query.refetch,
  }
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

export function useGetTopAnime(page: number, filters: JikanTopAnimeParams = {}) {
  const query = useQuery({
    queryKey: animeKeys.topList(page, filters),
    queryFn: async () => {
      const { animes, pagination } = await buscarTopAnimes(page, filters)
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

export function useGetAnimesInfinite(search: string = '') {
  return useInfiniteQuery({
    queryKey: ['animes', 'infinite', search],
    queryFn: async ({ pageParam = 1 }) => {
      const { animes, pagination } = await buscarAnimes(pageParam, search)
      return {
        lista: animes.map(toAnimeCardModel),
        pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
  })
}

export function useGetTopAnimeInfinite({ type, filter, rating, sfw }: JikanTopAnimeParams = {}) {
  return useInfiniteQuery({
    queryKey: ['top', 'infinite', type, filter, rating, sfw],
    queryFn: async ({ pageParam = 1 }) => {
      const { animes, pagination } = await buscarTopAnimes(pageParam, { type, filter, rating, sfw })
      return {
        lista: animes.map(toAnimeCardModel),
        pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
  })
}

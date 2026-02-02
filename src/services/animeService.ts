import type {
  JikanAnime,
  JikanTopAnimeBody,
  JikanAnimeFull,
  JikanTopAnimeParams,
} from '../types/jikan'
import type { PaginationModel } from '../types/anime'
import { httpClient } from './httpClient'

function buildTopAnimeQuery(params: JikanTopAnimeParams): string {
  const search = new URLSearchParams()
  if (params.page != null) search.set('page', String(params.page))
  if (params.type) search.set('type', params.type)
  if (params.filter) search.set('filter', params.filter)
  if (params.rating) search.set('rating', params.rating)
  if (params.sfw === true) search.set('sfw', 'true')
  return search.toString()
}

export async function buscarTopAnimes(
  page: number = 1,
  filters: JikanTopAnimeParams = {}
): Promise<{ animes: JikanAnime[]; pagination: PaginationModel }> {
  const query = buildTopAnimeQuery({ ...filters, page })
  const url = `/top/anime${query ? `?${query}` : ''}`
  const { data: body } = await httpClient.get<JikanTopAnimeBody>(url)
  return { animes: body.data, pagination: body.pagination }
}

export async function buscarAnimes(
  page: number = 1,
  search: string = '',
): Promise<{ animes: JikanAnime[]; pagination: PaginationModel }> {
  const url = `/anime?page=${page}&q=${encodeURIComponent(search.trim())}`
  const { data: body } = await httpClient.get<JikanTopAnimeBody>(url)
  return { animes: body.data, pagination: body.pagination }
}

export async function buscarAnimeById(id: number): Promise<JikanAnime> {
  const url = `/anime/${id}`
  const { data: body } = await httpClient.get<{ data: JikanAnime }>(url)
  return body.data
}

export async function buscarAnimeFull(id: number): Promise<JikanAnimeFull> {
  const url = `/anime/${id}/full`
  const { data: body } = await httpClient.get<{ data: JikanAnimeFull }>(url)
  return body.data
}

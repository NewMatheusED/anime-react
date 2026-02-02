import type { JikanAnime, JikanTopAnimeBody, JikanAnimeFull } from '../types/jikan'
import type { PaginationModel } from '../types/anime'
import { httpClient } from './httpClient'

export async function buscarAnimes(
  page: number = 1,
  search: string = ''
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

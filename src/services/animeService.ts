import type { JikanAnime, JikanTopAnimeBody } from '../types/jikan'
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

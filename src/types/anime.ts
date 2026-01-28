import type { JikanAnime } from './jikan'

export interface AnimeCardModel {
    id: number
    title: string
    imageUrl?: string
    score?: number
    year?: number
    season?: string
    status?: string
    synopsis?: string
    genres: string[]
}

export function toAnimeCardModel(anime: JikanAnime): AnimeCardModel {
    return {
        id: anime.mal_id,
        title: anime.title,
        imageUrl:
            anime.images?.webp?.large_image_url ??
            anime.images?.jpg?.large_image_url ??
            anime.images?.webp?.image_url ??
            anime.images?.jpg?.image_url,
        score: anime.score ?? undefined,
        year: anime.year ?? undefined,
        season: anime.season ?? undefined,
        status: anime.status ?? undefined,
        synopsis: anime.synopsis ?? undefined,
        genres: (anime.genres ?? []).map(g => g.name),
    }
}

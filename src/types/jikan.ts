export type Nullable<T> = T | null

export interface JikanNamedResource {
    mal_id: number
    type?: string
    name: string
    url?: string
}

export interface JikanAiredPropFrom {
    day: Nullable<number>
    month: Nullable<number>
    year: Nullable<number>
}

export interface JikanAiredPropTo {
    day: Nullable<number>
    month: Nullable<number>
    year: Nullable<number>
}

export interface JikanAiredProp {
    from: JikanAiredPropFrom
    to: JikanAiredPropTo
    string: Nullable<string>
}

export interface JikanAired {
    from: Nullable<string>
    to: Nullable<string>
    string: string
    prop?: JikanAiredProp
}

export interface JikanBroadcast {
    day: Nullable<string>
    time: Nullable<string>
    timezone: Nullable<string>
    string?: Nullable<string>
}

export interface JikanImages {
    jpg?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
    }
    webp?: {
        image_url?: string
        small_image_url?: string
        large_image_url?: string
    }
}

/** Imagens com campos nullable (usado no endpoint full) */
export interface JikanImagesFull {
    jpg?: {
        image_url: Nullable<string>
        small_image_url: Nullable<string>
        large_image_url: Nullable<string>
    }
    webp?: {
        image_url: Nullable<string>
        small_image_url: Nullable<string>
        large_image_url: Nullable<string>
    }
}

/** Recurso com URL obrigatória (mal_url na documentação) */
export interface JikanMalUrl {
    mal_id: number
    type: string
    name: string
    url: string
}

export interface JikanRelation {
    relation: string
    entry: JikanMalUrl[]
}

export interface JikanTheme {
    openings: string[]
    endings: string[]
}

export interface JikanExternal {
    name: string
    url: string
}

export interface JikanStreaming {
    name: string
    url: string
}

export interface JikanTrailer {
    youtube_id: Nullable<string>
    url: Nullable<string>
    embed_url: Nullable<string>
}

export interface JikanTitle {
    type: string
    title: string
}

export interface JikanAnime {
    mal_id: number
    url: string
    images: JikanImages
    trailer?: JikanTrailer
    approved?: boolean

    titles?: JikanTitle[]
    title: string
    title_english?: Nullable<string>
    title_japanese?: Nullable<string>
    title_synonyms?: string[]

    type?: Nullable<string>
    source?: Nullable<string>
    episodes?: Nullable<number>
    status?: Nullable<string>
    airing?: Nullable<boolean>
    aired?: JikanAired
    duration?: Nullable<string>
    rating?: Nullable<string>
    score?: Nullable<number>
    scored_by?: Nullable<number>
    rank?: Nullable<number>
    popularity?: Nullable<number>
    members?: Nullable<number>
    favorites?: Nullable<number>

    synopsis?: Nullable<string>
    background?: Nullable<string>

    season?: Nullable<string>
    year?: Nullable<number>
    broadcast?: JikanBroadcast

    producers?: JikanNamedResource[]
    licensors?: JikanNamedResource[]
    studios?: JikanNamedResource[]
    genres?: JikanNamedResource[]
    explicit_genres?: JikanNamedResource[]
    themes?: JikanNamedResource[]
    demographics?: JikanNamedResource[]
}

export interface JikanResponse<T> {
    data: T
}
export interface JikanTopAnimeBody {
    data: JikanAnime[]
    pagination: import('./anime').PaginationModel
}

export interface JikanAnimeFull {
    mal_id: number
    url: string
    images: JikanImagesFull
    trailer?: JikanTrailer
    approved: boolean
    titles: JikanTitle[]
    title: string
    title_english?: Nullable<string>
    title_japanese?: Nullable<string>
    title_synonyms?: string[]
    type: Nullable<string>
    source: Nullable<string>
    episodes: Nullable<number>
    status: Nullable<string>
    airing: boolean
    aired?: JikanAired
    duration: Nullable<string>
    rating: Nullable<string>
    score: Nullable<number>
    scored_by: Nullable<number>
    rank: Nullable<number>
    popularity: Nullable<number>
    members: Nullable<number>
    favorites: Nullable<number>
    synopsis: Nullable<string>
    background: Nullable<string>
    season: Nullable<string>
    year: Nullable<number>
    broadcast?: JikanBroadcast
    producers?: JikanMalUrl[]
    licensors?: JikanMalUrl[]
    studios?: JikanMalUrl[]
    genres?: JikanMalUrl[]
    explicit_genres?: JikanMalUrl[]
    themes?: JikanMalUrl[]
    demographics?: JikanMalUrl[]
    relations?: JikanRelation[]
    theme?: JikanTheme
    external?: JikanExternal[]
    streaming?: JikanStreaming[]
}
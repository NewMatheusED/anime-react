import { AnimeList } from '../components/AnimeList'
import { useState, useEffect } from 'react'
import { buscarTodosAnimes } from '../services/animeService'
import type { AnimeCardModel } from '../types/anime'
import { toAnimeCardModel } from '../types/anime'

export const Home = () => {
    const [lista, setLista] = useState<AnimeCardModel[]>([])
    const [loading, setLoading] = useState(true)

    const [novoNome, setNovoNome] = useState('')

    useEffect(() => {
        async function carregarAnimes() {
            try {
                const dados = await buscarTodosAnimes()
                setLista(dados.map(toAnimeCardModel))
            } finally {
                setLoading(false)
            }
        }

        carregarAnimes()
    }, [])

    const adicionarAnime = () => {
        const titulo = novoNome.trim()
        if (!titulo) return

        const novo: AnimeCardModel = {
            id: Date.now(),
            title: titulo,
            imageUrl: undefined,
            score: undefined,
            year: undefined,
            season: undefined,
            status: 'Adicionado localmente',
            synopsis: undefined,
            genres: [],
        }
        setLista(atual => [novo, ...atual])

        setNovoNome('')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-zinc-950 via-slate-950 to-slate-900 flex items-center justify-center">
                <p className="text-zinc-300 text-lg animate-pulse">
                    Carregando…
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-950 via-slate-950 to-slate-900 pb-16">
            <header className="max-w-6xl mx-auto px-4 pt-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-zinc-50 text-2xl font-bold">
                            Top Animes
                        </h1>
                        <p className="text-zinc-400 mt-1 text-sm">
                            Dados via Jikan (MyAnimeList). Total:{' '}
                            <span className="text-zinc-100 font-medium">
                                {lista.length}
                            </span>
                        </p>
                    </div>

                    <div className="mt-3 sm:mt-0 flex gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Adicionar anime local (título)"
                            value={novoNome}
                            onChange={e => setNovoNome(e.target.value)}
                            className="flex-1 bg-zinc-900/70 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 text-sm outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-500/30 transition"
                        />
                        <button
                            onClick={adicionarAnime}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition"
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            </header>

            <AnimeList animes={lista} />
        </div>
    )
}

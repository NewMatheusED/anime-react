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

    if (loading) return <p className="text-zinc-200 p-6">Carregando…</p>

    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="max-w-6xl mx-auto px-4 pt-8">
                <h1 className="text-zinc-50 text-2xl font-bold">Top Animes</h1>
                <p className="text-zinc-400 mt-1">
                    Dados via Jikan (MyAnimeList).
                </p>

                <div className="mt-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="Adicionar anime local (título)"
                        value={novoNome}
                        onChange={e => setNovoNome(e.target.value)}
                        className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-white/20"
                    />
                    <button
                        onClick={adicionarAnime}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg px-4 py-2"
                    >
                        Adicionar
                    </button>
                </div>
            </header>

            <AnimeList animes={lista} />
        </div>
    )
}

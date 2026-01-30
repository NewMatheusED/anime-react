import SearchBar from './SearchBar'
import { useSearch } from '../context/SearchContext'

export default function Header() {
    const { setSearch } = useSearch()

    return (
        <header className="bg-zinc-900 flex items-center justify-between py-4">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-zinc-50 text-2xl font-bold">
                    Anime React
                </h1>
            </div>
            <div className="max-w-6xl mx-auto px-4">
                <SearchBar onSearch={setSearch} />
            </div>
        </header>
    )
}

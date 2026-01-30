import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ onSearch }: { onSearch: (search: string) => void }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const search = formData.get('search')?.toString() || ''
        onSearch(search)
    }
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input type="text" name="search" placeholder="Pesquisar" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition" />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition">
                <MagnifyingGlassIcon className="w-4 h-4 text-white" />
            </button>
        </form>
    )
}

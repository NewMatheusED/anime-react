import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ onSearch }: { onSearch: (search: string) => void }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const search = formData.get('search')?.toString() || ''
        onSearch(search)
    }
    return (
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <input
                type="text"
                name="search"
                placeholder="Buscar animes..."
                className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft transition"
            />
            <button
                type="submit"
                className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            >
                <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
        </form>
    )
}

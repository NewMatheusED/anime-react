import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    return (
        <nav className="flex items-center justify-center gap-3 py-6" aria-label="Paginação">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface-elevated px-4 text-sm font-medium text-text-primary transition hover:bg-accent hover:border-accent hover:text-white disabled:opacity-40 disabled:pointer-events-none disabled:hover:bg-surface-elevated disabled:hover:border-border disabled:hover:text-text-primary"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="min-w-28 text-center text-sm font-medium text-text-secondary">
                {page} de {totalPages}
            </span>
            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface-elevated px-4 text-sm font-medium text-text-primary transition hover:bg-accent hover:border-accent hover:text-white disabled:opacity-40 disabled:pointer-events-none disabled:hover:bg-surface-elevated disabled:hover:border-border disabled:hover:text-text-primary"
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>
        </nav>
    )
}
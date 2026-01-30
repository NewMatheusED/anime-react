import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                <ChevronLeftIcon className="w-4 h-4 text-white" />
            </button>
            <span className="text-sm font-medium text-zinc-50">{page} de {totalPages}</span>
            {page < totalPages && (
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
                    <ChevronRightIcon className="w-4 h-4 text-white" />
                </button>
            )}
        </div>
    )
}
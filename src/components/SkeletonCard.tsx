const SKELETON_PULSE = 'bg-zinc-700 rounded animate-pulse'

function SkeletonCardItem() {
    return (
        <article className="w-full h-full min-w-0 relative bg-zinc-900/80 border border-white/5 rounded-2xl overflow-hidden shadow-lg transition-shadow">
            <div className="relative aspect-3/4 bg-zinc-800 overflow-hidden">
                <div className={`w-full h-full ${SKELETON_PULSE}`} />
            </div>
            <div className="p-3 flex flex-col gap-1.5">
                <div className={`h-4 w-[95%] ${SKELETON_PULSE}`} />
                <div className={`h-4 w-3/4 ${SKELETON_PULSE}`} />
                <div className={`h-3 w-2/5 ${SKELETON_PULSE}`} />
                <div className={`h-3 w-1/3 ${SKELETON_PULSE}`} />
                <div className={`h-3 w-full ${SKELETON_PULSE}`} />
                <div className={`h-3 w-[90%] ${SKELETON_PULSE}`} />
                <div className={`h-3 w-3/5 ${SKELETON_PULSE}`} />
                <div className="flex flex-wrap gap-1 mt-2">
                    <div className={`h-5 w-14 ${SKELETON_PULSE}`} />
                    <div className={`h-5 w-16 ${SKELETON_PULSE}`} />
                    <div className={`h-5 w-12 ${SKELETON_PULSE}`} />
                </div>
            </div>
        </article>
    )
}

export default function SkeletonCard({ quantity }: { quantity: number }) {
    return (
        <>
            {Array.from({ length: quantity }, (_, index) => (
                <SkeletonCardItem key={index} />
            ))}
        </>
    )
}
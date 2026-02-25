/**
 * ProgressBar — shows "Question X of Y" with an animated fill bar
 * and individual dot indicators for each question.
 */
export default function ProgressBar({ current, total }) {
  // current is 1-based; percentage reflects questions *completed* before this one
  const pct = ((current - 1) / total) * 100

  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold font-body text-indigo-300">
          Question {current} of {total}
        </span>
        <span className="text-sm font-bold font-body text-lime-400">
          {Math.round(pct)}% done
        </span>
      </div>

      {/* Track */}
      <div className="w-full h-4 bg-indigo-900/70 rounded-full overflow-hidden border border-indigo-700/50">
        {/* Fill — transitions smoothly as currentIndex changes */}
        <div
          className="h-full rounded-full bg-lime-400 relative transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        >
          {/* Inner shine stripe */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-between mt-2 px-1">
        {Array.from({ length: total }).map((_, i) => {
          const done    = i < current - 1
          const active  = i === current - 1
          return (
            <div
              key={i}
              className={`
                rounded-full transition-all duration-300
                ${done   ? 'w-2.5 h-2.5 bg-lime-400'                   : ''}
                ${active ? 'w-2.5 h-2.5 bg-lime-300 animate-pulse-scale' : ''}
                ${!done && !active ? 'w-2 h-2 bg-indigo-700'            : ''}
              `}
            />
          )
        })}
      </div>
    </div>
  )
}

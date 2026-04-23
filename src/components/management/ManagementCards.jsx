import { useState } from 'react'

function ManagementCardImage({
  src,
  alt,
  fallback = '?',
  className = '',
  aspectClassName = 'aspect-[4/3]',
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-neutral-950 ${aspectClassName} ${className}`}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,#222_0%,#171717_100%)] text-4xl font-semibold text-neutral-300">
          {fallback}
        </div>
      )}
    </div>
  )
}

function ManagementCard({
  media,
  title,
  description,
  accent,
  footer,
  selected = false,
  onClick,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const isInteractive = typeof onClick === 'function'

  return (
    <article
      onClick={onClick}
      className={`flex h-full flex-col overflow-hidden rounded-[24px] border bg-neutral-900 transition ${
        selected
          ? 'border-orange-400 shadow-[0_0_0_1px_rgba(251,146,60,0.14)]'
          : 'border-neutral-800'
      } ${isInteractive ? 'cursor-pointer hover:border-neutral-700' : ''} ${className}`}
    >
      {media ? <div className="border-b border-neutral-800">{media}</div> : null}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-3">
          <h2
            className={`text-[1.95rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white ${titleClassName}`}
          >
            {title}
          </h2>
          {description ? (
            <p className={`text-base leading-8 text-neutral-300 ${descriptionClassName}`}>
              {description}
            </p>
          ) : null}
          {accent ? (
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-orange-400">
              {accent}
            </p>
          ) : null}
        </div>

        {footer ? <div className="mt-auto">{footer}</div> : null}
      </div>
    </article>
  )
}

export { ManagementCard, ManagementCardImage }

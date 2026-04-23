const statusToneClasses = {
  success: 'border-emerald-400/35 bg-emerald-500/12 text-emerald-200',
  info: 'border-sky-400/35 bg-sky-500/12 text-sky-200',
  warning: 'border-amber-400/35 bg-amber-500/12 text-amber-200',
  muted: 'border-slate-400/30 bg-slate-500/10 text-slate-200',
}

const actionToneClasses = {
  primary:
    'bg-orange-400 text-neutral-950 hover:bg-orange-300 focus-visible:ring-orange-300/80',
  secondary:
    'border border-neutral-700 bg-neutral-900 text-neutral-100 hover:border-neutral-600 hover:bg-neutral-800 focus-visible:ring-neutral-500/80',
}

function ManagementIcon({ name, className = 'h-5 w-5' }) {
  const sharedProps = {
    'aria-hidden': 'true',
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.8',
    viewBox: '0 0 24 24',
  }

  if (name === 'plus') {
    return (
      <svg {...sharedProps}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    )
  }

  if (name === 'edit') {
    return (
      <svg {...sharedProps}>
        <path d="m4 20 4.2-1 9.1-9.1a2.1 2.1 0 0 0 0-3L15.1 4.7a2.1 2.1 0 0 0-3 0L3 13.8 2 18z" />
        <path d="m13.5 6.3 4.2 4.2" />
      </svg>
    )
  }

  if (name === 'courses') {
    return (
      <svg {...sharedProps}>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19v14H6.5A2.5 2.5 0 0 0 4 20.5z" />
        <path d="M4 6.5v14" />
        <path d="M8 8h7" />
        <path d="M8 12h7" />
      </svg>
    )
  }

  if (name === 'active') {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="12" r="8" />
        <path d="m8.8 12.3 2.2 2.2 4.4-4.8" />
      </svg>
    )
  }

  if (name === 'inactive') {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="12" r="8" />
        <path d="M9 12h6" />
      </svg>
    )
  }

  if (name === 'paid') {
    return (
      <svg {...sharedProps}>
        <rect x="4" y="6" width="16" height="12" rx="2.5" />
        <path d="M4 10h16" />
        <path d="m9.5 14 1.6 1.6 3.4-3.6" />
      </svg>
    )
  }

  if (name === 'pending') {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" />
      </svg>
    )
  }

  if (name === 'cancel') {
    return (
      <svg {...sharedProps}>
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
      </svg>
    )
  }

  if (name === 'remove') {
    return (
      <svg {...sharedProps}>
        <path d="M6 12h12" />
      </svg>
    )
  }

  return null
}

function ManagementStatusIcon({ icon, label, tone = 'muted', className = '' }) {
  return (
    <span
      role="status"
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${statusToneClasses[tone]} ${className}`}
    >
      <ManagementIcon name={icon} />
      <span className="sr-only">{label}</span>
    </span>
  )
}

function ManagementActionButton({
  type = 'button',
  icon,
  label,
  tone = 'secondary',
  className = '',
  iconOnly = false,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:opacity-70 ${iconOnly ? 'h-11 w-11 shrink-0 px-0' : 'min-h-11 px-4 py-2'} ${actionToneClasses[tone]} ${className}`}
      {...props}
    >
      {icon ? <ManagementIcon name={icon} /> : null}
      {iconOnly ? <span className="sr-only">{label}</span> : <span>{children}</span>}
    </button>
  )
}

export { ManagementActionButton, ManagementStatusIcon }

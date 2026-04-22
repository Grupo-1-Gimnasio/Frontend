import { Link } from 'react-router-dom'

const baseClass =
  'inline-flex items-center justify-center rounded-lg font-semibold tracking-normal transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]'

const variantClasses = {
  primary: 'bg-[#ff6b2c] text-black hover:bg-[#ff7a42] focus-visible:ring-orange-400',
  secondary: 'border border-white/10 bg-[#212123]/92 text-white hover:border-white/20 hover:bg-[#2a2a2d] focus-visible:ring-white/40',
  ghost: 'bg-transparent text-white hover:text-orange-200 focus-visible:ring-white/40',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-9 py-4 text-lg',
}

function Button({ variant = 'primary', size = 'md', className = '', href, to, type = 'button', children, ...props }) {
  const classes = [baseClass, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button

import { Link } from 'react-router-dom'

function Footer({ footerLinks }) {
  const isInternalLink = (href) => href.startsWith('/')

  return (
    <footer className="rounded-3xl border border-neutral-800 bg-neutral-900 px-8 py-10">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">Lorza&apos;s Fitness</p>
          <p className="text-sm text-neutral-400">
            A community for inclusive movement, sustainable wellbeing, and
            shared care.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            {footerLinks.navigation.map((item) => (
              <li key={item.label}>
                {isInternalLink(item.href) ? (
                  <Link to={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Community
          </h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            {footerLinks.community.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Legal
          </h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            {footerLinks.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

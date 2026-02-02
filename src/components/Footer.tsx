import { Link } from '@tanstack/react-router'
import { FilmIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const footerNav = [
  { to: '/', label: 'Início' },
  { to: '/favoritos', label: 'Favoritos' },
]

const footerMeta = [
  { label: 'Jikan API', href: 'https://jikan.moe/', external: true },
  { label: 'React', href: 'https://react.dev/', external: true },
]

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border-subtle bg-surface">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-text-primary no-underline transition hover:text-accent-hover"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/25">
                <FilmIcon className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Anime<span className="text-accent">React</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              Catálogo de animes com busca e detalhes. Feito com React e Jikan API.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Navegação
            </h3>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
              {footerNav.map(({ to, label }) => (
                <li key={label}>
                  {to.startsWith('#') ? (
                    <span className="text-sm text-text-secondary">{label}</span>
                  ) : (
                    <Link
                      to={to}
                      className="text-sm text-text-secondary transition hover:text-accent"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

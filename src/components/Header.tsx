import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  FilmIcon,
} from '@heroicons/react/24/outline'
import SearchBar from './SearchBar'
import { setSearch } from '../store/appStore'

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/favoritos', label: 'Favoritos' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface/90 backdrop-blur-xl supports-backdrop-filter:bg-surface/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5 text-text-primary no-underline transition hover:text-accent-hover"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/25 transition group-hover:bg-accent-hover group-hover:shadow-accent/30">
            <FilmIcon className="h-5 w-5 text-white" />
          </span>
          <span className="text-xl font-semibold tracking-tight">
            Anime<span className="text-accent">React</span>
          </span>
        </Link>

        {/* Desktop: Nav + Search */}
        <nav className="hidden items-center gap-1 md:flex md:gap-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface-elevated hover:text-text-primary"
              activeProps={{ className: 'text-accent bg-accent-soft' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 justify-center px-4 md:flex md:max-w-md">
          <SearchBar onSearch={setSearch} />
        </div>

        {/* Spacer para alinhar à direita no desktop */}
        <div className="hidden w-[120px] shrink-0 md:block" />

        {/* Mobile: botão menu */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text-muted transition hover:bg-surface-elevated hover:text-text-primary md:hidden"
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border-subtle bg-surface/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2 px-4 py-4">
            <SearchBar onSearch={(s) => { setSearch(s); setMobileMenuOpen(false); }} />
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-surface-elevated hover:text-text-primary"
                activeProps={{ className: 'text-accent bg-accent-soft' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

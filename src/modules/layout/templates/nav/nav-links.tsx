'use client'

import { usePathname } from 'next/navigation'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

const links = [
  { label: 'Collections', href: '/store' },
  { label: 'Heritage', href: '/heritage' },
  { label: 'Journal', href: '/journal' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden medium:flex items-center space-x-10">
      {links.map(({ label, href }) => {
        const active = pathname.includes(href)

        return (
          <LocalizedClientLink
            key={label}
            href={href}
            className={[
              'tracking-tight transition-colors font-inter',
              active
                ? 'text-cyan-600 font-semibold border-b-2 border-cyan-500 pb-1'
                : 'text-zinc-500 hover:text-zinc-900',
            ].join(' ')}
          >
            {label}
          </LocalizedClientLink>
        )
      })}
    </nav>
  )
}

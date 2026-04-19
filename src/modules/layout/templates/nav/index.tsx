import Image from 'next/image'
import { getCollectionsList } from '@lib/data/collections'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import NavActions from './nav-actions'
import NavMobileMenu from './nav-mobile-menu'
import { NavLinks } from './nav-links'

export default async function NavWrapper({ countryCode }: { countryCode: string }) {
  const { collections } = await getCollectionsList()
  const cols = collections ?? []

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center w-full px-8 h-20 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <LocalizedClientLink href="/">
          <Image src="/logo.png" alt="Aevuno" width={100} height={40} className="object-contain" />
        </LocalizedClientLink>

        {/* Desktop nav links */}
        <NavLinks />

        {/* Right: cart + account + mobile trigger */}
        <div className="flex items-center gap-2">
          <NavActions />
          <NavMobileMenu collections={cols} />
        </div>

      </div>
    </header>
  )
}

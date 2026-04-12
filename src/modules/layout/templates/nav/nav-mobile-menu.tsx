'use client'

import { useState } from 'react'
import { StoreCollection } from '@medusajs/types'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function NavMobileMenu({
  collections,
}: {
  collections: StoreCollection[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger trigger */}
      <button
        className="medium:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <span className="block w-5 h-px bg-on-surface" />
        <span className="block w-5 h-px bg-on-surface" />
        <span className="block w-3 h-px bg-on-surface" />
      </button>

      {/* Fullscreen overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-surface flex flex-col p-8">
          <button
            className="self-end text-on-surface text-2xl mb-12"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav className="flex flex-col gap-8">
            <LocalizedClientLink
              href="/store"
              className="text-3xl font-bold text-on-surface"
              onClick={() => setOpen(false)}
            >
              Collections
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/heritage"
              className="text-3xl font-bold text-on-surface"
              onClick={() => setOpen(false)}
            >
              Heritage
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/blog"
              className="text-3xl font-bold text-on-surface"
              onClick={() => setOpen(false)}
            >
              Journal
            </LocalizedClientLink>
          </nav>
        </div>
      )}
    </>
  )
}

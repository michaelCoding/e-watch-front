import Image from 'next/image'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import {
  VisaIcon,
  MastercardIcon,
  MaestroIcon,
  StripeIcon,
  PayPalIcon,
} from '@modules/common/icons'

export default function CheckoutFooter() {
  return (
    <footer className="bg-[#1c1c1a] text-[#f7f4ef]">
      <div className="content-container py-8">
        <div className="flex flex-col medium:flex-row items-start medium:items-center justify-between gap-6">

          {/* Brand + copyright */}
          <div className="flex flex-col gap-1">
            <Image src="/logo.png" alt="Aevuno" width={80} height={32} className="object-contain" />
            <p className="text-xs text-[#f7f4ef]/30">
              © {new Date().getFullYear()} Aevuno. Discover what feels right.
            </p>
          </div>

          {/* Payment icons */}
          <div className="flex items-center gap-2 opacity-60">
            <VisaIcon />
            <MastercardIcon />
            <MaestroIcon />
            <StripeIcon />
            <PayPalIcon />
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {[
              { href: '/privacy-policy', label: 'Privacy' },
              { href: '/terms-and-conditions', label: 'Terms' },
            ].map(({ href, label }) => (
              <LocalizedClientLink
                key={href}
                href={href}
                className="text-xs text-[#f7f4ef]/30 hover:text-[#f7f4ef]/70 transition-colors"
              >
                {label}
              </LocalizedClientLink>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}

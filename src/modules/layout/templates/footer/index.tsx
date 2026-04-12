import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function Footer() {
  return (
    <footer className="w-full py-16 px-8 mt-20 bg-zinc-50">
      <div className="grid grid-cols-1 medium:grid-cols-4 gap-12 max-w-7xl mx-auto">

        {/* Brand */}
        <div className="space-y-6">
          <div className="font-black text-xl text-zinc-900 uppercase tracking-tighter">AEVUM</div>
          <p className="text-zinc-400 text-xs tracking-widest uppercase leading-loose">
            Precision instruments for the modern curator of moments.
          </p>
        </div>

        {/* Support */}
        <div className="flex flex-col space-y-4">
          <h5 className="text-zinc-900 font-bold text-sm tracking-widest uppercase">Support</h5>
          <LocalizedClientLink
            href="/privacy-policy"
            className="text-zinc-400 hover:text-zinc-900 transition-all duration-200 underline underline-offset-4 decoration-cyan-500 text-xs tracking-widest uppercase"
          >
            Privacy Policy
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/terms-and-conditions"
            className="text-zinc-400 hover:text-zinc-900 transition-all duration-200 text-xs tracking-widest uppercase"
          >
            Terms of Service
          </LocalizedClientLink>
        </div>

        {/* Brand links */}
        <div className="flex flex-col space-y-4">
          <h5 className="text-zinc-900 font-bold text-sm tracking-widest uppercase">Brand</h5>
          <LocalizedClientLink
            href="/store"
            className="text-zinc-400 hover:text-zinc-900 transition-all duration-200 text-xs tracking-widest uppercase"
          >
            Regional Settings
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/account"
            className="text-zinc-400 hover:text-zinc-900 transition-all duration-200 text-xs tracking-widest uppercase"
          >
            Newsletter Subscription
          </LocalizedClientLink>
        </div>

        {/* Social */}
        <div className="flex flex-col space-y-4">
          <h5 className="text-zinc-900 font-bold text-sm tracking-widest uppercase">Social</h5>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-primary transition-colors">
              share
            </span>
            <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-primary transition-colors">
              language
            </span>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-200">
        <p className="text-xs tracking-widest uppercase text-zinc-400">
          © {new Date().getFullYear()} AEVUM. THE ART OF PRECISION.
        </p>
      </div>
    </footer>
  )
}

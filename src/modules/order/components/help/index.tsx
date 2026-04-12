import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant mb-3">
        Need help from our studio?
      </p>
      <div className="flex gap-6 text-sm">
        <LocalizedClientLink
          href="/contact"
          className="text-on-surface underline underline-offset-4 decoration-outline-variant hover:decoration-on-surface transition-colors"
        >
          Contact us
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/shipping-returns"
          className="text-on-surface underline underline-offset-4 decoration-outline-variant hover:decoration-on-surface transition-colors"
        >
          Shipping &amp; Returns
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help

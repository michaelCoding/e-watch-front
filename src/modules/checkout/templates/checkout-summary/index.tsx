import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-4 py-8 small:py-0">
      <div className="bg-surface rounded-2xl border border-outline-variant p-6 flex flex-col gap-5">
        <h2 className="font-bold text-[20px] text-on-surface">Your Selection</h2>

        {/* Items preview */}
        <div>
          <ItemsPreviewTemplate items={cart?.items} />
        </div>

        {/* Totals */}
        <div className="border-t border-outline-variant pt-4">
          <CartTotals totals={cart} />
        </div>

        {/* Discount code */}
        <DiscountCode cart={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary

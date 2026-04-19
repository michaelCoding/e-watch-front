"use client"

import useToggleState from "@lib/hooks/use-toggle-state"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Spinner } from "@modules/common/icons/spinner"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"

const StepBadge = ({
  num,
  active,
  completed,
}: {
  num: string
  active: boolean
  completed: boolean
}) => (
  <div
    className={[
      "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold transition-all",
      completed
        ? "bg-[#d4ede4] text-[#2d6b4f]"
        : active
        ? "bg-primary text-white"
        : "bg-[#e8e4dc] text-[#9b9590]",
    ].join(" ")}
  >
    {completed ? (
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      num
    )}
  </div>
)

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"
  const completed = !!(cart?.shipping_address && !isOpen)

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    try {
      const formData = new FormData(e.currentTarget)
      const sameAsBillingValue = formData.get("same_as_billing")

      const shipping_address = {
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        company: formData.get("shipping_address.company"),
        postal_code: formData.get("shipping_address.postal_code"),
        city: formData.get("shipping_address.city"),
        country_code: formData.get("shipping_address.country_code"),
        province: formData.get("shipping_address.province"),
        phone: formData.get("shipping_address.phone"),
      }

      const billing_address = sameAsBillingValue === "on"
        ? shipping_address
        : {
            first_name: formData.get("billing_address.first_name"),
            last_name: formData.get("billing_address.last_name"),
            address_1: formData.get("billing_address.address_1"),
            address_2: "",
            company: formData.get("billing_address.company"),
            postal_code: formData.get("billing_address.postal_code"),
            city: formData.get("billing_address.city"),
            country_code: formData.get("billing_address.country_code"),
            province: formData.get("billing_address.province"),
            phone: formData.get("billing_address.phone"),
          }

      const res = await fetch('/api/cart/set-addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping_address,
          billing_address,
          email: formData.get("email"),
          same_as_billing: sameAsBillingValue,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Failed to set addresses')
        return
      }

      if (data.redirectUrl) {
        router.push(data.redirectUrl)
      }
    } catch (err: any) {
      setMessage(err.message || 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* ── Section header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <StepBadge num="01" active={isOpen} completed={completed} />
          <h2
            className={[
              "font-bold text-[20px] leading-none transition-colors",
              isOpen || completed ? "text-on-surface" : "text-[#9b9590]",
            ].join(" ")}
          >
            Shipping Address
          </h2>
        </div>
        {completed && (
          <button
            onClick={handleEdit}
            className="text-xs text-primary hover:underline transition-colors"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>

      {/* ── Open (form) state ── */}
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <div className="flex items-center gap-3 pb-6 pt-8">
                  <div className="w-7 h-7 rounded-full bg-[#e8e4dc] flex items-center justify-center text-xs font-semibold text-[#9b9590]">
                    ↳
                  </div>
                  <h2 className="font-bold text-[18px] text-on-surface">
                    Billing Address
                  </h2>
                </div>
                <BillingAddress cart={cart} />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="submit-address-button"
              className={[
                "w-full py-3.5 bg-[#1c1c1a] text-white text-sm font-semibold rounded-xl mt-6",
                "hover:bg-[#2d2d2a] transition-all duration-200",
                "flex items-center justify-center gap-2",
                "disabled:opacity-60 disabled:cursor-wait",
              ].join(" ")}
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Continue to delivery
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        /* ── Closed (summary) state ── */
        <div className="text-sm text-on-surface-variant">
          {cart && cart.shipping_address ? (
            <div className="flex items-start gap-8">
              <div className="flex flex-col gap-0.5" data-testid="shipping-address-summary">
                <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  Ship to
                </p>
                <p>{cart.shipping_address.first_name} {cart.shipping_address.last_name}</p>
                <p>{cart.shipping_address.address_1} {cart.shipping_address.address_2}</p>
                <p>{cart.shipping_address.postal_code}, {cart.shipping_address.city}</p>
                <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
              </div>

              <div className="flex flex-col gap-0.5" data-testid="shipping-contact-summary">
                <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  Contact
                </p>
                <p>{cart.shipping_address.phone}</p>
                <p>{cart.email}</p>
              </div>

              <div className="flex flex-col gap-0.5" data-testid="billing-address-summary">
                <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  Billing
                </p>
                {sameAsBilling ? (
                  <p className="text-[#9b9590]">Same as shipping</p>
                ) : (
                  <>
                    <p>{cart.billing_address?.first_name} {cart.billing_address?.last_name}</p>
                    <p>{cart.billing_address?.address_1} {cart.billing_address?.address_2}</p>
                    <p>{cart.billing_address?.postal_code}, {cart.billing_address?.city}</p>
                    <p>{cart.billing_address?.country_code?.toUpperCase()}</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}

      <div className="h-px bg-outline-variant mt-8" />
    </div>
  )
}

export default Addresses

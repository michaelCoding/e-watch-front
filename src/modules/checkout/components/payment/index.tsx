"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { CreditCard } from "@medusajs/icons"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"

import PaymentContainer from "@modules/checkout/components/payment-container"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"

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

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(activeSession?.provider_id)
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const completed = !isOpen && paymentReady

  const useOptions: StripeCardElementOptions = useMemo(
    () => ({
      style: {
        base: {
          fontFamily: "inherit",
          color: "#1c1c1a",
          "::placeholder": { color: "#9b9590" },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-white border border-outline-variant rounded-xl appearance-none focus:outline-none focus:border-primary transition-colors",
      },
    }),
    []
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession

      if (!activeSession) {
        const res = await fetch('/api/cart/initiate-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartId: cart.id,
            providerId: selectedPaymentMethod,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Failed to initiate payment session')
        }
        router.refresh()
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          { scroll: false }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div>
      {/* ── Section header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <StepBadge num="03" active={isOpen} completed={!!completed} />
          <h2
            className={[
              "font-bold text-[20px] leading-none transition-colors",
              isOpen || completed ? "text-on-surface" : "text-[#9b9590]",
            ].join(" ")}
          >
            Payment
          </h2>
        </div>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="text-xs text-primary hover:underline transition-colors"
            data-testid="edit-payment-button"
          >
            Edit
          </button>
        )}
      </div>

      {/* ── Open state ── */}
      <div className={isOpen ? "block" : "hidden"}>
        {!paidByGiftcard && availablePaymentMethods?.length && (
          <>
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={(value: string) => setSelectedPaymentMethod(value)}
            >
              {availablePaymentMethods
                .sort((a, b) => (a.provider_id > b.provider_id ? 1 : -1))
                .map((paymentMethod) => (
                  <PaymentContainer
                    paymentInfoMap={paymentInfoMap}
                    paymentProviderId={paymentMethod.id}
                    key={paymentMethod.id}
                    selectedPaymentOptionId={selectedPaymentMethod}
                  />
                ))}
            </RadioGroup>

            {isStripe && stripeReady && (
              <div className="mt-4 p-4 bg-white border border-outline-variant rounded-xl">
                <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-3">
                  Card details
                </p>
                <CardElement
                  options={useOptions as StripeCardElementOptions}
                  onChange={(e) => {
                    setCardBrand(
                      e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                    )
                    setError(e.error?.message || null)
                    setCardComplete(e.complete)
                  }}
                />
              </div>
            )}
          </>
        )}

        {paidByGiftcard && (
          <div className="p-4 bg-surface border border-outline-variant rounded-xl">
            <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-1">
              Payment method
            </p>
            <p className="text-sm text-on-surface-variant" data-testid="payment-method-summary">
              Gift card
            </p>
          </div>
        )}

        <ErrorMessage error={error} data-testid="payment-method-error-message" />

        <button
          onClick={handleSubmit}
          disabled={
            isLoading ||
            (isStripe && !cardComplete) ||
            (!selectedPaymentMethod && !paidByGiftcard)
          }
          className="w-full py-3.5 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6 hover:opacity-90 transition-opacity duration-200"
          style={{ background: "linear-gradient(135deg, #006875 0%, #00e5ff 100%)" }}
          data-testid="submit-payment-button"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {!activeSession && isStripeFunc(selectedPaymentMethod)
                ? "Enter card details"
                : "Continue to review"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </div>

      {/* ── Closed (summary) state ── */}
      <div className={isOpen ? "hidden" : "block"}>
        {cart && paymentReady && activeSession ? (
          <div className="flex gap-8 text-sm text-on-surface-variant">
            <div data-testid="payment-method-summary">
              <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                Method
              </p>
              <p>{paymentInfoMap[selectedPaymentMethod]?.title || selectedPaymentMethod}</p>
            </div>
            <div data-testid="payment-details-summary">
              <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                Details
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-5 flex items-center justify-center bg-surface-container-low rounded">
                  {paymentInfoMap[selectedPaymentMethod]?.icon || <CreditCard className="w-3 h-3 text-[#9b9590]" />}
                </div>
                <span>
                  {isStripeFunc(selectedPaymentMethod) && cardBrand
                    ? cardBrand
                    : "Confirmed"}
                </span>
              </div>
            </div>
          </div>
        ) : paidByGiftcard ? (
          <div className="text-sm text-on-surface-variant" data-testid="payment-method-summary">
            <p className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
              Method
            </p>
            <p>Gift card</p>
          </div>
        ) : null}
      </div>

      <div className="h-px bg-outline-variant mt-8" />
    </div>
  )
}

export default Payment

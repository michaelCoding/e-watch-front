"use client"

import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import ErrorMessage from "../error-message"
import { Spinner } from "@modules/common/icons/spinner"
import { HttpTypes } from "@medusajs/types"
import { isManual, isPaypal, isStripe } from "@lib/constants"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PlaceOrderButton = ({
  disabled,
  loading,
  onClick,
  dataTestId,
}: {
  disabled: boolean
  loading: boolean
  onClick?: () => void
  dataTestId?: string
}) => (
  <button
    disabled={disabled || loading}
    onClick={onClick}
    type={onClick ? "button" : "submit"}
    data-testid={dataTestId}
    className="w-full py-4 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-200"
    style={{ background: "linear-gradient(135deg, #006875 0%, #00e5ff 100%)" }}
  >
    {loading ? (
      <Spinner />
    ) : (
      <>
        Place order
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </>
    )}
  </button>
)

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    case isPaypal(paymentSession?.provider_id):
      return (
        <PayPalPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    default:
      return (
        <PlaceOrderButton disabled loading={false} dataTestId={dataTestId} />
      )
  }
}

const GiftCardPaymentButton = () => {
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleOrder = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/cart/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.redirectUrl) router.push(data.redirectUrl)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PlaceOrderButton
      disabled={false}
      loading={submitting}
      onClick={handleOrder}
      dataTestId="submit-order-button"
    />
  )
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const onPaymentCompleted = async () => {
    try {
      const res = await fetch('/api/cart/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.redirectUrl) router.push(data.redirectUrl)
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent
          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }
          setErrorMessage(error.message || null)
          return
        }
        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }
      })
  }

  return (
    <>
      <PlaceOrderButton
        disabled={(!stripe || !elements) || notReady}
        loading={submitting}
        onClick={handlePayment}
        dataTestId={dataTestId}
      />
      <ErrorMessage error={errorMessage} data-testid="stripe-payment-error-message" />
    </>
  )
}

const PayPalPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const onPaymentCompleted = async () => {
    try {
      const res = await fetch('/api/cart/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.redirectUrl) router.push(data.redirectUrl)
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`An error occurred, status: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`An unknown error occurred, please try again.`)
        setSubmitting(false)
      })
  }

  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer()

  if (isPending) {
    return <Spinner />
  }

  if (isRejected) {
    return (
      <ErrorMessage
        error="PayPal failed to load. Check that NEXT_PUBLIC_PAYPAL_CLIENT_ID is set correctly."
        data-testid="paypal-payment-error-message"
      />
    )
  }

  if (isResolved) {
    return (
      <>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async () => session?.data.id as string}
          onApprove={handlePayment}
          disabled={notReady || submitting || isPending}
          data-testid={dataTestId}
        />
        <ErrorMessage error={errorMessage} data-testid="paypal-payment-error-message" />
      </>
    )
  }

  return null
}

const ManualTestPaymentButton = ({
  notReady,
  "data-testid": dataTestId,
}: {
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const onPaymentCompleted = async () => {
    try {
      const res = await fetch('/api/cart/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.redirectUrl) router.push(data.redirectUrl)
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <>
      <PlaceOrderButton
        disabled={notReady}
        loading={submitting}
        onClick={handlePayment}
        dataTestId={dataTestId ?? "submit-order-button"}
      />
      <ErrorMessage error={errorMessage} data-testid="manual-payment-error-message" />
    </>
  )
}

export default PaymentButton

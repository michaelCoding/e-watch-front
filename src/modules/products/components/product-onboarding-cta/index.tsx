import { cookies } from "next/headers"

const ProductOnboardingCta = () => {
  const isOnboarding = cookies().get("_medusa_onboarding")?.value === "true"

  if (!isOnboarding) {
    return null
  }

  return (
    <div className="max-w-4xl h-full bg-ui-bg-subtle w-full p-8 rounded">
      <div className="flex flex-col gap-y-4 center">
        <p className="text-ui-fg-base text-xl">
          Your demo product was successfully created! 🎉
        </p>
        <p className="text-ui-fg-subtle text-small-regular">
          You can now continue setting up your store in the admin.
        </p>
        <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
          <button className="w-full bg-ui-button-inverted text-ui-fg-on-inverted px-4 py-2 rounded">
            Continue setup in admin
          </button>
        </a>
      </div>
    </div>
  )
}

export default ProductOnboardingCta

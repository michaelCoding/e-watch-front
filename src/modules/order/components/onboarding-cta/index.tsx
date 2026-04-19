"use client"

import { resetOnboardingState } from "@lib/data/onboarding"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  return (
    <div className="max-w-4xl h-full bg-ui-bg-subtle w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <span className="text-ui-fg-base text-xl">
          Your test order was successfully created! 🎉
        </span>
        <span className="text-ui-fg-subtle text-small-regular">
          You can now complete setting up your store in the admin.
        </span>
        <button
          className="w-fit"
          onClick={() => resetOnboardingState(orderId)}
        >
          Complete setup in admin
        </button>
      </div>
    </div>
  )
}

export default OnboardingCta

"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import { HttpTypes } from "@medusajs/types"

const AddAddress = ({ region }: { region: HttpTypes.StoreRegion }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const data = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      company: formData.get("company") as string,
      address_1: formData.get("address_1") as string,
      address_2: formData.get("address_2") as string,
      city: formData.get("city") as string,
      postal_code: formData.get("postal_code") as string,
      province: formData.get("province") as string,
      country_code: formData.get("country_code") as string,
      phone: formData.get("phone") as string,
    }

    try {
      const res = await fetch('/api/account/add-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to add address')
      setIsOpen(false)
      formRef.current?.reset()
      router.refresh()
    } catch (err: any) {
      setError(err.message || err.toString())
    }
  }

  return (
    <div
      className="rounded-xl border border-dashed border-[#d4cfc7] bg-surface overflow-hidden transition-all duration-300"
      data-testid="add-address-container"
    >
      {/* Collapsed state — add button */}
      <div className={`transition-all duration-300 ${isOpen ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-full min-h-[140px] p-6 flex flex-col items-center justify-center gap-3 group"
          data-testid="add-address-button"
        >
          <div className="w-10 h-10 rounded-full border border-[#d4cfc7] flex items-center justify-center text-[#9b9590] group-hover:border-primary group-hover:text-primary transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-bold text-[14px] text-[#9b9590] group-hover:text-on-surface transition-colors">
            Add new address
          </span>
        </button>
      </div>

      {/* Expanded state — inline form */}
      <div className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-bold text-[15px] text-on-surface">New Address</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9b9590] hover:text-on-surface transition-colors p-1"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" name="first_name" required autoComplete="given-name"
                data-testid="first-name-input" />
              <Input label="Last name" name="last_name" required autoComplete="family-name"
                data-testid="last-name-input" />
            </div>
            <Input label="Company" name="company" autoComplete="organization"
              data-testid="company-input" />
            <Input label="Address" name="address_1" required autoComplete="address-line1"
              data-testid="address-1-input" />
            <Input label="Apartment, suite, etc." name="address_2" autoComplete="address-line2"
              data-testid="address-2-input" />
            <div className="grid grid-cols-[120px_1fr] gap-3">
              <Input label="Postal code" name="postal_code" required autoComplete="postal-code"
                data-testid="postal-code-input" />
              <Input label="City" name="city" required autoComplete="locality"
                data-testid="city-input" />
            </div>
            <Input label="Province / State" name="province" autoComplete="address-level1"
              data-testid="state-input" />
            <CountrySelect name="country_code" region={region} required autoComplete="country"
              data-testid="country-select" />
            <Input label="Phone" name="phone" autoComplete="phone"
              data-testid="phone-input" />

            {error && (
              <p className="text-xs text-[#c0392b] bg-[#fef0f0] px-3 py-2 rounded-lg" data-testid="address-error">
                {error}
              </p>
            )}

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 text-sm text-on-surface-variant border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all"
                data-testid="cancel-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-sm text-white rounded-full font-semibold hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #006875 0%, #00e5ff 100%)" }}
                data-testid="save-button"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAddress

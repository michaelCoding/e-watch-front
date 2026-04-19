"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import { HttpTypes } from "@medusajs/types"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({ region, address }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
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
      const res = await fetch('/api/account/update-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addressId: address.id, ...data }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update address')
      setIsEditing(false)
      router.refresh()
    } catch (err: any) {
      setFormError(err.message || err.toString())
    }
  }

  const removeAddress = async () => {
    setRemoving(true)
    try {
      const res = await fetch('/api/account/delete-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addressId: address.id }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete address')
      router.refresh()
    } catch {
      setRemoving(false)
    }
  }

  return (
    <div
      className="group relative rounded-xl border border-outline-variant bg-surface overflow-hidden transition-all duration-300"
      style={{ boxShadow: "0 1px 4px rgba(28,28,26,0.04)" }}
      data-testid="address-container"
    >
      {/* ── View mode ── */}
      <div className={`transition-all duration-300 ${isEditing ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
        <div className="p-6 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p
                className="font-bold text-[17px] text-on-surface leading-snug"
                data-testid="address-name"
              >
                {address.first_name} {address.last_name}
              </p>
              {address.company && (
                <p className="text-xs text-[#9b9590] mt-0.5" data-testid="address-company">
                  {address.company}
                </p>
              )}
            </div>
            {/* Action buttons */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => { setIsEditing(true); setConfirmDelete(false) }}
                className="p-1.5 rounded-lg hover:bg-surface-container-low text-[#9b9590] hover:text-on-surface transition-all"
                data-testid="address-edit-button"
                title="Edit address"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M11.9 1.1a1.5 1.5 0 0 1 2.1 2.1L5.5 11.7l-3 .9.9-3L11.9 1.1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="p-1.5 rounded-lg hover:bg-[#fef0f0] text-[#9b9590] hover:text-[#c0392b] transition-all"
                data-testid="address-delete-button"
                title="Remove address"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3 4h9M6 4V2.5h3V4M5 4v8h5V4H5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Address lines */}
          <div className="text-sm text-on-surface-variant leading-relaxed space-y-0.5">
            <p data-testid="address-address">
              {address.address_1}
              {address.address_2 && `, ${address.address_2}`}
            </p>
            <p data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </p>
            <p data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </p>
            {address.phone && (
              <p className="text-[#9b9590] text-xs pt-1">{address.phone}</p>
            )}
          </div>

          {/* Confirm delete */}
          {confirmDelete && (
            <div className="mt-2 pt-4 border-t border-outline-variant flex items-center justify-between">
              <p className="text-xs text-on-surface-variant">Remove this address?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-[#9b9590] hover:text-on-surface transition-colors px-3 py-1.5"
                >
                  Cancel
                </button>
                <button
                  onClick={removeAddress}
                  disabled={removing}
                  className="text-xs text-[#c0392b] bg-[#fef0f0] hover:bg-[#fde8e8] px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                >
                  {removing ? "Removing…" : "Remove"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Edit mode ── */}
      <div className={`transition-all duration-300 ${isEditing ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-bold text-[15px] text-on-surface">Edit Address</p>
            <button
              onClick={() => setIsEditing(false)}
              className="text-[#9b9590] hover:text-on-surface transition-colors p-1"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" name="first_name" required autoComplete="given-name"
                defaultValue={address.first_name || undefined} data-testid="first-name-input" />
              <Input label="Last name" name="last_name" required autoComplete="family-name"
                defaultValue={address.last_name || undefined} data-testid="last-name-input" />
            </div>
            <Input label="Company" name="company" autoComplete="organization"
              defaultValue={address.company || undefined} data-testid="company-input" />
            <Input label="Address" name="address_1" required autoComplete="address-line1"
              defaultValue={address.address_1 || undefined} data-testid="address-1-input" />
            <Input label="Apartment, suite, etc." name="address_2" autoComplete="address-line2"
              defaultValue={address.address_2 || undefined} data-testid="address-2-input" />
            <div className="grid grid-cols-[120px_1fr] gap-3">
              <Input label="Postal code" name="postal_code" required autoComplete="postal-code"
                defaultValue={address.postal_code || undefined} data-testid="postal-code-input" />
              <Input label="City" name="city" required autoComplete="locality"
                defaultValue={address.city || undefined} data-testid="city-input" />
            </div>
            <Input label="Province / State" name="province" autoComplete="address-level1"
              defaultValue={address.province || undefined} data-testid="state-input" />
            <CountrySelect name="country_code" region={region} required autoComplete="country"
              defaultValue={address.country_code || undefined} data-testid="country-select" />
            <Input label="Phone" name="phone" autoComplete="phone"
              defaultValue={address.phone || undefined} data-testid="phone-input" />

            {formError && (
              <p className="text-xs text-[#c0392b] bg-[#fef0f0] px-3 py-2 rounded-lg">
                {formError}
              </p>
            )}

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditAddress

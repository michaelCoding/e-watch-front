"use client"

import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  regions: HttpTypes.StoreRegion[]
}

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = useState(false)
  const [errorState, setErrorState] = useState<string | false>(false)
  const router = useRouter()

  const clearState = () => {
    setSuccessState(false)
    setErrorState(false)
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const body = {
      first_name: formData.get("billing_address.first_name") as string,
      last_name: formData.get("billing_address.last_name") as string,
      company: formData.get("billing_address.company") as string,
      address_1: formData.get("billing_address.address_1") as string,
      address_2: formData.get("billing_address.address_2") as string,
      city: formData.get("billing_address.city") as string,
      postal_code: formData.get("billing_address.postal_code") as string,
      province: formData.get("billing_address.province") as string,
      country_code: formData.get("billing_address.country_code") as string,
    }

    try {
      let res: Response
      if (billingAddress?.id) {
        res = await fetch('/api/account/update-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ addressId: billingAddress.id, ...body }),
        })
      } else {
        res = await fetch('/api/account/add-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update billing address')
      setSuccessState(true)
      setErrorState(false)
      router.refresh()
    } catch (error: any) {
      setErrorState(error.toString())
      setSuccessState(false)
    }
  }

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return "No billing address"
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingAddress.country_code
      )?.label || billingAddress.country_code?.toUpperCase()

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>
          {billingAddress.first_name} {billingAddress.last_name}
        </span>
        <span>{billingAddress.company}</span>
        <span>
          {billingAddress.address_1}
          {billingAddress.address_2 ? `, ${billingAddress.address_2}` : ""}
        </span>
        <span>
          {billingAddress.postal_code}, {billingAddress.city}
        </span>
        <span>{country}</span>
      </div>
    )
  }, [billingAddress, regionOptions])

  return (
    <form onSubmit={handleSubmit} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!errorState}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              name="billing_address.first_name"
              defaultValue={billingAddress?.first_name || undefined}
              required
              data-testid="billing-first-name-input"
            />
            <Input
              label="Last name"
              name="billing_address.last_name"
              defaultValue={billingAddress?.last_name || undefined}
              required
              data-testid="billing-last-name-input"
            />
          </div>
          <Input
            label="Company"
            name="billing_address.company"
            defaultValue={billingAddress?.company || undefined}
            data-testid="billing-company-input"
          />
          <Input
            label="Address"
            name="billing_address.address_1"
            defaultValue={billingAddress?.address_1 || undefined}
            required
            data-testid="billing-address-1-input"
          />
          <Input
            label="Apartment, suite, etc."
            name="billing_address.address_2"
            defaultValue={billingAddress?.address_2 || undefined}
            data-testid="billing-address-2-input"
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postal code"
              name="billing_address.postal_code"
              defaultValue={billingAddress?.postal_code || undefined}
              required
              data-testid="billing-postcal-code-input"
            />
            <Input
              label="City"
              name="billing_address.city"
              defaultValue={billingAddress?.city || undefined}
              required
              data-testid="billing-city-input"
            />
          </div>
          <Input
            label="Province"
            name="billing_address.province"
            defaultValue={billingAddress?.province || undefined}
            data-testid="billing-province-input"
          />
          <NativeSelect
            name="billing_address.country_code"
            defaultValue={billingAddress?.country_code || undefined}
            required
            data-testid="billing-country-code-select"
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option?.value}>
                  {option?.label}
                </option>
              )
            })}
          </NativeSelect>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileBillingAddress

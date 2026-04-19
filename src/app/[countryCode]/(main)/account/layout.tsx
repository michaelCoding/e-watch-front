export const runtime = 'edge';

import { getCustomer } from "@lib/data/customer"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  let customer = null
  try {
    customer = await getCustomer()
    console.log("[account/layout] getCustomer success:", !!customer)
  } catch (e) {
    console.error("[account/layout] getCustomer error:", e)
  }

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
    </AccountLayout>
  )
}

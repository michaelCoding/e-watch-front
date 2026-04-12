import CartButton from '@modules/layout/components/cart-button'
import ProfileButton from '@modules/layout/components/profile-button'

export default function NavActions() {
  return (
    <div className="flex items-center space-x-6 text-on-surface-variant">
      <ProfileButton />
      <CartButton />
    </div>
  )
}

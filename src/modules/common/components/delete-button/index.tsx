"use client"
import { Spinner, Trash } from "@medusajs/icons"
import clsx from "clsx"
import { useState } from "react"
import { useRouter } from "next/navigation"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const res = await fetch('/api/cart/delete-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineId: id }),
      })
      if (res.ok) {
        router.refresh()
      }
    } catch {
      // swallow errors silently, consistent with prior behaviour
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton

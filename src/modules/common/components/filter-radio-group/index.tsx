"use client"
import { EllipseMiniSolid } from "@medusajs/icons"
import clsx from "clsx"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <span className="txt-compact-small-plus text-ui-fg-muted">{title}</span>
      <div data-testid={dataTestId} onChange={handleChange}>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clsx("flex gap-x-2 items-center", {
              "ml-[-23px]": i.value === value,
            })}
          >
            {i.value === value && <EllipseMiniSolid />}
            <div
              className="hidden peer"
              id={i.value}
            />
            <label
              htmlFor={i.value}
              className={clsx(
                "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
                {
                  "text-ui-fg-base": i.value === value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterRadioGroup

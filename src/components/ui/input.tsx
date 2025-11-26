import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border-2 border-metal-gray/30 bg-graphite-light/50 px-4 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-metal-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-blue focus-visible:ring-offset-2 focus-visible:border-industrial-blue disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 backdrop-blur-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

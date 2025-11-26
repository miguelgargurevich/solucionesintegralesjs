import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border-2 border-metal-gray/30 bg-graphite-light/50 px-4 py-3 text-sm text-white ring-offset-background placeholder:text-metal-gray-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-blue focus-visible:ring-offset-2 focus-visible:border-industrial-blue disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 backdrop-blur-sm resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

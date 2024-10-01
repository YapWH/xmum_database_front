import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-2"
    const variantStyles = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 border-primary",
      outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground",
    }

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
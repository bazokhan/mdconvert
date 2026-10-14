import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "soft";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    children,
    className = "",
    disabled,
    ...props
  },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium select-none whitespace-nowrap transition-[background,color,box-shadow,transform] duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-75 disabled:pointer-events-none rounded-md";

  const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "h-8 px-2.5 text-sm gap-1.5",
    md: "h-9 px-4 text-sm gap-2",
    lg: "h-11 px-5 text-base gap-2.5",
    icon: "h-9 w-9 p-0 gap-0",
  };

  const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-primary text-primary-fg hover:bg-primary-hover active:scale-[0.98] shadow-soft",
    secondary:
      "bg-muted/15 text-foreground hover:bg-muted/25 active:scale-[0.98]",
    outline:
      "border border-border bg-surface text-foreground hover:bg-muted/10 hover:border-border-strong",
    ghost: "bg-transparent text-muted hover:text-foreground hover:bg-muted/10",
    soft: "bg-primary/10 text-primary hover:bg-primary/15 active:scale-[0.98]",
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span className="sr-only">Loading</span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
});

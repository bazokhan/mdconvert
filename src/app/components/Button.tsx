interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "soft";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-md";

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-5 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary-hover active:scale-[0.98] shadow-soft",
    secondary:
      "bg-muted/20 text-foreground hover:bg-muted/30 active:scale-[0.98]",
    outline:
      "border border-border bg-transparent text-foreground hover:bg-muted/10 hover:border-border-strong",
    ghost: "bg-transparent text-muted hover:text-foreground hover:bg-muted/10",
    soft: "bg-primary/10 text-primary hover:bg-primary/15 active:scale-[0.98]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant ?? "primary"]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

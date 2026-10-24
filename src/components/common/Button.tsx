import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  title?: string;
}

interface ButtonAsButton extends BaseProps {
  to?: undefined;
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
}

interface ButtonAsLink extends BaseProps {
  to: string;
  href?: undefined;
  onClick?: () => void;
}

interface ButtonAsAnchor extends BaseProps {
  href: string;
  to?: undefined;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  primary: "bg-cocoa text-cream hover:bg-cocoa-dark",
  secondary: "bg-orange text-charcoal hover:bg-orange-dark",
  outline: "border-2 border-cocoa text-cocoa hover:bg-cocoa hover:text-cream",
  ghost: "text-cocoa hover:bg-cocoa/10"
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    icon,
    disabled,
    title
  } = props;

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes} title={title} onClick={props.onClick}>
        {icon}
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const isExternal = props.external ?? true;
    return (
      <a
        href={props.href}
        className={classes}
        title={title}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type ?? "button"}
      className={classes}
      disabled={disabled}
      title={title}
      onClick={(props as ButtonAsButton).onClick}
    >
      {icon}
      {children}
    </button>
  );
}

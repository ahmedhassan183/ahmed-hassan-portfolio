import type { ComponentPropsWithoutRef } from "react";

export function Button({ className = "", variant = "primary", ...props }: ComponentPropsWithoutRef<"a"> & { variant?: "primary" | "secondary" }) {
  return <a className={`button button--${variant} ${className}`} {...props} />;
}

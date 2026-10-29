import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./cta.module.css";

type CTAProps = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  tone?: "brown" | "gold" | "ivory";
  unavailable?: boolean;
};

/** Editorial calls to action. Navigation remains a link; unavailable purchases are disabled buttons. */
export function CTA({ children, variant = "primary", tone = "brown", unavailable = false, className = "", ...props }: CTAProps) {
  const classes = `${styles.cta} ${styles[variant]} ${styles[tone]} ${className}`;
  if (unavailable) {
    return <button type="button" className={classes} disabled>{children}</button>;
  }
  return <a {...props} className={classes}>{children}</a>;
}

"use client";
import React from "react";
import TransitionLink from "@/components/TransitionLink";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, children, ...props }, ref) => {
    const baseStyles = "group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]";
    
    const variants = {
      primary: "bg-black text-white hover:bg-orange-600 hover:text-white border border-transparent shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(249,115,22,0.5)]",
      outline: "bg-transparent text-black border border-black/30 hover:bg-orange-600 hover:text-white hover:border-transparent hover:shadow-[0_15px_40px_-10px_rgba(249,115,22,0.4)]",
    };

    const content = (
      <>
        <span className="relative z-10">{children}</span>
        <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </>
    );

    if (href) {
      return (
        <TransitionLink href={href} className={cn(baseStyles, variants[variant], className)}>
          {content}
        </TransitionLink>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-medium",
  variants: {
    color: {
      "foreground-dark": "dark:dark-main light-main",
      "foreground-light": "dark:dark-main light-main",
      orange: "dark:text-dark-primary text-light-primary",
      yellow: "dark:text-dark-secondary text-light-secondary",
      green: "dark:text-dark-primary text-light-primary",
      brown: "dark:text-dark-secondary text-light-secondary",
    },
    size: {
      card: "text-lg md:text-lg lg:text-xl xl:text-xl",
      sm: "text-xl xl:text-3xl lg:text-2xl md:text-2xl leading-4",
      md: "text-2xl xl:text-3xl lg:text-2xl sm:text-xl leading-4",
      lg: "text-2xl xl:text-3xl md:text-2xl sm:text-xl leading-4",
      xl: "text-3xl lg:text-2xl md:text-2xl sm:text-xl leading-4",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
    color: "orange",
  },
});

export const subtitle = tv({
  base: "tracking-tight font-medium",
  variants: {
    color: {
      "foreground-dark": "dark:dark-main light-main",
      "foreground-light": "dark:dark-main light-main",
      orange: "dark:text-dark-primary text-light-primary",
      yellow: "dark:text-dark-secondary text-light-secondary",
      green: "dark:text-dark-primary text-light-primary",
      brown: "dark:text-dark-secondary text-light-secondary",
    },
    size: {
      card: "text-lg md:text-lg lg:text-xl xl:text-xl",
      sm: "text-sm leading-4",
      md: "text-sm leading-4",
      lg: "text-sm leading-4",
      xl: "text-sm leading-4",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "foreground-dark",
  },
});

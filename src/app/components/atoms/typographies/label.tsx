import { twMerge } from "tailwind-merge";
import { FC, HTMLAttributes } from "react";

interface TextLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const TextLabel: FC<TextLabelProps> = ({ children, className, ...restProps }) => {
  return (
    <p
      className={twMerge("font-medium text-base my-2", className)}
      {...restProps}
    >
      {children}
    </p>
  );
};

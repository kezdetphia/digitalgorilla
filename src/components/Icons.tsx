import { LucideProps } from "lucide-react";

interface LogoProps extends LucideProps {
  className?: string;
}

export const Icons = {
  logo: ({ className, ...props }: LogoProps) => (
    <svg
      {...props}
      viewBox="0 0 512 512"
      height="500" // 2.5 times larger than 200
      width="500" // 2.5 times larger than 200
      xmlns="http://www.w3.org/2000/svg"
      className={`h-20 w-20 ${className}`} // Adjust size using Tailwind CSS classes
    >
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgb(0,0,0)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(0,0,255)" stopOpacity="1" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="250" r="200" fill="url(#grad1)" />
      <path
        d="M 250 250 Q 200 200 150 250 Q 100 300 150 350 Q 200 400 250 350 Q 300 300 250 250 Z"
        fill="white"
      />
      <path
        d="M 250 250 Q 300 200 350 250 Q 400 300 350 350 Q 300 400 250 350 Q 200 300 250 250 Z"
        fill="white"
      />
      <circle cx="200" cy="200" r="15" fill="black" />
      <circle cx="300" cy="200" r="15" fill="black" />
      <path
        d="M 250 250 Q 250 275 225 300 Q 200 325 225 350 Q 250 375 275 350 Q 300 325 275 300 Q 250 275 250 250 Z"
        fill="black"
      />
    </svg>
  ),
};

import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <path
          d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
          fill="url(#logo-gradient)"
        />
        <defs>
          <linearGradient id="logo-gradient" x1="10" y1="0" x2="10" y2="20">
            <stop stopColor="#9B99FE" />
            <stop offset="1" stopColor="#2BC8B7" />
          </linearGradient>
        </defs>
      </svg>
      <h2 className="text-xl font-bold text-foreground">College Tracker</h2>
    </div>
  )
}

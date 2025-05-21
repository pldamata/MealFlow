import { Utensils } from "lucide-react"

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 24, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Utensils size={size} className="text-primary" />
      <span className="font-bold text-xl">MealFlow</span>
    </div>
  )
}

import { useCountUp } from "@/hooks/use-count-up"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({
  end,
  suffix = "",
  label,
  duration = 2000,
}: AnimatedCounterProps) {
  const { count, ref } = useCountUp(end, duration)

  return (
    <div className="stat-card" ref={ref}>
      <strong>
        {String(count).padStart(2, "0")}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

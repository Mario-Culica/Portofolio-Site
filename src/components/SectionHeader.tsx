import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: string
  action?: ReactNode
}

export default function SectionHeader({ eyebrow, title, description, action }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
        </div>
        <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] text-text-primary">{title}</h2>
        {description && <p className="mt-3 max-w-sm text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}

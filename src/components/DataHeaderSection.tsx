import { useState } from 'react'
import './DataHeaderSection.css'

interface DataHeaderSectionProps {
  title: string
}

export function DataHeaderSection({ title }: DataHeaderSectionProps) {
  return (
    <div className="paul-mfe__data-header-section">
      <h1 className="paul-mfe__data-header-title">{title}</h1>
    </div>
  )
}

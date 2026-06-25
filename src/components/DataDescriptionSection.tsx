import { useState } from 'react'
import './DataDescriptionSection.css'

interface DataDescriptionSectionProps {
  description: string
}

export function DataDescriptionSection({ description }: DataDescriptionSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="paul-mfe__data-description-section">
      <button
        className={`paul-mfe__data-description-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle description"
      >
        <span className="paul-mfe__data-description-toggle-icon">▼</span>
        <span className="paul-mfe__data-description-toggle-text">Weitere Informationen</span>
      </button>

      {isOpen && (
        <div className="paul-mfe__data-description-content">
          {description}
        </div>
      )}
    </div>
  )
}

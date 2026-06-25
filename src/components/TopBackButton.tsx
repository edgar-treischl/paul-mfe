/**
 * Top Back Button Component
 * Positioned at the very top of the page for navigation
 */

import '../styles/TopBackButton.css'

interface TopBackButtonProps {
  onBackClick: () => void
  label?: string
}

export function TopBackButton({ onBackClick, label = 'Zurück' }: TopBackButtonProps) {
  return (
    <div className="paul-mfe__top-back-container">
      <button
        onClick={onBackClick}
        className="paul-mfe__top-back-button"
        aria-label={label}
      >
        <span className="paul-mfe__top-back-arrow">←</span>
        <span className="paul-mfe__top-back-label">{label}</span>
      </button>
    </div>
  )
}

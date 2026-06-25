/**
 * App Header / Navbar Component
 * Consistent navigation across all app screens
 */

import { logo } from '../lib/utils/assets'
import '../styles/AppHeader.css'

interface AppHeaderProps {
  onLogoClick: () => void
}

export function AppHeader({ onLogoClick }: AppHeaderProps) {
  return (
    <div className="paul-mfe__app-header">
      <div className="paul-mfe__header-content">
        <div className="paul-mfe__header-left">
          <button
            onClick={onLogoClick}
            className="paul-mfe__header-logo-button"
            aria-label="Go to landing page"
          >
            <img src={logo} alt="Paul App" className="paul-mfe__header-logo" />
          </button>
        </div>
      </div>
    </div>
  )
}

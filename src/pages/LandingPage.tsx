import { HeroView } from '../components/HeroPage'
import './LandingPage.css'

interface LandingPageProps {
  onViewData: () => void
}

export function LandingPage({ onViewData }: LandingPageProps) {
  return (
    <div className="paul-mfe__landing-page">
      <HeroView />
      <div className="paul-mfe__cta-section">
        <button className="paul-mfe__btn-cta" onClick={onViewData}>
          Beispieldaten inspizieren
        </button>
      </div>
    </div>
  )
}

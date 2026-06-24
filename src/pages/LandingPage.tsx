import { HeroView } from '../components/HeroPage'

interface LandingPageProps {
  onViewData: () => void
}

export function LandingPage({ onViewData }: LandingPageProps) {
  return (
    <div className="paul-mfe paul-mfe__landing-page">
      <HeroView />
      <div className="paul-mfe__cta-section">
        <button className="paul-mfe__btn-cta" onClick={onViewData}>
          Beispieldaten inspizieren
        </button>
      </div>
    </div>
  )
}

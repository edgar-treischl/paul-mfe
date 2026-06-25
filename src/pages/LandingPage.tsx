import { HeroView } from '../components/HeroPage'
import './LandingPage.css'

interface LandingPageProps {
  onViewData: () => void
}

export function LandingPage({ onViewData }: LandingPageProps) {
  return (
    <div className="paul-mfe paul-mfe__landing-page">
      <HeroView onCTA={onViewData} />
    </div>
  )
}

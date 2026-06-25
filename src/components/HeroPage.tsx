import { memo } from 'react'
import heroPng from '../assets/paul.png';

interface HeroViewProps {
  onCTA?: () => void;
}

function HeroViewComponent({ onCTA }: HeroViewProps) {
  return (
    <div className="paul-mfe__hero-container">
      {/* Left Side: Logo and Tagline */}
      <div className="paul-mfe__hero-left">
        <div className="paul-mfe__hero-logo-wrapper">
          <img src={heroPng} alt="Paul" className="paul-mfe__hero-logo" />
        </div>
        <p className="paul-mfe__hero-tagline">Passgenaue Umfragen mit Limesurvey®</p>
      </div>
      
      {/* Right Side: Description and CTA */}
      <div className="paul-mfe__hero-right">
        <h1 className="paul-mfe__hero-title">Umfrageergebnisse erfolgreich visualisieren</h1>
        
        <p className="paul-mfe__hero-primary">
          Paul ermöglicht maßgeschneiderte Umfragen, die auf die Bedürfnisse der Schule zugeschnitten sind.
        </p>

        <p className="paul-mfe__hero-secondary">
          Die Paul-App bereitet die Umfrageergebnisse auf und stellt sie in einer übersichtlichen Form dar.
        </p>

        <div className="paul-mfe__hero-features">
          <div className="paul-mfe__feature">
            <strong>Umfang:</strong>
            <span>Gesamtauswertung</span>
          </div>
          <div className="paul-mfe__feature">
            <strong>Datenquelle:</strong>
            <span>Schuleebene</span>
          </div>
        </div>

        {onCTA && (
          <button className="paul-mfe__btn-cta paul-mfe__hero-cta" onClick={onCTA}>
            Beispieldaten inspizieren
          </button>
        )}
      </div>
    </div>
  )
}

export const HeroView = memo(HeroViewComponent)

import { memo } from 'react'
import heroPng from '../lib/utils/assets/oes.png';

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
        <p className="paul-mfe__hero-tagline">Online Evaluation System</p>
      </div>
      
      {/* Right Side: Description and CTA */}
      <div className="paul-mfe__hero-right">
        <h1 className="paul-mfe__hero-title">Herzlich Willkommen</h1>
        
        <p className="paul-mfe__hero-primary">
          Das OES (Online Evaluation System) ist ein webbasiertes Tool, das Schulen unterstützt, zentrale Befragungen aller beteiligten Personengruppen durchzuführen.
        </p>

        <p className="paul-mfe__hero-secondary">
          Die OES App bereitet alle Ergebnisse der Online Evaluation auf einem Blick auf.
        </p>

        <div className="paul-mfe__hero-features">
          <div className="paul-mfe__feature">
            <strong>Hinweis:</strong>
            <span>Diese App enthält nur fiktive Beispieldaten.</span>
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

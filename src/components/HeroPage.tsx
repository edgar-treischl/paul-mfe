import { memo } from 'react'
import heroPng from '../assets/paul.png';

function HeroViewComponent() {
  return (
    <div className="paul-mfe__hero-container">
      <div className="paul-mfe__hero-content">
        <div className="paul-mfe__hero-text">
          <p className="paul-mfe__eyebrow">Passgenaue Umfragen mit Limesurvey®</p>
          <h1>
            <span className="paul-mfe__hero-highlight">Paul</span>
          </h1>
          <p>
           Paul ermöglicht maßgeschneiderte Umfragen, die auf die Bedürfnisse der Schule zugeschnitten sind. 
          </p>

          <p>
            Die Paul-App bereitet die Umfrageergebnisse auf und stellt sie in einer übersichtlichen Form dar.
          </p>

          <div className="paul-mfe__hero-features">
            <div className="paul-mfe__feature">
              <strong>Umfang bislang:</strong>
              <p>Gesamtauswertung</p>
            </div>
            <div className="paul-mfe__feature">
              <strong>Quelle</strong>
              <p>Schuleebene</p>
            </div>
          </div>
        </div>
        <div className="paul-mfe__hero-image">
          <img src={heroPng} alt="Hero" />
        </div>
      </div>
    </div>
  )
}

export const HeroView = memo(HeroViewComponent)

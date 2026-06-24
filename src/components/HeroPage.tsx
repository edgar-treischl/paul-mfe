import { memo } from 'react'
import heroPng from '../assets/hero.png';

function HeroViewComponent() {
  return (
    <div className="paul-mfe__hero-container">
      <div className="paul-mfe__hero-content">
        <div className="paul-mfe__hero-text">
          <p className="paul-mfe__eyebrow">Bayerns Schulen in Zahlen</p>
          <h1>
            <span className="paul-mfe__hero-highlight">Klassenwiederholungen in Bayern</span>
          </h1>
          <p>
            Klassenwiederholungen geben einen wichtigen Einblick in den schulischen Erfolg und zeigen, wo Lernschwierigkeiten entstehen. 
          </p>
          <p>
            In dieser App können Sie die Entwicklung der Wiederholungsquoten in Bayern über die Jahre 2018 bis 2024 erkunden.
          </p>

          <div className="paul-mfe__hero-features">
            <div className="paul-mfe__feature">
              <strong>Wiederholungsquoten</strong>
              <p>Quer- und Längsschnitt (2018 bis 2024)</p>
            </div>
            <div className="paul-mfe__feature">
              <strong>Ergebnisse nach</strong>
              <p>Geschlecht & Migrationshintergrund</p>
            </div>
            <div className="paul-mfe__feature">
              <strong>Quelle</strong>
              <p>Bayerns Schulen in Zahlen (LfStat) </p>
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

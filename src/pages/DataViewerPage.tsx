import { StackedBarChart } from '../components/StackedBarChart'
import { AppHeader } from '../components/AppHeader'
import { TopBackButton } from '../components/TopBackButton'
import { PlotList } from '../components/PlotList'
import { ReportSection } from '../components/ReportSection'
import { DataHeaderSection } from '../components/DataHeaderSection'
import { DataDescriptionSection } from '../components/DataDescriptionSection'
import { getPlotDescriptionText } from '../lib/registries/plotDescriptionRegistry'
import type { AppState } from '../lib/types/types'
import type { MetaSet } from '../lib/types/iqb'
import metaSetsJson from '../data/meta_sets.json'

interface DataViewerPageProps {
  state: AppState
  onSelectPlot: (plotId: string) => void
  onBackClick: () => void
  onLogoClick: () => void
  onGenerateReport: () => void
  onDownloadReport: () => void
}

export function DataViewerPage({
  state,
  onSelectPlot,
  onBackClick,
  onLogoClick,
  onGenerateReport,
  onDownloadReport,
}: DataViewerPageProps) {
  return (
    <div className="paul-mfe paul-mfe__app-container">
      <AppHeader onLogoClick={onLogoClick} />
      <TopBackButton onBackClick={onBackClick} label="Zurück" />

      <div className="paul-mfe__data-viewer">
        {/* Hero Header - Full Width Title */}
        {state.schoolData && state.selectedPlot && state.schoolData.plotData && (() => {
          const plotData = state.schoolData.plotData.get(state.selectedPlot)
          return plotData ? (
            <div className="paul-mfe__hero-header">
              <DataHeaderSection title={plotData.header1} />
            </div>
          ) : null
        })()}

        <div className="paul-mfe__data-viewer-layout">
          {/* Left Sidebar */}
          <div className="paul-mfe__data-viewer-sidebar">
            <div className="paul-mfe__card">
              <div className="paul-mfe__card-header">
                <h3 className="paul-mfe__card-title">Abbildungen</h3>
              </div>
              <div className="paul-mfe__card-body">
                {state.schoolData && (
                  <>
                    <PlotList
                      plots={state.schoolData.plots}
                      selectedPlot={state.selectedPlot}
                      onSelectPlot={onSelectPlot}
                    />
                  </>
                )}

                <ReportSection
                  reportAvailable={state.reportAvailable}
                  isGeneratingReport={state.isGeneratingReport}
                  onGenerateReport={onGenerateReport}
                  onDownloadReport={onDownloadReport}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="paul-mfe__data-viewer-main">
            <div className="paul-mfe__card">
              <div className="paul-mfe__card-body">
                <PlotViewer state={state} />
              </div>
            </div>
          </div>
        </div>

        {/* Description Section - Below Both Components, Full Width */}
        {state.schoolData && state.selectedPlot && (() => {
          const description = getPlotDescriptionText(state.selectedPlot)
          return (
            <div className="paul-mfe__description-container">
              <DataDescriptionSection description={description || `Keine zusätzlichen Informationen für Plot ${state.selectedPlot} verfügbar.`} />
            </div>
          )
        })()}
      </div>
    </div>
  )
}

interface PlotViewerProps {
  state: AppState
}

function PlotViewer({ state }: PlotViewerProps) {
  if (!state.schoolData || !state.selectedPlot) {
    return (
      <div className="paul-mfe__empty-state">
        <div className="paul-mfe__empty-icon">📊</div>
        <h3>Keine Daten verfügbar</h3>
        <p>Klicken Sie auf "Daten laden" oder "Beispieldaten laden".</p>
      </div>
    )
  }

  if (!state.schoolData.plotData) {
    return (
      <div className="paul-mfe__plot-placeholder">
        <div className="paul-mfe__plot-icon">📈</div>
        <h3>{state.selectedPlot}</h3>
        <p className="paul-mfe__helper-text">
          Visualisierungen werden hier angezeigt. (Noch nicht implementiert)
        </p>
      </div>
    )
  }

  const plotData = state.schoolData.plotData.get(state.selectedPlot)
  if (!plotData) {
    return null
  }

  const metaSets = metaSetsJson as MetaSet[]

  return (
    <div className="plot-content">
      <StackedBarChart
        groups={plotData.groups}
        metaSets={metaSets.filter(m => m.set === plotData.set)}
        plotName={state.selectedPlot}
        header1={plotData.header1}
        header2={plotData.header2}
        showLegend={true}
      />
    </div>
  )
}

import { useState, useEffect } from 'react'
import './App.css'
import type {
  AppState,
  ExampleDataItem,
} from './types'
import { logo } from './assets'
import { StackedBarChart } from './components/StackedBarChart'
import { LandingPage } from './pages/LandingPage'
import { processExampleData, getAvailablePlots } from './dataProcessor'
import type { MetaHeader, MetaSet } from './iqb'
import exampleDataJson from './data/example_data.json'
import metaHeadersJson from './data/meta_headers.json'
import metaSetsJson from './data/meta_sets.json'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [state, setState] = useState<AppState>({
    schoolData: null,
    selectedPlot: null,
    isLoading: false,
    isGeneratingReport: false,
    reportAvailable: false,
  })

  // Load example data on app startup
  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }))
    
    setTimeout(() => {
      // Load metadata
      const exampleData = exampleDataJson as ExampleDataItem[]
      const metaHeaders = metaHeadersJson as MetaHeader[]
      const metaSets = metaSetsJson as MetaSet[]
      
      // Process the example data with metadata
      const plotDataMap = processExampleData(exampleData, metaHeaders, metaSets)
      const availablePlots = getAvailablePlots(exampleData)
      
      // Create plot metadata with headers
      const plots = availablePlots.map((plotName) => {
        const plotData = plotDataMap.get(plotName)
        return {
          id: plotName,
          label: plotData?.header2 || `Plot ${plotName}`,
        }
      })

      setState((prev) => ({
        ...prev,
        isLoading: false,
        schoolData: {
          name: 'Beispiel OES Daten',
          plots,
          plotData: plotDataMap,
        },
        selectedPlot: availablePlots[0] || null,
      }))
    }, 500)
  }, [])

  const handleViewData = () => {
    setShowLanding(false)
  }

  const handleBackToLanding = () => {
    setShowLanding(true)
  }

  const handleGenerateReport = () => {
    setState((prev) => ({ ...prev, isGeneratingReport: true }))
    // TODO: Connect to backend API
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isGeneratingReport: false,
        reportAvailable: true,
      }))
    }, 2000)
  }

  const handleDownloadReport = () => {
    // TODO: Connect to backend API
    console.log('Downloading report...')
  }

  return (
    <>
      {showLanding ? (
        <LandingPage onViewData={handleViewData} />
      ) : (
        <div className="app-container">
          <div className="app-header">
            <div className="header-content">
              <div className="header-left">
                <img src={logo} alt="ReportMaster" className="header-logo" />
                <div className="header-text">
                  <h1 className="app-title">ReportMaster</h1>
                  <p className="app-subtitle">Create LimeSurvey Reports</p>
                </div>
              </div>
              <div className="header-right">
                <button className="paul-mfe__button paul-mfe__button-secondary" onClick={handleBackToLanding}>
                  ← Zurück zur Startseite
                </button>
              </div>
            </div>
          </div>

          <div className="paul-mfe__data-viewer">
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
                        <div className="paul-mfe__plot-list">
                          {state.schoolData.plots.map((plot) => {
                            const isSelected = state.selectedPlot === plot.id
                            const plotCodeMatch = plot.label.match(/^([A-Z]\d+[a-z]?)/)
                            const plotCode = plotCodeMatch ? plotCodeMatch[1] : plot.id
                            const plotDescription = plot.label.replace(/^[A-Z]\d+[a-z]?:\s*/, '')
                            
                            return (
                              <div
                                key={plot.id}
                                className={`paul-mfe__plot-item ${isSelected ? 'selected' : ''}`}
                                onClick={() =>
                                  setState((prev) => ({ ...prev, selectedPlot: plot.id }))
                                }
                              >
                                <span className="paul-mfe__plot-code">{plotCode}</span>
                                <span className="paul-mfe__plot-description">{plotDescription}</span>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )}

                    {state.schoolData && !state.reportAvailable && (
                      <>
                        <div className="paul-mfe__divider"></div>
                        <div className="paul-mfe__action-section">
                          <button
                            className="paul-mfe__button paul-mfe__button-primary"
                            onClick={handleGenerateReport}
                            disabled={state.isGeneratingReport}
                          >
                            <span className="icon">📄</span>
                            PDF Report generieren
                          </button>
                          <div className="paul-mfe__helper-text">
                            <span className="icon">🕐</span>
                            Dies kann einen Moment dauern ...
                          </div>
                        </div>
                      </>
                    )}

                    {state.isGeneratingReport && (
                      <div className="paul-mfe__progress-section">
                        <div className="paul-mfe__spinner">⏳</div>
                        <p>Generating PDF report...</p>
                      </div>
                    )}

                    {state.reportAvailable && (
                      <div className="paul-mfe__action-section">
                        <button
                          className="paul-mfe__button paul-mfe__button-primary"
                          onClick={handleDownloadReport}
                        >
                          <span className="icon">💾</span>
                          Download PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="paul-mfe__data-viewer-main">
                <div className="paul-mfe__card">
                  <div className="paul-mfe__card-header">
                    <h2 className="paul-mfe__data-viewer-title">{state.schoolData?.name || 'Preview Panel'}</h2>
                  </div>
                  <div className="paul-mfe__card-body">
                    {state.schoolData && state.selectedPlot ? (
                      state.schoolData.plotData ? (
                        <div className="plot-content">
                          {(() => {
                            const plotData = state.schoolData.plotData.get(state.selectedPlot)
                            if (!plotData) return null
                            
                            const metaSets = metaSetsJson as MetaSet[]
                            
                            return (
                              <StackedBarChart
                                groups={plotData.groups}
                                metaSets={metaSets.filter(m => m.set === plotData.set)}
                                plotName={state.selectedPlot}
                                header1={plotData.header1}
                                header2={plotData.header2}
                                showLegend={true}
                              />
                            )
                          })()}
                        </div>
                      ) : (
                        <div className="plot-placeholder">
                          <div className="plot-icon">📈</div>
                          <h3>{state.selectedPlot}</h3>
                          <p className="paul-mfe__helper-text">
                            Visualisierungen werden hier angezeigt. (Noch nicht implementiert)
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="empty-state">
                        <div className="empty-icon">📊</div>
                        <h3>Keine Daten verfügbar</h3>
                        <p>Klicken Sie auf "Daten laden" oder "Beispieldaten laden".</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
           </div>
         </div>
       </div>
      )}
    </>
  )
}

export default App

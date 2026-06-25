import { useState, useEffect } from 'react'
import './App.css'
import type {
  AppState,
  ExampleDataItem,
} from './lib/types/types'
import { LandingPage } from './pages/LandingPage'
import { GroupSelectorPage } from './pages/GroupSelectorPage'
import { DataViewerPage } from './pages/DataViewerPage'
import { processExampleData, getAvailablePlots } from './lib/data/dataProcessor'
import { loadProcessedGroupData } from './lib/data/dataLoader'
import type { MetaHeader } from './lib/types/iqb'
import type { GroupId } from './lib/registries/groupRegistry'
import exampleDataJson from './data/example_data.json'
import metaHeadersJson from './data/meta_headers.json'
import metaSetsJson from './data/meta_sets.json'

type PageType = 'landing' | 'group-selector' | 'data-viewer'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing')
  const [state, setState] = useState<AppState>({
    schoolData: null,
    selectedPlot: null,
    isLoading: false,
    isGeneratingReport: false,
    reportAvailable: false,
    selectedGroup: null,
  })

  // Load example data on app startup
  const initializeAppData = () => {
    setTimeout(() => {
      const exampleData = exampleDataJson as ExampleDataItem[]
      const metaHeaders = metaHeadersJson as MetaHeader[]
      
      const plotDataMap = processExampleData(exampleData, metaHeaders, metaSetsJson)
      const availablePlots = getAvailablePlots(exampleData)
      
      const plots = availablePlots.map((plotName) => {
       const plotData = plotDataMap.get(plotName)
       return {
         id: plotName,
         label: plotData?.header2 || `Plot ${plotName}`,
       }
      })

      setState({
       isLoading: false,
       schoolData: {
         name: 'Beispiel Daten',
         plots,
         plotData: plotDataMap,
       },
       selectedPlot: availablePlots[0] || null,
       isGeneratingReport: false,
       reportAvailable: false,
       selectedGroup: null,
      })
    }, 500)
  }

  // Load example data on app startup
  useEffect(() => {
    initializeAppData()
  }, [])

  // Navigation handlers
  const handleGoToGroupSelector = () => {
    setCurrentPage('group-selector')
  }

  const handleSelectGroup = async (groupId: GroupId) => {
    setState((prev) => ({ ...prev, isLoading: true, selectedGroup: groupId }))
    
    const metaHeaders = metaHeadersJson as MetaHeader[]
    
    try {
      const groupData = await loadProcessedGroupData(groupId, metaHeaders, metaSetsJson)
      
      if (groupData) {
       setState((prev) => ({
         ...prev,
         isLoading: false,
         schoolData: {
           name: `Daten: ${groupData.groupName}`,
           plots: groupData.plots,
           plotData: groupData.plotData,
         },
         selectedPlot: groupData.availablePlots[0] || null,
         selectedGroup: groupId,
       }))
       setCurrentPage('data-viewer')
      } else {
       setState((prev) => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      console.error('Failed to load group data:', error)
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const handleBackToLanding = () => {
    setCurrentPage('landing')
    setState((prev) => ({ ...prev, selectedGroup: null }))
  }

  const handleBackToGroupSelector = () => {
    setCurrentPage('group-selector')
    setState((prev) => ({ ...prev, selectedGroup: null }))
  }

  // Data viewer handlers
  const handleSelectPlot = (plotId: string) => {
    setState((prev) => ({ ...prev, selectedPlot: plotId }))
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

  // Page routing
  return (
    <>
      {currentPage === 'landing' && (
       <LandingPage onViewData={handleGoToGroupSelector} />
      )}
      {currentPage === 'group-selector' && (
       <GroupSelectorPage
         onSelectGroup={handleSelectGroup}
         onBack={handleBackToLanding}
       />
      )}
      {currentPage === 'data-viewer' && (
       <DataViewerPage
         state={state}
         onSelectPlot={handleSelectPlot}
         onBackClick={handleBackToGroupSelector}
         onLogoClick={handleBackToLanding}
         onGenerateReport={handleGenerateReport}
         onDownloadReport={handleDownloadReport}
       />
      )}
    </>
  )
}

export default App

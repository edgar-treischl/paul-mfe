interface ReportSectionProps {
  reportAvailable: boolean
  isGeneratingReport: boolean
  onGenerateReport: () => void
  onDownloadReport: () => void
}

export function ReportSection({
  reportAvailable,
  isGeneratingReport,
  onGenerateReport,
  onDownloadReport,
}: ReportSectionProps) {
  if (isGeneratingReport) {
    return <GeneratingReportState />
  }

  if (reportAvailable) {
    return <ReportReadyState onDownloadReport={onDownloadReport} />
  }

  return <GenerateReportState onGenerateReport={onGenerateReport} />
}

function GenerateReportState({ onGenerateReport }: { onGenerateReport: () => void }) {
  return (
    <>
      <div className="paul-mfe__divider"></div>
      <div className="paul-mfe__action-section">
        <button
          className="paul-mfe__button paul-mfe__button-primary"
          onClick={onGenerateReport}
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
  )
}

function GeneratingReportState() {
  return (
    <div className="paul-mfe__progress-section">
      <div className="paul-mfe__spinner">⏳</div>
      <p>Generating PDF report...</p>
    </div>
  )
}

function ReportReadyState({ onDownloadReport }: { onDownloadReport: () => void }) {
  return (
    <div className="paul-mfe__action-section">
      <button
        className="paul-mfe__button paul-mfe__button-primary"
        onClick={onDownloadReport}
      >
        <span className="icon">💾</span>
        Download PDF
      </button>
    </div>
  )
}

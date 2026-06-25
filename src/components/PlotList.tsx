interface PlotItem {
  id: string
  label: string
}

interface PlotListProps {
  plots: PlotItem[]
  selectedPlot: string | null
  onSelectPlot: (plotId: string) => void
}

export function PlotList({ plots, selectedPlot, onSelectPlot }: PlotListProps) {
  return (
    <div className="paul-mfe__plot-list">
      {plots.map((plot) => (
        <PlotListItem
          key={plot.id}
          plot={plot}
          isSelected={selectedPlot === plot.id}
          onSelect={onSelectPlot}
        />
      ))}
    </div>
  )
}

interface PlotListItemProps {
  plot: PlotItem
  isSelected: boolean
  onSelect: (plotId: string) => void
}

function PlotListItem({ plot, isSelected, onSelect }: PlotListItemProps) {
  const plotCodeMatch = plot.label.match(/^([A-Z]\d+[a-z]?)/)
  const plotCode = plotCodeMatch ? plotCodeMatch[1] : plot.id
  const plotDescription = plot.label.replace(/^[A-Z]\d+[a-z]?:\s*/, '')

  return (
    <div
      className={`paul-mfe__plot-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(plot.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(plot.id)
        }
      }}
    >
      <span className="paul-mfe__plot-code">{plotCode}</span>
      <span className="paul-mfe__plot-description">{plotDescription}</span>
    </div>
  )
}

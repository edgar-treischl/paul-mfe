/**
 * Data Loader for Groups
 * 
 * Dynamically loads group-specific data files
 */

import { getGroupById, type GroupId } from '../registries/groupRegistry'
import type { ExampleDataItem, PlotDataWithMeta } from '../types/types'
import { processExampleData, getAvailablePlots } from './dataProcessor'
import type { MetaHeader, MetaSet } from '../types/iqb'

// Import all group data files
import exampleDataElt from '../../data/example_data/example_data_elt.json'
import exampleDataLeh from '../../data/example_data/example_data_leh.json'
import exampleDataSus from '../../data/example_data/example_data_sus.json'

const groupDataMap: Record<GroupId, ExampleDataItem[]> = {
  elt: exampleDataElt,
  leh: exampleDataLeh,
  sus: exampleDataSus,
}

/**
 * Load group data by ID
 */
function loadGroupData(groupId: GroupId): ExampleDataItem[] | null {
  return groupDataMap[groupId] || null
}

export interface ProcessedGroupData {
  groupId: GroupId;
  groupName: string;
  plots: Array<{ id: string; label: string }>;
  plotData: Map<string, PlotDataWithMeta>;
  availablePlots: string[];
}

/**
 * Load and process data for a specific group
 */
export async function loadProcessedGroupData(
  groupId: GroupId,
  metaHeaders: MetaHeader[],
  metaSets: MetaSet[]
): Promise<ProcessedGroupData | null> {
  const group = getGroupById(groupId)
  if (!group) return null

  const exampleData = loadGroupData(groupId)
  if (!exampleData) return null

  const plotDataMap = processExampleData(exampleData, metaHeaders, metaSets)
  const availablePlots = getAvailablePlots(exampleData)

  const plots = availablePlots.map((plotName) => {
    const plotData = plotDataMap.get(plotName)
    return {
      id: plotName,
      label: plotData?.header2 || `Plot ${plotName}`,
    }
  })

  return {
    groupId,
    groupName: group.label,
    plots,
    plotData: plotDataMap,
    availablePlots,
  }
}

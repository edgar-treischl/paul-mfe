/**
 * Plot Description Registry
 * 
 * Maps plot IDs (like A5, B1, etc.) to their descriptions.
 * Descriptions are stored in separate .md files in src/data/descriptions/
 * The descriptions are displayed in the "Weitere Informationen" section.
 */

// Import raw markdown files as strings
import a5DescriptionRaw from './data/descriptions/a5.md?raw'
import b1DescriptionRaw from './data/descriptions/b1.md?raw'

export interface PlotDescription {
  id: string;
  title: string;
  description: string;
}

/**
 * Extract description text from markdown (keeps full markdown including header)
 */
function extractDescriptionFromMarkdown(markdown: string): string {
  // Return the full markdown content including the header
  return markdown.trim()
}

/**
 * Registry of plot descriptions
 * Keyed by main topic IDs (e.g., 'A5', 'B1', 'B2', 'C1', etc.)
 * Each topic description applies to all its subtopics (e.g., A51, A52, A53 inherit from A5)
 * Subtopics are NOT registered here - they automatically inherit parent topic description
 */
export const plotDescriptionRegistry: Record<string, PlotDescription> = {
  // Main topics with descriptions (subtopics like A51, A52 inherit these)
  A5: {
    id: 'A5',
    title: 'Berücksichtigung unterschiedlicher Lernvoraussetzungen',
    description: extractDescriptionFromMarkdown(a5DescriptionRaw),
  },
  B1: {
    id: 'B1',
    title: 'Demokratieerziehung, Achtung und Rücksicht',
    description: extractDescriptionFromMarkdown(b1DescriptionRaw),
  },
}

/**
 * Get plot description by ID
 * Falls back to parent topic if subtopic not found
 * @param plotId - The plot identifier (e.g., 'A51', 'A52', 'B13', 'C22')
 * @returns PlotDescription object or undefined if not found
 */
export function getPlotDescription(plotId: string): PlotDescription | undefined {
  // Try exact match first
  if (plotDescriptionRegistry[plotId]) {
    return plotDescriptionRegistry[plotId]
  }
  
  // Extract parent topic by removing only the last digit
  // E.g., 'A51' -> 'A5', 'B13' -> 'B1', 'C22' -> 'C2'
  const parentId = plotId.slice(0, -1)
  if (parentId !== plotId && plotDescriptionRegistry[parentId]) {
    return plotDescriptionRegistry[parentId]
  }
  
  return undefined
}

/**
 * Get description text by plot ID
 * Returns empty string if no description found
 * @param plotId - The plot identifier
 * @returns Description text or empty string
 */
export function getPlotDescriptionText(plotId: string): string {
  const description = getPlotDescription(plotId)
  return description?.description || ''
}

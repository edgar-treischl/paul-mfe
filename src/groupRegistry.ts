/**
 * Group Registry
 * 
 * Centralized configuration for user groups.
 * Update this to modify available groups, icons, or metadata.
 */

export interface GroupConfig {
  id: 'elt' | 'leh' | 'sus';
  label: string;
  description: string;
  icon: string;
  emoji: string;
  color: string;
  order: number;
}

/**
 * Registry of available user groups
 * Easily extendable for future group additions
 */
export const groupRegistry: GroupConfig[] = [
  {
    id: 'elt',
    label: 'Eltern',
    description: 'Ergebnisse der Eltern',
    icon: '👨‍👩‍👧‍👦',
    emoji: '👨‍👩‍👧‍👦',
    color: '#3B82F6',
    order: 1,
  },
  {
    id: 'leh',
    label: 'Lehrkräfte',
    description: 'Ergebnisse der Lehrkräfte',
    icon: '🎓',
    emoji: '🎓',
    color: '#8B5CF6',
    order: 2,
  },
  {
    id: 'sus',
    label: 'Schüler/innen',
    description: 'Ergebnisse der Schüler/innen',
    icon: '👨‍🎓',
    emoji: '👨‍🎓',
    color: '#EC4899',
    order: 3,
  },
]

export function getGroupById(id: string): GroupConfig | undefined {
  return groupRegistry.find((group) => group.id === id)
}

export function getGroupsSorted(): GroupConfig[] {
  return [...groupRegistry].sort((a, b) => a.order - b.order)
}

export type GroupId = GroupConfig['id']

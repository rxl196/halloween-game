import { decode } from './encoding'
import type { GameId } from '../lib/types'

export type ConnectionsGroup = {
  /** 0 = easiest (yellow) through 3 = hardest (purple). */
  level: 0 | 1 | 2 | 3
  category: string
  members: string[]
}

export const CONNECTIONS_ID: GameId = 'connections'
export const MAX_MISTAKES = 4

export const LEVEL_COLORS = ['🟨', '🟧', '🟩', '🟪']
export const LEVEL_NAMES = ['yellow', 'orange', 'green', 'purple']

// Encoded so the groupings are not readable straight out of the bundle.
const ENCODED_GROUPS =
  'W3sibGV2ZWwiOjAsImNhdGVnb3J5IjoiVHJpY2stb3ItdHJlYXQgY2FuZHkgYmFycyIsIm1lbWJlcnMiOlsiU05JQ0tFUlMiLCJUV0lYIiwiS0lUS0FUIiwiU0tJVFRMRVMiXX0seyJsZXZlbCI6MSwiY2F0ZWdvcnkiOiJDbGFzc2ljIG1vbnN0ZXJzIiwibWVtYmVycyI6WyJWQU1QSVJFIiwiV0VSRVdPTEYiLCJaT01CSUUiLCJNVU1NWSJdfSx7ImxldmVsIjoyLCJjYXRlZ29yeSI6IkEgd2l0Y2jigJlzIGtpdCIsIm1lbWJlcnMiOlsiQ0FVTERST04iLCJCUk9PTVNUSUNLIiwiV0FORCIsIlNQRUxMQk9PSyJdfSx7ImxldmVsIjozLCJjYXRlZ29yeSI6IkhpZGRlbiDigJxCT0/igJ0iLCJtZW1iZXJzIjpbIkJBTUJPTyIsIlRBQk9PIiwiQk9PS0NBU0UiLCJCT09NRVJBTkciXX1d'

export const CONNECTIONS_GROUPS: ConnectionsGroup[] = JSON.parse(
  decode(ENCODED_GROUPS),
) as ConnectionsGroup[]

/**
 * Fixed shuffle so every player sees the same starting board (and so the
 * board never accidentally starts pre-grouped).
 */
export const CONNECTIONS_BOARD: string[] = [
  'WAND',
  'BAMBOO',
  'SNICKERS',
  'ZOMBIE',
  'BOOKCASE',
  'CAULDRON',
  'TWIX',
  'MUMMY',
  'TABOO',
  'SPELLBOOK',
  'WEREWOLF',
  'KITKAT',
  'BOOMERANG',
  'SKITTLES',
  'VAMPIRE',
  'BROOMSTICK',
]

export function groupFor(word: string): ConnectionsGroup {
  const group = CONNECTIONS_GROUPS.find((g) => g.members.includes(word))
  if (!group) throw new Error(`No Connections group contains "${word}"`)
  return group
}

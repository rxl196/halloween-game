import { decode } from './encoding'
import { VALID_GUESSES } from './wordlist'

export const WORD_LENGTH = 5
export const MAX_GUESSES = 6

/** Base64 so the answer is not visible in the shipped bundle. */
const ENCODED_ANSWER = 'R0hPVUw='

export const ANSWER = decode(ENCODED_ANSWER)

/** Shown after three guesses to keep the themed answer fair for everyone. */
export const HINT = 'An evil spirit of folklore said to haunt graveyards.'

export const ANSWER_NOTE =
  'A ghoul is a monster from Arabian folklore said to prowl graveyards — a Halloween costume favourite ever since.'

export function isValidGuess(word: string): boolean {
  return VALID_GUESSES.has(word.toUpperCase())
}

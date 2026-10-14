# Halloween Games 🎃

Three NYT-style mini puzzles for our internal Halloween celebration, plus a single
"share all three results" summary designed to be pasted into Teams.

| Game | What it is | Share format |
| --- | --- | --- |
| **Mini Crossword** | 5×5 spooky grid (`CHARM`, `BROOM`, `CANDY`, `MUMMY` all cross) | Solve time |
| **Connections** | 16 tiles, 4 hidden groups, 4 mistakes allowed | Emoji grid of guesses |
| **Boodle** | Wordle-style, 6 guesses at a 5-letter Halloween word | Emoji grid of guesses |

Everything is client-side: static React + TypeScript, no backend, no accounts.
Progress and results live in `localStorage`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint
```

## Project layout

```
src/
  App.tsx                 hub page, hash routing, unified share dialog
  components/             Modal, Toast, GameShell (shared chrome)
  games/
    crossword/            grid input, clue navigation, timer
    connections/          tile selection, grouping, mistake tracking
    boodle/              board + on-screen keyboard
  data/
    puzzleId.ts           puzzle identity + event name
    crossword.ts          grid, clues, numbering
    connections.ts        the four groups and the starting board
    boodle.ts            answer, hint
    wordlist.ts           generated list of accepted 5-letter guesses
  lib/
    types.ts              GameResult contract shared by all three games
    storage.ts            namespaced, versioned localStorage access
    scoring.ts            Wordle tile scoring (handles repeated letters)
    share.ts              builds the combined Teams summary
    clipboard.ts          clipboard write with an execCommand fallback
```

## Editing the puzzles

All three puzzles are data-only changes.

- **Answers are base64-encoded** in `src/data/*.ts` so they are not readable
  straight from the shipped bundle. Use `encode()` in `src/data/encoding.ts` to
  produce a new value. This deters casual peeking; it is not real security.
- **Connections**: update the encoded groups and keep `CONNECTIONS_BOARD` as a
  shuffle of exactly those 16 words. Level `0` is the easiest (yellow), then orange, green, and
  `3` (hardest, purple).
- **Crossword**: update the encoded solution rows (`#` marks a blocked square)
  and the matching entries in `CLUE_TEXT`. Numbering is derived automatically.
- **Boodle**: update the encoded answer, the `HINT` shown after three guesses,
  and `ANSWER_NOTE`.

### Publishing a new set

Bump `PUZZLE_ID` in `src/data/puzzleId.ts`. It namespaces every storage key, so
changing it resets saved progress and results for all players.

## The shared summary

Each game writes a `GameResult` (see `src/lib/types.ts`) on completion. The hub
assembles all three into one plain-text block:

```
🎃 Halloween Games — Culture Club 🎃

Mini Crossword ⏱ 1:42 ✅

Connections 1 mistake ✅
🟨🟨🟨🟩
🟨🟨🟨🟨
🟧🟧🟧🟧
🟩🟩🟩🟩
🟪🟪🟪🟪

Boodle 3/6 ✅
⬜⬜🟪⬜⬜
⬜🟧⬜⬜⬜
🟧🟧🟧🟧🟧

Play: https://<org>.github.io/<repo>/
```

Notes on why it looks like this:

- Plain text with `\n` only — Teams' compose box mangles markdown and backticks.
- Emoji grids show the player's *pattern*, never the answers, so it is safe to
  post in a channel.
- Unplayed games appear as `⬛ not played yet` rather than being omitted.
- Copy uses `navigator.clipboard` with a hidden-textarea fallback, because some
  embedded Teams webviews report an insecure context.

## Theme

Black / pumpkin-orange / witchy-purple. Colour tokens live in `src/index.css`.
Boodle uses 🟧 (right spot) and 🟪 (wrong spot) instead of Wordle's green/yellow.

## Deployment

`.github/workflows/deploy-pages.yml` builds and deploys to GitHub Pages on every
push to `main`. The build sets `GITHUB_PAGES=true`, which makes
`vite.config.ts` use `base: '/halloween-game/'`. Rename it there if the repo has
a different name. Enable Pages with "GitHub Actions" as the source in the repo
settings.

Routing uses the URL hash (`#/crossword`), so no SPA fallback is strictly
required.

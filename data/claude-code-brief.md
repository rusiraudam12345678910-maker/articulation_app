# Task: Integrate articulation/pronunciation practice features into existing word-collection app

## Context
This is an existing Next.js app (App Router, TypeScript, uses next/font with Geist) that already
lets users collect and organize words/phrases. I want to add speech practice features on top of
the existing word/phrase data, not build a separate app.

## Step 1 — Investigate before changing anything
Before writing any code:
1. Read `app/page.tsx` and map out the current routes under `app/`.
2. Find where word/phrase data is defined or stored (look for a `types/`, `lib/`, `db/`, `prisma/`,
   or similar folder; check if it's local state, a database, JSON file, or API route).
3. Identify the data model/shape for a "word" or "phrase" entry (fields like id, text, category, etc.).
4. Check `package.json` for existing dependencies — note the styling approach (Tailwind? CSS
   modules? plain CSS?), and whether any state management (Zustand, Redux, Context) is already in use.
5. Summarize what you find before proceeding, so I can confirm the integration plan fits.

## Step 2 — Features to add
Once the existing structure is clear, integrate:

1. **Practice mode per word/phrase**
   - For each saved word/phrase, add a "Practice" action that opens a practice view.
   - Practice view shows the word/phrase in large, clear text, with phonetic notes if available
     (use a free phonetic library or simple manual IPA field — ask me before adding a paid API).

2. **Audio recording + playback**
   - Use the browser's `MediaRecorder` API (no external service) to record the user saying the
     word/phrase and play it back immediately for comparison.
   - Show a live waveform/level indicator while recording using the Web Audio API
     (`AnalyserNode` + `getByteFrequencyData`), as a simple bar visualizer.
   - Recording must require HTTPS or localhost (browser mic restriction) — note this in a comment.

3. **Drill types** (apply to existing words/phrases, generated dynamically — don't hardcode content):
   - Minimal pairs mode: if two saved words differ by one phoneme, surface them together
     (nice-to-have; if no pairing logic exists yet, just support manual pairing for now).
   - Word-endings focus mode: flag words ending in consonant clusters or -ed/-s/-t/-d for
     extra-clear-articulation practice.
   - Shadow/sentence mode: if phrases (not just single words) exist in the data, support reading
     them aloud with a "Mark practiced" action.

4. **Progress tracking**
   - Track per-word/phrase: times practiced, last practiced date.
   - Track overall: daily streak (consecutive days with at least 1 practice), total drills completed.
   - Persist this using whatever the project already uses for persistence (extend the existing
     data layer — don't introduce a new database if one already exists).
   - Add a simple progress view (stats + recent session history).

5. **UI integration**
   - Match the existing app's visual style — inspect current Tailwind config / CSS before adding
     new components, don't introduce a new design system.
   - Add the practice/progress UI as new routes or components consistent with the current file
     structure (e.g. `app/practice/[id]/page.tsx` if that fits the existing routing pattern).

## Constraints
- No paid/external APIs without checking with me first (recording, waveform, and storage should
  all be local/free).
- Don't break existing word/phrase collection functionality.
- Keep TypeScript types consistent with whatever model already exists — extend, don't duplicate.
- Mobile-responsive, since articulation practice is likely used on phones.

## Reference implementation (for drill content/UX ideas only — not to copy wholesale)
I previously built a standalone prototype with 4 drill modes (minimal pairs, word endings, tongue
twisters, shadow sentences), a recording+waveform UI, and localStorage-based streak tracking.
I'll attach that file (`articulate.html`) separately as a UX reference — the visual design doesn't
need to match it, but the interaction patterns (record button behavior, waveform bars, drill
navigation with progress dots) are a good starting point.

## Deliverable
Working integration in the existing codebase, plus a short summary of:
- What files were added/changed
- Any decisions you made where the brief was ambiguous
- Anything you'd recommend I look at next (e.g. real phonetic data source, native-speaker
  reference audio, etc.)

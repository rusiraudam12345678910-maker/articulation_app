# Feature Spec: AI Conversational Speech Coach

**Purpose:** Add a feature where the user speaks to an AI agent that holds a natural
conversation, and corrects the user's **grammar, phrasing, and word choice** (not
pronunciation/articulation). Feedback should feel like a helpful conversation partner,
not a red-pen grading tool.

**Stack:** React/Next.js frontend, Node.js backend. AI/speech APIs left open —
recommendations included below.

---

## 1. Architecture Overview

```
[Browser Mic] 
    → MediaRecorder/WebRTC capture
    → STT API (speech-to-text)
    → Node backend: LLM call (conversation + correction analysis)
    → TTS API (text-to-speech)
    → [Browser Audio Playback + UI shows transcript/corrections]
```

Pick **turn-based** flow first (user finishes speaking → gets response), not
mid-sentence interruption. Much simpler to build and ship well; can add barge-in
later.

### Suggested APIs (all have free/trial tiers)
- **STT:** OpenAI Whisper API, or Deepgram (lower latency, good for near-real-time)
- **LLM:** Claude API (Anthropic) or OpenAI GPT-4o — needs to both converse AND
  return structured correction data (see Section 3)
- **TTS:** ElevenLabs (most natural), OpenAI TTS, or Google Cloud TTS (cheaper)

---

## 2. Core Features to Build

### 2.1 Voice Conversation Loop
- [ ] Mic capture in browser (MediaRecorder API), record until user stops talking
      (silence detection or push-to-talk button — start with push-to-talk, it's simpler)
- [ ] Send audio to backend → STT → get transcript
- [ ] Send transcript to LLM with a system prompt that makes it BOTH a conversational
      partner AND a grammar/phrasing analyzer
- [ ] LLM returns: (a) natural conversational reply, (b) structured corrections
      (see JSON schema below)
- [ ] Convert conversational reply to speech (TTS), play in browser
- [ ] Display transcript + corrections in UI

### 2.2 Correction Engine (the core value)
The LLM call should return structured JSON, not just prose. Example system prompt
instruction:

> "You are a friendly English conversation coach. Reply naturally to continue the
> conversation. Additionally, analyze the user's last message for grammar errors,
> awkward phrasing, or unnatural word choice. Respond ONLY in this JSON format:
> { "reply": "...", "corrections": [ { "original": "...", "corrected": "...",
> "type": "grammar|phrasing|vocabulary", "explanation": "..." } ] }"

Features:
- [ ] Grammar correction (tense, agreement, articles, prepositions)
- [ ] Phrasing suggestions (more natural ways to say it)
- [ ] Vocabulary upgrades (better word choice)
- [ ] Short "why" explanation per correction
- [ ] Filler word / repetition flagging (optional v2)

### 2.3 Practice Modes
- [ ] Free conversation (any topic)
- [ ] Scenario mode (job interview, small talk, ordering food — just different
      system prompts/personas)
- [ ] End-of-session summary: list of all corrections made, grouped by type

### 2.4 Progress Tracking
- [ ] Store each session's transcript + corrections in DB (Postgres/Mongo — whatever
      you're already using)
- [ ] Track recurring error patterns per user (e.g., tag corrections by type/category,
      count frequency over time)
- [ ] Simple dashboard: error trend chart, most common mistake categories

### 2.5 UI Components Needed
- [ ] Recording button + live waveform/recording indicator
- [ ] Live transcript panel
- [ ] Correction cards (original vs. corrected, with explanation) shown after each turn
- [ ] Session history list + playback
- [ ] Progress dashboard page

---

## 3. Data Model (suggested)

```
Session {
  id, userId, startedAt, endedAt, mode (free/scenario), scenarioType?
}

Turn {
  id, sessionId, speaker (user/ai), transcript, audioUrl, timestamp
}

Correction {
  id, turnId, original, corrected, type (grammar/phrasing/vocabulary),
  explanation, createdAt
}
```

---

## 4. API Endpoints (Node backend)

- `POST /api/session/start` — create a new session
- `POST /api/session/:id/turn` — accepts audio (or transcript), returns
  { transcript, aiReply, aiAudioUrl, corrections }
- `POST /api/session/:id/end` — closes session, generates summary
- `GET /api/user/:id/progress` — aggregated correction stats over time
- `GET /api/session/:id` — full session transcript for playback

---

## 5. Suggested Build Order (for Claude Code)

1. Backend: STT + LLM + TTS pipeline as a single `/api/session/:id/turn` endpoint,
   test with Postman/curl before touching UI
2. Frontend: basic mic recording + send audio + play back AI response (no UI polish yet)
3. Add structured correction display in UI
4. Add session persistence (DB) + history view
5. Add scenario modes (just different prompts)
6. Add progress dashboard
7. Polish: waveforms, loading states, error handling for mic permissions/API failures

---

## 6. Things to Decide Before Building
- Push-to-talk vs. auto-silence-detection for when the user stops speaking
- Which STT/LLM/TTS providers (cost, latency, quality tradeoffs)
- Whether corrections show live (after each turn) or only in end-of-session summary
- Data privacy: how long to store voice recordings, whether to store audio at all
  or just transcripts

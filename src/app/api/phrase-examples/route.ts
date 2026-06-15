import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { phrase } = await req.json()
  if (!phrase) return NextResponse.json({ error: 'Missing phrase' }, { status: 400 })

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an English language tutor. Given a phrase, return exactly 3 natural example sentences that use the phrase in context. Reply with a JSON array of 3 strings and nothing else.',
        },
        { role: 'user', content: phrase },
      ],
      temperature: 0.7,
    }),
  })

  if (!res.ok) return NextResponse.json({ error: 'OpenAI error' }, { status: 502 })

  const json = await res.json()
  const text = json.choices?.[0]?.message?.content ?? '[]'

  try {
    const examples: string[] = JSON.parse(text)
    return NextResponse.json({ examples })
  } catch {
    return NextResponse.json({ error: 'Failed to parse examples' }, { status: 500 })
  }
}

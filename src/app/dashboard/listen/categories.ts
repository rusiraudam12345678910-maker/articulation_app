export const CATEGORIES = [
  'Tongue Twisters',
  'Confusing Words',
  'Minimal Pairs',
  'Word Twisters',
  'Difficult Pronunciation',
  'Uncategorized',
] as const

export type Category = typeof CATEGORIES[number]

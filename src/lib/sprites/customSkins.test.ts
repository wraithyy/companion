import { describe, it, expect } from 'vitest'
import { parseSkins } from './customSkins'

const valid = {
  id: 'my-skin',
  label: 'My Skin',
  palette: { A: '#5b3fb0', B: '#ffffff' },
  open: ['AABB', 'BBAA'],
  closed: ['AABB', 'BBAA'],
}

describe('parseSkins', () => {
  it('parses a single valid skin object', () => {
    const [skin] = parseSkins(JSON.stringify(valid))
    expect(skin.id).toBe('my-skin')
    expect(skin.size).toBe(88) // default applied
  })

  it('parses an array of skins', () => {
    const skins = parseSkins(
      JSON.stringify([valid, { ...valid, id: 'other' }]),
    )
    expect(skins).toHaveLength(2)
  })

  it('keeps an explicit size and optional mini sprite', () => {
    const [skin] = parseSkins(
      JSON.stringify({
        ...valid,
        size: 120,
        mini: { rows: ['AB'], palette: { A: '#000000', B: '#fff' } },
      }),
    )
    expect(skin.size).toBe(120)
    expect(skin.mini?.rows).toEqual(['AB'])
  })

  it('rejects invalid JSON', () => {
    expect(() => parseSkins('{ not json')).toThrow(/Invalid JSON/)
  })

  it('rejects a missing required field', () => {
    const { open, ...noOpen } = valid
    void open
    expect(() => parseSkins(JSON.stringify(noOpen))).toThrow(/open/)
  })

  it('rejects a non-hex palette color', () => {
    expect(() =>
      parseSkins(JSON.stringify({ ...valid, palette: { A: 'red' } })),
    ).toThrow(/hex color/)
  })

  it('rejects a character used in rows but missing from the palette', () => {
    expect(() =>
      parseSkins(JSON.stringify({ ...valid, open: ['AAZZ'] })),
    ).toThrow(/"Z" is not defined/)
  })

  it('allows "." as transparency without a palette entry', () => {
    const [skin] = parseSkins(
      JSON.stringify({ ...valid, open: ['A..A'], closed: ['A..A'] }),
    )
    expect(skin.open).toEqual(['A..A'])
  })
})

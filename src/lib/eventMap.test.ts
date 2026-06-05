import { describe, it, expect } from 'vitest'
import { mapEvent } from './eventMap'

describe('mapEvent', () => {
  it('PreToolUse Read -> state reading', () => {
    const result = mapEvent({ hook: 'PreToolUse', tool_name: 'Read' })
    expect(result.state).toBe('reading')
    expect(result.spawnMini).toBe(false)
    expect(result.removeMini).toBe(false)
  })

  it('PreToolUse Edit -> state editing', () => {
    const result = mapEvent({ hook: 'PreToolUse', tool_name: 'Edit' })
    expect(result.state).toBe('editing')
  })

  it('PreToolUse Task -> spawnMini true', () => {
    const result = mapEvent({ hook: 'PreToolUse', tool_name: 'Task' })
    expect(result.spawnMini).toBe(true)
    expect(result.state).toBe('thinking')
  })

  it('SubagentStop -> removeMini true', () => {
    const result = mapEvent({ hook: 'SubagentStop' })
    expect(result.removeMini).toBe(true)
    expect(result.spawnMini).toBe(false)
  })

  it('Stop -> state done', () => {
    const result = mapEvent({ hook: 'Stop' })
    expect(result.state).toBe('done')
  })

  it('Notification -> state asking', () => {
    const result = mapEvent({ hook: 'Notification' })
    expect(result.state).toBe('asking')
  })

  it('PreToolUse UnknownTool -> state thinking', () => {
    const result = mapEvent({ hook: 'PreToolUse', tool_name: 'UnknownTool' })
    expect(result.state).toBe('thinking')
    expect(result.spawnMini).toBe(false)
    expect(result.removeMini).toBe(false)
  })
})

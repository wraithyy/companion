import { describe, it, expect } from 'vitest'
import { companionReducer, initialState, CompanionAction } from './companionReducer'
import { mapEvent } from '../lib/eventMap'

function eventAction(hook: string, tool_name?: string): CompanionAction {
  const result = mapEvent({ hook, tool_name })
  return { type: 'EVENT', result, tool: tool_name ?? null }
}

describe('companionReducer', () => {
  it('initial state is idle', () => {
    expect(initialState.state).toBe('idle')
    expect(initialState.miniCount).toBe(0)
    expect(initialState.lastTool).toBeNull()
  })

  it('UserPromptSubmit -> thinking state', () => {
    const next = companionReducer(initialState, eventAction('UserPromptSubmit'))
    expect(next.state).toBe('thinking')
  })

  it('PreToolUse with Edit -> editing state', () => {
    const next = companionReducer(initialState, eventAction('PreToolUse', 'Edit'))
    expect(next.state).toBe('editing')
    expect(next.lastTool).toBe('Edit')
  })

  it('PreToolUse with Task -> miniCount increases by 1, state = thinking', () => {
    const next = companionReducer(initialState, eventAction('PreToolUse', 'Task'))
    expect(next.state).toBe('thinking')
    expect(next.miniCount).toBe(1)
  })

  it('SubagentStop -> miniCount decreases by 1', () => {
    const withOne = companionReducer(initialState, eventAction('PreToolUse', 'Task'))
    expect(withOne.miniCount).toBe(1)
    const next = companionReducer(withOne, eventAction('SubagentStop'))
    expect(next.miniCount).toBe(0)
  })

  it('multiple Task spawns then SubagentStops -> miniCount goes 0->3->2->1->0', () => {
    let state = initialState

    state = companionReducer(state, eventAction('PreToolUse', 'Task'))
    state = companionReducer(state, eventAction('PreToolUse', 'Task'))
    state = companionReducer(state, eventAction('PreToolUse', 'Task'))
    expect(state.miniCount).toBe(3)

    state = companionReducer(state, eventAction('SubagentStop'))
    expect(state.miniCount).toBe(2)

    state = companionReducer(state, eventAction('SubagentStop'))
    expect(state.miniCount).toBe(1)

    state = companionReducer(state, eventAction('SubagentStop'))
    expect(state.miniCount).toBe(0)
  })

  it('Stop -> done state', () => {
    const next = companionReducer(initialState, eventAction('Stop'))
    expect(next.state).toBe('done')
  })

  it('IDLE_TIMEOUT during an active turn -> thinking (stays awake)', () => {
    const working = companionReducer(initialState, eventAction('PreToolUse', 'Bash'))
    expect(working.state).toBe('working')
    expect(working.active).toBe(true)
    const next = companionReducer(working, { type: 'IDLE_TIMEOUT' })
    expect(next.state).toBe('thinking')
  })

  it('IDLE_TIMEOUT after the turn stops -> idle', () => {
    const stopped = companionReducer(initialState, eventAction('Stop'))
    expect(stopped.state).toBe('done')
    expect(stopped.active).toBe(false)
    const next = companionReducer(stopped, { type: 'IDLE_TIMEOUT' })
    expect(next.state).toBe('idle')
  })

  it('IDLE_TIMEOUT after SessionEnd stays sleeping', () => {
    const ended = companionReducer(initialState, eventAction('SessionEnd'))
    expect(ended.state).toBe('sleeping')
    const next = companionReducer(ended, { type: 'IDLE_TIMEOUT' })
    expect(next.state).toBe('sleeping')
  })

  it('miniCount never goes below 0', () => {
    // No spawns, just stops
    let state = initialState
    state = companionReducer(state, eventAction('SubagentStop'))
    expect(state.miniCount).toBe(0)
    state = companionReducer(state, eventAction('SubagentStop'))
    expect(state.miniCount).toBe(0)
  })
})

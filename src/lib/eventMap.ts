export type CompanionState =
  | 'idle'
  | 'thinking'
  | 'reading'
  | 'editing'
  | 'working'
  | 'searching'
  | 'asking'
  | 'tidying'
  | 'done'
  | 'sleeping'

export interface HookEvent {
  hook: string
  tool_name?: string
  session_id?: string
  [key: string]: unknown
}

export interface EventMappingResult {
  state: CompanionState
  spawnMini: boolean
  removeMini: boolean
}

const READING_TOOLS = new Set([
  'Read',
  'Grep',
  'Glob',
  'Explorer',
  'Explore',
  'mcp__context-mode__ctx_search',
  'mcp__context-mode__ctx_batch_execute',
])
const EDITING_TOOLS = new Set(['Edit', 'Write', 'MultiEdit', 'NotebookEdit'])
const BASH_TOOLS = new Set(['Bash'])
const SEARCH_TOOLS = new Set([
  'WebFetch',
  'WebSearch',
  'mcp__webclaw__search',
  'mcp__webclaw__scrape',
])
const SUBAGENT_TOOLS = new Set(['Task', 'Agent', 'Workflow'])
const ASK_TOOLS = new Set(['AskUserQuestion'])

export function mapEvent(event: HookEvent): EventMappingResult {
  const hook = event.hook ?? ''
  const tool = event.tool_name ?? ''

  if (hook === 'SubagentStop') {
    return { state: 'thinking', spawnMini: false, removeMini: true }
  }

  if (hook === 'Stop') {
    return { state: 'done', spawnMini: false, removeMini: false }
  }

  if (hook === 'SessionEnd') {
    return { state: 'sleeping', spawnMini: false, removeMini: false }
  }

  if (hook === 'SessionStart') {
    return { state: 'idle', spawnMini: false, removeMini: false }
  }

  if (hook === 'PreCompact') {
    return { state: 'tidying', spawnMini: false, removeMini: false }
  }

  if (hook === 'Notification') {
    return { state: 'asking', spawnMini: false, removeMini: false }
  }

  if (hook === 'UserPromptSubmit') {
    return { state: 'thinking', spawnMini: false, removeMini: false }
  }

  if (hook === 'PreToolUse') {
    if (SUBAGENT_TOOLS.has(tool)) {
      return { state: 'thinking', spawnMini: true, removeMini: false }
    }
    if (ASK_TOOLS.has(tool)) {
      return { state: 'asking', spawnMini: false, removeMini: false }
    }
    if (READING_TOOLS.has(tool)) {
      return { state: 'reading', spawnMini: false, removeMini: false }
    }
    if (EDITING_TOOLS.has(tool)) {
      return { state: 'editing', spawnMini: false, removeMini: false }
    }
    if (BASH_TOOLS.has(tool)) {
      return { state: 'working', spawnMini: false, removeMini: false }
    }
    if (SEARCH_TOOLS.has(tool)) {
      return { state: 'searching', spawnMini: false, removeMini: false }
    }
    return { state: 'thinking', spawnMini: false, removeMini: false }
  }

  if (hook === 'PostToolUse') {
    return { state: 'thinking', spawnMini: false, removeMini: false }
  }

  return { state: 'thinking', spawnMini: false, removeMini: false }
}

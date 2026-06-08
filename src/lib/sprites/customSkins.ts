import { z } from 'zod'
import { CompanionSkin } from './types'

const STORAGE_KEY = 'companion.customSkins'

const HexColor = z
  .string()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'must be a hex color, e.g. #2f5fd0')

// A palette maps single-character keys to colors. '.' is reserved for
// transparency and must not be defined.
const Palette = z.record(
  z.string().length(1, 'palette keys must be a single character'),
  HexColor,
)

const Rows = z.array(z.string()).min(1, 'needs at least one row')

const MiniSchema = z.object({
  rows: Rows,
  palette: Palette.optional(),
  size: z.number().positive().optional(),
})

const SkinSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/, 'id must be lowercase letters, numbers or dashes'),
    label: z.string().min(1),
    palette: Palette,
    open: Rows,
    closed: Rows,
    size: z.number().positive().optional().default(88),
    mini: MiniSchema.optional(),
  })
  .superRefine((skin, ctx) => {
    const checkRows = (
      rows: string[],
      palette: Record<string, string>,
      field: string,
    ) => {
      const known = new Set(Object.keys(palette))
      for (const row of rows) {
        for (const ch of row) {
          if (ch !== '.' && !known.has(ch)) {
            ctx.addIssue({
              code: 'custom',
              path: [field],
              message: `character "${ch}" is not defined in the palette`,
            })
            return
          }
        }
      }
    }
    checkRows(skin.open, skin.palette, 'open')
    checkRows(skin.closed, skin.palette, 'closed')
    if (skin.mini) checkRows(skin.mini.rows, skin.mini.palette ?? skin.palette, 'mini')
  })

function formatError(err: z.ZodError): string {
  return err.issues
    .map((i) => {
      const path = i.path.join('.') || '(root)'
      return `${path}: ${i.message}`
    })
    .join('\n')
}

// Parse user-supplied JSON (a single skin object or an array of them) into
// validated skins. Throws an Error with a readable message on failure.
export function parseSkins(jsonText: string): CompanionSkin[] {
  let raw: unknown
  try {
    raw = JSON.parse(jsonText)
  } catch {
    throw new Error('Invalid JSON — check for typos, trailing commas, etc.')
  }

  const list = Array.isArray(raw) ? raw : [raw]
  const result = z.array(SkinSchema).safeParse(list)
  if (!result.success) {
    throw new Error(formatError(result.error))
  }
  return result.data as CompanionSkin[]
}

export function loadCustomSkins(): CompanionSkin[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = z.array(SkinSchema).safeParse(JSON.parse(stored))
    return parsed.success ? (parsed.data as CompanionSkin[]) : []
  } catch {
    return []
  }
}

export function saveCustomSkins(skins: CompanionSkin[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skins))
  } catch {
    // localStorage unavailable (private mode) — custom skins stay in-memory.
  }
}

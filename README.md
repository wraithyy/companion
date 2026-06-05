# Companion

A tiny always-on-top desktop pet that reacts to **Claude Code** activity in
real time. When Claude reads, edits, runs commands, searches, spawns
subagents, or finishes a turn, the companion changes its expression and props
to match. It ships as a Tauri desktop app plus a Claude Code plugin that
forwards hook events to it.

---

## Table of contents

- [How it works](#how-it-works)
- [Install](#install)
- [Using the companion](#using-the-companion)
- [States reference](#states-reference)
- [Creating your own skins](#creating-your-own-skins)
- [Development](#development)

---

## How it works

```
Claude Code  ──hook event──▶  companion-forward.sh  ──HTTP POST──▶  127.0.0.1:4317
                                                                        │
                                                          Tauri server emits "cc-event"
                                                                        │
                                                              React reducer maps the
                                                              event to a companion state
                                                                        │
                                                            Sprite + animation update
```

- Each Claude Code hook (`PreToolUse`, `Stop`, `SubagentStop`, …) runs a small
  forwarding script that POSTs the event JSON to a local HTTP server the app
  runs on port **4317**.
- The Tauri backend re-emits it to the web frontend, where a reducer maps the
  event to one of the companion **states** (see the table below).
- The active **skin** decides what the character looks like; states only decide
  the expression (open/closed eyes), the floating **accessory**, and the
  **animation**.

---

## Install

### 1. Build & run the app

Requires [Rust](https://rustup.rs/) + [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm tauri build      # produces a packaged app, or:
pnpm tauri dev        # run in development
```

Leave the app running — it listens on `127.0.0.1:4317` for events. If the port
is already taken (another instance), it logs a warning and exits.

### 2. Install the plugin hook script

From the project root:

```bash
./install.sh
```

This copies `hooks/companion-forward.sh` to `~/.claude/hooks/`.

### 3. Enable it for a project

Open the Claude Code project where you want the companion active and run:

```
/companion:enable
```

This writes the hook entries into that project's
`.claude/settings.local.json` only (no global changes). Restart Claude Code for
the hooks to take effect.

Related commands:

| Command                 | Effect                                          |
| ----------------------- | ----------------------------------------------- |
| `/companion:install`    | Install the hook script onto the machine        |
| `/companion:enable`     | Enable the companion for the current project    |
| `/companion:disable`    | Remove the hooks from the current project       |
| `/companion:uninstall`  | Remove the hook script from the machine         |

---

## Using the companion

The window is small, frameless, transparent, and always on top. Controls fade
in on hover:

- **Move it** — drag the grip (`⠿`) in the top-left, or just drag the body.
- **Resize it** — drag the grip (`⤡`) in the bottom-right corner. The companion
  scales with the window (min 120px, max 600px).
- **Switch skins** — click the gear (`⚙`) in the top-right and pick a character.
  Your choice is remembered across restarts.
- **Add / remove skins** — see [Creating your own skins](#creating-your-own-skins).

### Subagents

When Claude spawns subagents (the `Task`/`Agent` tool), a row of **mini
companions** appears below the main one — one per in-flight subagent — and they
disappear as each subagent finishes. A skin can override what its minis look
like (e.g. the `kara` skin shows green beer bottles).

---

## States reference

The reducer maps hook events to these states. `closed` states show the sleepy
(eyes-closed) sprite; everything else shows the `open` sprite.

| State      | Triggered by                         | Expression | Accessory  |
| ---------- | ------------------------------------ | ---------- | ---------- |
| `idle`     | session start / no work in flight    | closed     | —          |
| `sleeping` | session end                          | closed     | 💤 (zzz)   |
| `thinking` | between events while a turn is active| open       | thought    |
| `reading`  | `Read`/`Grep`/`Glob`/search tools    | open       | book       |
| `editing`  | `Edit`/`Write`/`NotebookEdit`        | open       | pencil     |
| `working`  | `Bash`                               | open       | gear       |
| `searching`| web/scrape tools                     | open       | magnifier  |
| `asking`   | `AskUserQuestion` / notifications    | open       | question   |
| `tidying`  | `PreCompact`                         | open       | broom      |
| `done`     | `Stop` (turn finished)               | open       | check      |

---

## Creating your own skins

A skin is a small JSON object describing two pixel grids (eyes open / eyes
closed) and the colors they use. You can add one **without rebuilding** the app:
click the gear → **+ Add skin**, paste the JSON, and hit **Add**. Custom skins
are stored in `localStorage` and can be removed with the `×` that appears on
hover.

### Skin JSON format

```json
{
  "id": "my-skin",
  "label": "My Skin",
  "palette": {
    "C": "#5b3fb0",
    "S": "#cda87f",
    "K": "#120c06"
  },
  "open": [
    "..CCCC..",
    ".CSSSSC.",
    ".CSKSKS.",
    ".CSSSSC.",
    "..CCCC.."
  ],
  "closed": [
    "..CCCC..",
    ".CSSSSC.",
    ".CSKKKS.",
    ".CSSSSC.",
    "..CCCC.."
  ],
  "size": 88
}
```

| Field     | Required | Meaning                                                                 |
| --------- | -------- | ----------------------------------------------------------------------- |
| `id`      | yes      | Unique id, lowercase letters / numbers / dashes. Can't reuse a built-in id. |
| `label`   | yes      | Display name in the picker.                                             |
| `palette` | yes      | Map of **single-character** keys → hex colors (`#rgb` or `#rrggbb`).    |
| `open`    | yes      | Array of strings — the eyes-open grid. Each character is one pixel.     |
| `closed`  | yes      | Array of strings — the eyes-closed / sleepy grid.                       |
| `size`    | no       | Rendered width in px (default `88`).                                    |
| `mini`    | no       | Override sprite for subagents — `{ "rows": [...], "palette": {...}, "size": 24 }`. |

### Rules

- **Each character in `open`/`closed`/`mini.rows` must be defined in the
  palette** — except `.` (a dot), which is reserved for **transparency**.
- Rows don't all have to be the same length; the grid is laid out left-aligned
  and the widest row sets the canvas width.
- **Colors:** palette keys are single characters, so you get one color per
  distinct character. Using `A–Z`, `a–z`, `0–9`, and symbols, that's ~90
  color slots available in a single skin — plenty for detailed pixel art.
- Keep grids small and bold. The built-in skins are ~16×16; cramming a detailed
  image into a tiny grid reads as mud. Use strong value contrast and a dark
  outline to separate regions.

### Tips for designing a grid

- Sketch on paper or in a spreadsheet first — one cell per pixel.
- Pick a small palette with clear light/dark contrast; add a couple of
  highlight pixels to suggest form.
- The `open` and `closed` grids usually differ only around the eyes and mouth.
- For subagent minis, a simple recognizable icon works better than a shrunken
  copy of the main sprite.

### Adding a skin as a built-in (contributing)

To bake a skin into the app instead of importing it at runtime:

1. Create `src/lib/sprites/<id>.ts` exporting a `CompanionSkin` (copy an
   existing one like `src/lib/sprites/cat.ts` as a template).
2. Register it in `src/lib/sprites/index.ts` (`import` it and add to the
   `SKINS` array).
3. Rebuild.

---

## Development

```bash
pnpm dev          # Vite dev server (frontend only)
pnpm tauri dev    # full desktop app in dev mode
pnpm build        # typecheck + production build
pnpm test         # run the test suite (vitest)
```

Key source files:

| Path                                | Responsibility                              |
| ----------------------------------- | ------------------------------------------- |
| `src/lib/eventMap.ts`               | Hook event → companion state mapping        |
| `src/state/companionReducer.ts`     | State + subagent (mini) accounting          |
| `src/lib/sprites/`                  | Skins, shared accessories, sprite types     |
| `src/lib/sprites/customSkins.ts`    | Custom-skin JSON parsing/validation (zod)   |
| `src/components/PixelSprite.tsx`    | Renders a pixel grid as crisp SVG rects     |
| `src-tauri/src/server.rs`           | Local HTTP server that receives hook events |
| `hooks/companion-forward.sh`        | Forwards Claude Code hook events to the app |

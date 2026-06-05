#!/usr/bin/env bash
set -e

COMPANION_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOKS_DIR="$HOME/.claude/hooks"
SETTINGS="$HOME/.claude/settings.json"
HOOK_DEST="$HOOKS_DIR/companion-forward.sh"

echo "[companion] Installing hooks..."

# Ensure hooks dir exists
mkdir -p "$HOOKS_DIR"

# Copy hook script
cp "$COMPANION_DIR/hooks/companion-forward.sh" "$HOOK_DEST"
chmod +x "$HOOK_DEST"
echo "[companion] Hook script installed to $HOOK_DEST"

# Patch settings.json
if [ ! -f "$SETTINGS" ]; then
  echo '{}' > "$SETTINGS"
fi

python3 - "$SETTINGS" <<'PYEOF'
import json, sys
from pathlib import Path

path = sys.argv[1]
with open(path) as f:
    s = json.load(f)

if "hooks" not in s:
    s["hooks"] = {}

hook_path = str(Path.home() / ".claude" / "hooks" / "companion-forward.sh")

hook_cmd_map = {
    "UserPromptSubmit": f"{hook_path} UserPromptSubmit",
    "Notification":     f"{hook_path} Notification",
    "PreToolUse":       f"{hook_path} PreToolUse",
    "PostToolUse":      f"{hook_path} PostToolUse",
    "Stop":             f"{hook_path} Stop",
}

for hook_type, cmd in hook_cmd_map.items():
    entries = s["hooks"].setdefault(hook_type, [])
    already = any(
        h.get("command", "") == cmd
        for entry in entries
        for h in entry.get("hooks", [])
    )
    if not already:
        entries.insert(0, {
            "matcher": "*",
            "hooks": [{"type": "command", "command": cmd, "timeout": 3}]
        })

with open(path, "w") as f:
    json.dump(s, f, indent=2, ensure_ascii=False)

print(f"[companion] settings.json patched.")
PYEOF

echo "[companion] Done! Start companion app and restart Claude Code."

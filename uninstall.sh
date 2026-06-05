#!/usr/bin/env bash

SETTINGS="$HOME/.claude/settings.json"
HOOK="$HOME/.claude/hooks/companion-forward.sh"

# Remove hook script
rm -f "$HOOK"
echo "[companion] Hook script removed."

# Remove companion hooks from settings.json
python3 - "$SETTINGS" <<'PYEOF'
import json, sys
path = sys.argv[1]
with open(path) as f:
    s = json.load(f)

hooks = s.get("hooks", {})
for hook_type in list(hooks.keys()):
    hooks[hook_type] = [
        entry for entry in hooks[hook_type]
        if not any("companion-forward" in h.get("command", "")
                   for h in entry.get("hooks", []))
    ]
    if not hooks[hook_type]:
        del hooks[hook_type]

with open(path, "w") as f:
    json.dump(s, f, indent=2, ensure_ascii=False)
print("[companion] Hooks removed from settings.json.")
PYEOF

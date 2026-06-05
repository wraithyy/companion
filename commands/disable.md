---
description: Disable the companion for the current project (removes hooks from .claude/settings.local.json).
---

Disable the Claude Code Companion for this project.

Removes companion hook entries from `.claude/settings.local.json`.

## Steps

1. Run:
   ```bash
   python3 - <<'PYEOF'
   import json, os
   path = ".claude/settings.local.json"
   if not os.path.exists(path):
       print("Companion not enabled for this project (no settings.local.json).")
       exit(0)
   with open(path) as f:
       s = json.load(f)
   hooks = s.get("hooks", {})
   for ht in list(hooks.keys()):
       hooks[ht] = [e for e in hooks[ht] if not any("companion-forward" in h.get("command","") for h in e.get("hooks",[]))]
       if not hooks[ht]:
           del hooks[ht]
   with open(path, "w") as f:
       json.dump(s, f, indent=2, ensure_ascii=False)
   print(f"Companion disabled for this project ({os.getcwd()}).")
   print("Restart Claude Code for changes to take effect.")
   PYEOF
   ```

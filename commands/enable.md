---
description: Enable the companion for the current project (writes hooks to .claude/settings.local.json).
---

Enable the Claude Code Companion for this specific project instance only.

Writes companion hook entries to `.claude/settings.local.json` in the current project. Only this Claude Code window will send events to the companion app.

## Steps

1. Ensure `.claude/` directory exists:
   ```bash
   mkdir -p .claude
   ```

2. Run this Python snippet to safely merge companion hooks into `.claude/settings.local.json`:
   ```bash
   python3 - <<'PYEOF'
   import json, os
   path = ".claude/settings.local.json"
   s = {}
   if os.path.exists(path):
       with open(path) as f:
           s = json.load(f)
   hook_path = os.path.expanduser("~/.claude/hooks/companion-forward.sh")
   if not os.path.exists(hook_path):
       print(f"ERROR: Hook script not found at {hook_path}. Run /companion:install first.")
       exit(1)
   if "hooks" not in s:
       s["hooks"] = {}
   for hook_type in ["UserPromptSubmit", "Notification", "PreToolUse", "PostToolUse", "Stop"]:
       entries = s["hooks"].setdefault(hook_type, [])
       cmd = f"{hook_path} {hook_type}"
       already = any(h.get("command","") == cmd for entry in entries for h in entry.get("hooks",[]))
       if not already:
           entries.insert(0, {"matcher": "*", "hooks": [{"type": "command", "command": cmd, "timeout": 3}]})
   with open(path, "w") as f:
       json.dump(s, f, indent=2, ensure_ascii=False)
   print(f"Companion enabled for this project ({os.getcwd()}).")
   print("Restart Claude Code for hooks to take effect.")
   PYEOF
   ```

3. Verify the file was written:
   ```bash
   python3 -c "import json; s=json.load(open('.claude/settings.local.json')); print('OK — hooks:', list(s.get('hooks',{}).keys()))"
   ```

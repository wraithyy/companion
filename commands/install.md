---
description: Install the Claude Code Companion hook script onto this machine.
---

Install the Claude Code Companion hooks so that the companion app reacts to Claude Code activity in real time.

## Steps

1. Run the install script from the plugin directory:
   ```bash
   bash "${CLAUDE_PLUGIN_ROOT}/install.sh"
   ```

2. Verify the hook script was installed:
   ```bash
   ls -la ~/.claude/hooks/companion-forward.sh
   ```

3. Validate settings.json is still valid JSON:
   ```bash
   python3 -c "import json; json.load(open('$HOME/.claude/settings.json'))" && echo "OK"
   ```

4. Tell the user:
   - Hooks are installed — companion will react to Claude Code activity
   - Start the companion app: `cd "${CLAUDE_PLUGIN_ROOT}" && pnpm tauri dev`
   - Or run the built app from Applications
   - Then run `/companion:enable` in each project where companion should be active
   - Restart Claude Code for hooks to take effect

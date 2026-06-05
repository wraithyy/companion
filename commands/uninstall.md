---
description: Remove the companion hook script from this machine.
---

Remove the Claude Code Companion hooks from this machine.

## Steps

1. Run the uninstall script:
   ```bash
   bash "${CLAUDE_PLUGIN_ROOT}/uninstall.sh"
   ```

2. Confirm hooks removed:
   ```bash
   python3 -c "import json; s=json.load(open('$HOME/.claude/settings.json')); print('companion' not in str(s.get('hooks','')))"
   ```

3. Tell the user hooks have been removed. Restart Claude Code for changes to take effect.

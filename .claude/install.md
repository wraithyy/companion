Install the Claude Code Companion hooks so that the companion app reacts to Claude Code activity in real time.

## Steps

1. Run the install script from the companion project directory:
   ```bash
   bash /Users/wraithy/Development/companion/install.sh
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
   - Start the companion app: `cd /Users/wraithy/Development/companion && pnpm tauri dev`
   - Or run the built app from Applications
   - Restart Claude Code for hooks to take effect

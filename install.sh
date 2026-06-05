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

echo "[companion] Hook script installed to $HOOK_DEST"
echo ""
echo "[companion] Next: open the Claude Code project where you want companion active,"
echo "            then run: /companion:enable"
echo "            (This adds hooks to that project's .claude/settings.local.json only)"

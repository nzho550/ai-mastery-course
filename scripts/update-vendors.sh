#!/usr/bin/env bash
set -e
MANIFEST="vendor/vendor-manifest.json"

dl() {
  local url="$1" dest="$2"
  mkdir -p "$(dirname "$dest")"
  curl -sSfL "$url" -o "$dest"
  echo "  OK  $dest"
}

echo "Updating marked..."
dl "$(jq -r '.marked.cdn' $MANIFEST)" vendor/marked.min.js

echo "Updating DOMPurify..."
dl "$(jq -r '.dompurify.cdn' $MANIFEST)" vendor/purify.min.js

echo "Updating Fuse.js..."
dl "$(jq -r '.fusejs.cdn' $MANIFEST)" vendor/fuse.min.js

echo "Updating highlight.js..."
dl "$(jq -r '.highlightjs.files.core.cdn' $MANIFEST)"                   vendor/highlight/highlight.min.js
dl "$(jq -r '.highlightjs.files.powershell.cdn' $MANIFEST)"             vendor/highlight/languages/powershell.min.js
dl "$(jq -r '.highlightjs.files["theme-dark"].cdn' $MANIFEST)"          vendor/highlight/github-dark.min.css
dl "$(jq -r '.highlightjs.files["theme-light"].cdn' $MANIFEST)"         vendor/highlight/github.min.css

echo "All vendor files updated."

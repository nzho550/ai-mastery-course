# Resource & Dependency Strategy

## Philosophy

The site ships with all vendor files **bundled in the repo** (`vendor/` folder).
This means it works offline with zero setup. CDN URLs are documented as the
authoritative source for version upgrades — not the primary load path.

```
Offline (default):  HTML → vendor/ folder (bundled, always works)
Online (optional):  swap src= to CDN URLs if you prefer live delivery
Update:             run scripts/update-vendors to refresh to latest versions
```

No module bundler. No `npm install`. No service worker magic.

---

## Dependency Registry

### JavaScript Libraries

| Library | Purpose | Version | Size (min+gz) | License |
|---------|---------|---------|---------------|---------|
| [marked.js](https://github.com/markedjs/marked) | Markdown → HTML | 15.0.12 | ~20 KB | MIT |
| [DOMPurify](https://github.com/cure53/DOMPurify) | Sanitize marked output | 3.2.6 | ~7 KB | Apache-2.0 |
| [highlight.js](https://highlightjs.org/) | Syntax highlighting | 11.11.1 | ~28 KB (common) | BSD-3-Clause |
| [Fuse.js](https://www.fusejs.io/) | Fuzzy search | 7.1.0 | ~8 KB | Apache-2.0 |

> **Why DOMPurify?** marked.js outputs raw HTML. Any lesson that contains
> user-visible code examples must be sanitized before `innerHTML` insertion
> to prevent XSS if lesson JSON is ever loaded from an untrusted source.

### CSS / Themes

| Asset | Purpose | Version | License |
|-------|---------|---------|---------|
| highlight.js — GitHub Dark theme | Code block colors | 11.11.1 | BSD-3-Clause |
| highlight.js — GitHub Light theme | Code block colors (light mode) | 11.11.1 | BSD-3-Clause |

### Fonts

Fonts are **optional** — the CSS variable stack falls back to system fonts
that look good on every OS without downloading anything extra.

```css
--font-ui:   'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-code: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
```

If you want the preferred fonts, download WOFF2 files to `assets/fonts/`
(see download script below) and they will be picked up automatically.

| Font | Purpose | Source | License |
|------|---------|--------|---------|
| [Inter](https://rsms.me/inter/) | UI text | Fontsource / Google Fonts | SIL OFL |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | Code blocks | Fontsource / Google Fonts | SIL OFL |

### Icons

**No icon library.** The ~18 icons used in the UI are inlined as SVG strings
in `js/icons.js`. This eliminates a CDN dependency entirely and keeps icon
rendering instant and offline-safe.

```js
// js/icons.js — example
export const icons = {
  checkCircle: `<svg xmlns="..." viewBox="0 0 24 24">...</svg>`,
  chevronRight: `<svg ...>...</svg>`,
  // ...
};
```

Source: [Lucide Icons](https://lucide.dev/) (ISC license) — copy only what's needed.

---

## Vendor Manifest

`vendor/vendor-manifest.json` is the single source of truth for all pinned
versions and CDN URLs. The update scripts read this file.

```json
{
  "marked": {
    "version": "15.0.12",
    "localFile": "vendor/marked.min.js",
    "cdn": "https://cdn.jsdelivr.net/npm/marked@15.0.12/marked.min.js",
    "sri": "sha384-<hash>",
    "license": "MIT",
    "homepage": "https://marked.js.org"
  },
  "dompurify": {
    "version": "3.2.6",
    "localFile": "vendor/purify.min.js",
    "cdn": "https://cdn.jsdelivr.net/npm/dompurify@3.2.6/dist/purify.min.js",
    "sri": "sha384-<hash>",
    "license": "Apache-2.0",
    "homepage": "https://github.com/cure53/DOMPurify"
  },
  "highlightjs": {
    "version": "11.11.1",
    "files": {
      "core":        { "local": "vendor/highlight/highlight.min.js",
                       "cdn":   "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js" },
      "theme-dark":  { "local": "vendor/highlight/github-dark.min.css",
                       "cdn":   "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css" },
      "theme-light": { "local": "vendor/highlight/github.min.css",
                       "cdn":   "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css" }
    },
    "license": "BSD-3-Clause",
    "homepage": "https://highlightjs.org"
  },
  "fusejs": {
    "version": "7.1.0",
    "localFile": "vendor/fuse.min.js",
    "cdn": "https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.min.js",
    "sri": "sha384-<hash>",
    "license": "Apache-2.0",
    "homepage": "https://www.fusejs.io"
  }
}
```

---

## Vendor Folder Structure

```
vendor/
├── vendor-manifest.json        # Version registry (source of truth)
├── marked.min.js
├── purify.min.js
├── fuse.min.js
└── highlight/
    ├── highlight.min.js        # Common languages bundle (not full)
    ├── github-dark.min.css
    └── github.min.css
```

---

## How Vendor Files Are Loaded in HTML

All HTML pages reference `vendor/` paths. CDN URLs are never in the HTML —
they live only in `vendor-manifest.json` and the update scripts.

```html
<!-- In <head> of index.html and lesson.html -->

<!-- Highlight.js theme — swapped by JS based on theme setting -->
<link id="hljs-theme" rel="stylesheet" href="vendor/highlight/github-dark.min.css">

<!-- Scripts: loaded before </body> -->
<script src="vendor/marked.min.js"></script>
<script src="vendor/purify.min.js"></script>
<script src="vendor/fuse.min.js"></script>
<script src="vendor/highlight/highlight.min.js"></script>

<!-- App scripts (ES modules) -->
<script type="module" src="js/app.js"></script>
```

Theme switching (dark/light) swaps the `href` on `#hljs-theme` — no reload needed.

---

## Update Scripts

### PowerShell (Windows)

`scripts/update-vendors.ps1`

```powershell
# Downloads all vendor files from CDN URLs in vendor-manifest.json
$manifest = Get-Content "vendor/vendor-manifest.json" | ConvertFrom-Json

function Download-File($url, $dest) {
    $dir = Split-Path $dest -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
    Invoke-WebRequest -Uri $url -OutFile $dest
    Write-Host "  OK  $dest"
}

Write-Host "Updating marked..."
Download-File $manifest.marked.cdn "vendor/marked.min.js"

Write-Host "Updating DOMPurify..."
Download-File $manifest.dompurify.cdn "vendor/purify.min.js"

Write-Host "Updating Fuse.js..."
Download-File $manifest.fusejs.cdn "vendor/fuse.min.js"

Write-Host "Updating highlight.js..."
Download-File $manifest.highlightjs.files.core.'cdn'         "vendor/highlight/highlight.min.js"
Download-File $manifest.highlightjs.files.'theme-dark'.'cdn'  "vendor/highlight/github-dark.min.css"
Download-File $manifest.highlightjs.files.'theme-light'.'cdn' "vendor/highlight/github.min.css"

Write-Host "All vendor files updated."
```

### Bash (Mac / Linux / WSL)

`scripts/update-vendors.sh`

```bash
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
dl "$(jq -r '.highlightjs.files.core.cdn' $MANIFEST)"         vendor/highlight/highlight.min.js
dl "$(jq -r '.highlightjs.files["theme-dark"].cdn' $MANIFEST)" vendor/highlight/github-dark.min.css
dl "$(jq -r '.highlightjs.files["theme-light"].cdn' $MANIFEST)" vendor/highlight/github.min.css

echo "All vendor files updated."
```

### Font Download (optional, run separately)

`scripts/download-fonts.ps1` / `.sh` — downloads Inter + JetBrains Mono WOFF2
subsets to `assets/fonts/` and injects `@font-face` into `css/variables.css`.

Sources:
- `https://fontsource.org/fonts/inter` — grab `inter-latin-400/500/600/700-normal.woff2`
- `https://fontsource.org/fonts/jetbrains-mono` — grab `jetbrains-mono-latin-400/700-normal.woff2`

---

## CDN-Only Mode (Optional Swap)

If someone is always online and prefers live CDN delivery (e.g., always-current
security patches without re-running the update script), they swap the `<script src>`
paths in `index.html` and `lesson.html` to the CDN URLs from `vendor-manifest.json`.

This is documented in `README.md` as an advanced option, not the default.

---

## highlight.js Language Coverage

The "common" bundle covers these languages relevant to the course:

| Language | Covered by common bundle |
|----------|--------------------------|
| bash / shell | Yes |
| powershell | Yes (via separate lang file) |
| javascript | Yes |
| html / xml | Yes |
| css | Yes |
| json | Yes |
| python | Yes |
| markdown | Yes |

For PowerShell specifically, load the extra language file:
```html
<script src="vendor/highlight/languages/powershell.min.js"></script>
```
Add this file to the manifest and update script.

---

## Security Notes

| Concern | Mitigation |
|---------|------------|
| XSS via lesson JSON markdown | DOMPurify sanitizes all marked.js output before `innerHTML` |
| Tampered vendor files | SRI hashes in manifest — add verification step to update script |
| CDN outage | Irrelevant — vendor files are local |
| localStorage data leakage | Only stores progress + settings, never user-entered content |

---

## Resolved Design Decisions

| Question | Decision | Reason |
|----------|----------|--------|
| Markdown parser | marked.js v15 (vendored) | Battle-tested, tiny, actively maintained |
| Sanitization | DOMPurify (vendored) | Defense-in-depth; trivial to add |
| Icons | Inline SVGs from Lucide | Zero dependency, instant render, offline-safe |
| Fonts | System stack + optional WOFF2 | Works great offline with no downloads |
| Syntax highlighting | highlight.js common bundle | Right balance of size vs. language coverage |
| Search | Fuse.js (vendored) | Fuzzy client-side search, no server needed |
| Offline delivery | Vendor files bundled in repo | Zero-setup, works on `file://` immediately |
| CDN role | Update source only, not load path | Single mental model for offline users |

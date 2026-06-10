# Re-downloads all vendor files from CDN URLs in vendor-manifest.json
$manifest = Get-Content "vendor\vendor-manifest.json" | ConvertFrom-Json

function Download-File($url, $dest) {
    $dir = Split-Path $dest -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    Write-Host "  OK  $dest"
}

Write-Host "Updating marked..."
Download-File $manifest.marked.cdn "vendor\marked.min.js"

Write-Host "Updating DOMPurify..."
Download-File $manifest.dompurify.cdn "vendor\purify.min.js"

Write-Host "Updating Fuse.js..."
Download-File $manifest.fusejs.cdn "vendor\fuse.min.js"

Write-Host "Updating highlight.js..."
Download-File $manifest.highlightjs.files.core.cdn         "vendor\highlight\highlight.min.js"
Download-File $manifest.highlightjs.files.powershell.cdn   "vendor\highlight\languages\powershell.min.js"
Download-File $manifest.highlightjs.files.'theme-dark'.cdn  "vendor\highlight\github-dark.min.css"
Download-File $manifest.highlightjs.files.'theme-light'.cdn "vendor\highlight\github.min.css"

Write-Host "`nAll vendor files updated."

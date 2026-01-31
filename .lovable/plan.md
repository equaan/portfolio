

# SEO Fix Plan for Google Search Console

## Summary
Fix your sitemap and robots.txt configuration so Google Search Console can properly fetch and index your portfolio site.

---

## Changes Required

### 1. Move sitemap.xml to public folder
Move `sitemap.xml` from the root directory into the `public/` folder so it gets deployed with your site.

**After this change, your sitemap will be accessible at:**
`https://equaan.github.io/portfolio/sitemap.xml`

---

### 2. Update public/robots.txt
Update the robots.txt in the public folder to include the correct sitemap URL:

```text
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://equaan.github.io/portfolio/sitemap.xml
```

---

### 3. Delete root-level robots.txt
Remove the `robots.txt` file in the root directory (not in public) since it's not being deployed and causes confusion.

---

### 4. Fix Open Graph image URLs
Update `index.html` to use raw GitHub URLs for the OG images:

**From:**
```
https://github.com/equaan/portfolio/blob/main/og-image.png
```

**To:**
```
https://raw.githubusercontent.com/equaan/portfolio/main/og-image.png
```

---

## After Implementation

Once deployed, submit this URL in Google Search Console's sitemap section:
```
https://equaan.github.io/portfolio/sitemap.xml
```

Or just:
```
sitemap.xml
```

(Since your property is set to `https://equaan.github.io/portfolio/`)

---

## Technical Details

| File | Action | Reason |
|------|--------|--------|
| `sitemap.xml` → `public/sitemap.xml` | Move | Vite only deploys files from `public/` to `dist/` |
| `public/robots.txt` | Update | Add Sitemap directive with correct URL |
| `robots.txt` (root) | Delete | Not deployed, causes confusion |
| `index.html` | Update | Fix OG image URLs for social sharing |

### File Structure After Fix
```text
public/
├── favicon.ico
├── placeholder.svg
├── resume.pdf
├── robots.txt      ← Updated with Sitemap directive
└── sitemap.xml     ← Moved here
```


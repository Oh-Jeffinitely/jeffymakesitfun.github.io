# Favicon Setup Instructions

## Quick Setup

You have a fantastic JM graphic that will make a perfect favicon! Follow these steps:

### Step 1: Create Favicon Files

Use one of these free online tools to convert your JM image to favicon format:

1. **RealFaviconGenerator** (Recommended)
   - Visit: https://realfavicongenerator.net/
   - Upload your JM image
   - It will generate all necessary sizes and formats
   - Download the package

2. **Favicon.io**
   - Visit: https://favicon.io/favicon-converter/
   - Upload your image
   - Download the generated files

### Step 2: What You'll Get

The tools will create multiple files:
- `favicon.ico` (classic favicon)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180 for iOS)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest` (optional, for PWA)

### Step 3: Place Files

Put all the favicon files in the **root directory** of your site:
```
jeffymakesitfun.github.io/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest (optional)
```

### Step 4: Update HTML Files

I'll update all your HTML files with the proper favicon links in the next step!

### Step 5: Create Open Graph Image

For social media sharing (Facebook, LinkedIn, Twitter):
1. Create a 1200x630px version of your JM image
2. Save it as `assets/og-image.jpg` or `assets/og-image.png`
3. I'll update the meta tags to reference it

## Current Status

✅ Assets folder created
✅ HTML files will be updated with favicon links
⏳ You need to add the actual favicon image files
⏳ You need to create the Open Graph image (1200x630px)

## Testing Your Favicon

After adding the files:
1. Clear your browser cache
2. Visit your site
3. Check the browser tab for your JM logo
4. Test on mobile devices to see the app icon

## Troubleshooting

If favicon doesn't show:
- Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
- Clear browser cache completely
- Wait a few minutes (browsers cache favicons aggressively)
- Check file paths are correct
- Ensure files are in the root directory

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CentroEsteticoMaristella is a static website for an Italian beauty salon. It uses vanilla HTML, CSS, and JavaScript with jQuery 3.7.1 (loaded from CDN). There is no build system, package manager, or framework.

**Language**: All content is in Italian.

## Development

No build or test commands exist. To develop:
- Open HTML files directly in a browser or use a simple HTTP server
- Deployment is manual file upload to Siteground hosting

## Architecture

### HTML Pages
- 12 HTML pages in root directory (index.html is the main entry point)
- `header_navbar.html` and `footer.html` are reusable templates loaded dynamically via jQuery

### CSS
- `CSS/style.css` - Main stylesheet (1000+ lines)
- `cookie-consent.css` - Cookie banner styles
- Color scheme: purple `#A555EC`, light pink `#F8E8EE`, background `#F9F5F6`
- Responsive breakpoint: 950px separates laptop/tablet from mobile

### JavaScript (in /JS directory)
- `header_navbar.js` - Navigation logic, mobile menu, sticky header, touch detection
- `centro.js` - Homepage image carousel
- `prezzi.js` - Loads prices dynamically from prezzi.csv
- `viso_corpo.js` - Treatment card interactions with smooth scroll
- `cookie-consent.js` - GDPR cookie consent banner using localStorage
- `script.js` - Footer loading

### Dynamic Pricing System
Prices are stored in `prezzi.csv` (semicolon-delimited: `Trattamento;Id;Prezzo`). The `prezzi.js` script populates HTML elements with `id="price-{id}"` automatically from the CSV data.

### Assets
- `/images/` - Organized by category (Centro, Trattamenti, Macchinari, Mani, Pedicure, Ciglia, Trucco, Post)
- `/video/` - Video files
- SVG icons in images root (chevron, clock, geo, facebook, instagram)

## Key Patterns

- Navigation has separate laptop and phone versions (`laptop_ul` / `phone_ul`) with conditional display via CSS
- Touch device detection adjusts click/hover behavior
- Cookie consent uses localStorage key `cookieConsent_v2`
- Treatment pages use card layouts with "Scopri di più" expand functionality

## Known TODOs

Active development items are tracked in `TODO.txt` (in Italian), including responsive fixes, accessibility improvements, and code refactoring to reduce redundancy.

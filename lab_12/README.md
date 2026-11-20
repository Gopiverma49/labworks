# Lab 12: Dynamic Online Purchase Web Application

A dynamic, eye-catching e-commerce web platform engineered using **CSS3**, **JavaScript (DOM manipulation & XML parsing)**, and **XML** data storage.

---

## 🌟 Key Requirements & Implementation

### 1. Dedicated Dynamic Web Pages
The project contains all requested pages with consistent navigation and shared styling:

| Required Page | File | Purpose & Dynamic Features |
| :--- | :--- | :--- |
| **Home Portal** | [index.html](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/index.html) | High-impact motion scroll hero, kinetic marquee ticker, 3D card tilt, live stock indicators, and quick purchase shortcuts. |
| **Item** | [items.html](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/items.html) | Real-time catalog populated from XML, category filtering (Audio, Wearables, Gaming, Lifestyle), live text search, sorting, and hardware specs drawer. |
| **Price** | [price.html](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/price.html) | Dynamic price comparison matrix, tiered valuation cards, real-time multi-currency converter (USD, EUR, GBP, JPY, INR), and interactive discount calculator. |
| **Stock Pictures of Item** | [stock-pictures.html](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/stock-pictures.html) | Multi-angle photography viewer for each item parsed from XML `<stockPictures>`, interactive hover zoom lens, angle switcher pills, live stock counter, and full-screen lightbox. |
| **Purchase** | [purchase.html](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/purchase.html) | Direct checkout terminal with customer details, payment methods, live coupon codes (`SAVE20`), sales tax calculation, **real-time stock deduction in XML DOM**, and animated invoice confirmation. |

---

## 🎨 Visual Identity & Anti-Boring Design (Non-Agentic)

To avoid bland, generic "agentic" templates (purple dark mode, dull cyan, Inter font), **AURA** employs a vivid modern editorial aesthetic:
- **Display Typography**: `Syne` (high-contrast, expressive fashion display) paired with `Outfit` (clean geometric body) and `JetBrains Mono` for code/data.
- **Electric Color Palette**:
  - Radiant Flame Orange (`#FF5E3A`) & Vivid Sunset Coral (`#FF2A5F`)
  - Neon Volt Lime (`#CCFF00`) for high-urgency callouts & badges
  - Deep Obsidian Velvet (`#08090D`) with luminous mesh backlights
- **Motion Scroll & Kinetic Features**:
  - **Dynamic Scroll Progress Bar**: Gradient bar at top that tracks scroll position.
  - **3D Card Perspective Tilt**: Product cards tilt in 3D space (`perspective(1000px) rotateX(...) rotateY(...)`) following cursor movements.
  - **Kinetic Marquee Ribbon**: Continuously moving horizontal ribbon that loops seamlessly.
  - **Scroll-Triggered Reveals**: IntersectionObserver animations (`.reveal`, `.reveal-left`, `.reveal-right`).
  - **Live Inventory Counters & Radar Pulses**: Real-time pulsing alert dots for items nearing stock depletion.

---

## 📄 XML Architecture & DOM Manipulation

All items, prices, inventory stocks, multi-angle images, specifications, and badges are stored in [data/products.xml](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/data/products.xml):

```xml
<catalog>
  <item id="ITM-101" category="Audio" featured="true">
    <title>NovaPro Spatial Headphones</title>
    <tagline>Lossless Cinematic Audio with Neural Isolation</tagline>
    <price currency="USD">299.00</price>
    <originalPrice currency="USD">389.00</originalPrice>
    <discountPercent>23</discountPercent>
    <stock status="low" quantity="8" urgency="Critical">8</stock>
    <coverImage>...</coverImage>
    <stockPictures>
      <picture angle="Front Profile" isHero="true">...</picture>
      <picture angle="Studio Isometric">...</picture>
      <picture angle="Lifestyle Wearing">...</picture>
    </stockPictures>
    <specifications>
      <spec label="Driver">50mm Beryllium</spec>
    </specifications>
  </item>
</catalog>
```

### Parsing Pipeline (`js/xml-parser.js`):
1. Loads `products.xml` asynchronously via `fetch()` (with embedded fallback string for seamless execution under `file:///` local double-click).
2. Parses text into an XML Document Tree via `new DOMParser().parseFromString(xmlText, 'text/xml')`.
3. Traverses DOM nodes using `getElementsByTagName()`, `getAttribute()`, and `querySelector()`.
4. Handles **dynamic stock deduction**: when a purchase occurs, the in-memory XML DOM `<stock>` node is decremented and persisted.
5. Includes a **Live XML Inspector** button in the header so professors can inspect the exact raw XML document being manipulated in real time.

---

## 🚀 How to Run and Test

### Option 1: One-Click Local Server (Recommended)
Double-click [run_server.bat](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/run_server.bat). This starts a local Python web server on port 8000 and immediately opens `http://localhost:8000/index.html`.

### Option 2: Direct Browser Double-Click
Simply double-click [index.html](file:///d:/jain/WEB%20PROGRAMMING/LAB_WORKS/lab_12/index.html) in Windows File Explorer. The embedded fallback XML DOM parser ensures all features work without needing a web server.

### Promo Voucher Codes to Test:
- `SAVE20`: Unlocks an instant **20% discount** on your cart.
- `VIP30`: Unlocks a **30% VIP discount** on your cart.

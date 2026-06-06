# LetterCraft AI

> 🚀 AI-Powered Kannada & English Document Generator with PDF Export

LetterCraft AI is a modern, web-based document generator that creates professional letters, applications, certificates, agreements, and more — in both **Kannada** and **English**. It features an AI assistant that understands your requirements, generates appropriate document templates, and lets you fill them via dynamic forms. Export as a beautiful PDF or print directly.

---

## ✨ Features

### AI Document Composer
- **Describe what you need** in plain language: *"Leave application for 3 days in Kannada for a school teacher"*
- AI **detects the document type** (leave application, justification, complaint, certificate, rent agreement, affidavit, etc.)
- AI **chooses the right format, theme, and all necessary fields** automatically
- Supports **Generate**, **Correct**, and **Modify** modes

### Multi-Language Support
- **Kannada** (formal written Kannada — ಶುದ್ಧ ಕನ್ನಡ)
- **English** (formal professional English)
- **Mixed mode** (Kannada + English with English placeholders)
- Proper honorifics, salutations, and closings for both languages

### PDF Upload & Auto-Extract
- Upload any PDF sample and extract text automatically using `PDF.js`
- Convert extracted text into a fillable template with AI

### 16 Colorful Themes
- Government, Corporate, Medical, School, Legal, Personal, Minimal, Indigo, Teal, Purple, Nature, Ocean, Sunset, Festival, Rose, Dark
- Each theme has custom colors, headers, and watermarks
- Live preview updates instantly

### Dynamic Form Generation
- Type `{{name}}`, `{{date}}`, `{{address}}` in the template
- App automatically creates the right input fields (text, date, textarea)
- Smart field type detection based on placeholder names

### Grammar & Format Knowledge Base
- Built-in **English grammar rules** for formal writing (contractions, connectors, voice, punctuation)
- Built-in **Kannada formal writing guide** (honorifics, structure, common mistakes)
- Click **Grammar** to open the reference panel anytime

### PDF Export & Print
- One-click **A4 PDF export** using `html2pdf.js`
- Preserves Kannada script perfectly via canvas rendering
- Browser print support with print-optimized styles

### Progressive Web App (PWA)
- Works offline after first load
- Installable on Android (Add to Home Screen)
- Service worker for caching
- Mobile-optimized responsive layout

---

## 📁 Project Structure

```
letter-generator-app/
├── index.html              # Main app entry point
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline caching
├── css/
│   └── styles.css          # All styles, themes, animations
├── js/
│   ├── kannada-data.js     # Kannada grammar, templates, phrases
│   ├── english-data.js     # English grammar, templates, connectors
│   ├── themes.js           # 16-color theme engine
│   ├── pdf-handler.js      # PDF upload and text extraction
│   ├── ai.js               # AI chat integration (OpenAI/OpenRouter/Groq)
│   └── app.js              # Main application logic
├── assets/                 # Icons for PWA (add your own)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md
```

---

## 🚀 Quick Start (Web)

1. **Clone or download** this repository
2. **Open** `index.html` in any modern browser (Chrome, Edge, Firefox, Safari)
3. No server required — it works entirely in the browser

> Note: Requires internet connection to load CDN libraries (Tailwind, PDF.js, html2pdf.js, Google Fonts) and to use the AI features.

---

## 📱 Android App Setup (Capacitor)

You can wrap this web app as a native Android app using **Capacitor**:

### Prerequisites
- Node.js installed
- Android Studio installed
- Android SDK configured

### Steps

```bash
# 1. Navigate to the project directory
cd letter-generator-app

# 2. Initialize a Capacitor project
npm init -y
npm install @capacitor/core @capacitor/cli

# 3. Create capacitor.config.json
cat > capacitor.config.json << 'EOF'
{
  "appId": "com.yourname.lettercraft",
  "appName": "LetterCraft AI",
  "webDir": ".",
  "bundledWebRuntime": false
}
EOF

# 4. Add Android platform
npx cap add android

# 5. Sync the web code to the Android project
npx cap sync

# 6. Open Android Studio
npx cap open android
```

In Android Studio:
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Or run on a connected device/emulator

### For offline fonts (Android)
For the app to work fully offline on Android, consider downloading Google Fonts and loading them locally instead of from the CDN.

---

## 🔑 AI Setup

The app supports any **OpenAI-compatible API**:

| Provider | Endpoint | Model |
|----------|----------|-------|
| **OpenAI** | `https://api.openai.com/v1/chat/completions` | `gpt-4o-mini` |
| **OpenRouter** | `https://openrouter.ai/api/v1/chat/completions` | `openai/gpt-4o-mini` |
| **Groq** | `https://api.groq.com/openai/v1/chat/completions` | `llama-3.1-70b-versatile` |

1. Click **AI Compose** → **Settings**
2. Enter your **API Key** and **Endpoint**
3. Click **Save**
4. Click **Test** to verify connection

Your API key is stored **only in your browser** (localStorage). It never leaves your device except to the API endpoint you choose.

---

## 📝 Usage Examples

### Example 1: Kannada Leave Application
```
AI Compose → Generate
"Generate a leave application in Kannada for 3 days for a school teacher"
→ AI creates a Kannada leave application with fields:
   {{date}}, {{recipient_name}}, {{institution_name}}, {{leave_days}}, {{reason}}, {{start_date}}, {{end_date}}, {{applicant_name}}, {{phone}}
```

### Example 2: English Justification Letter
```
AI Compose → Generate
"Create a justification letter for late coming to office in formal English"
→ AI creates a formal justification letter with appropriate fields and corporate theme
```

### Example 3: Rent Agreement
```
AI Compose → Generate
"Build a rent agreement for house in Bangalore, 11 months, 15000 rent"
→ AI creates a legal rent agreement template with landlord/tenant fields
```

### Example 4: Modify Existing Document
```
Write a template with {{name}}, {{date}}
AI Compose → Modify
"Add witness section and notary stamp area"
→ AI adds {{witness1_name}}, {{witness2_name}}, {{notary_stamp}} fields
```

### Example 5: Correct Grammar
```
Paste a rough letter in the template editor
AI Compose → Correct
→ AI fixes grammar, spelling, tone, and formal structure
```

---

## 🎨 Theme Preview

| Theme | Best For | Color |
|-------|----------|-------|
| Government | Official letters, applications | Navy Blue |
| Corporate | Experience certificates, NOC | Dark Slate |
| Medical | Medical certificates, fitness | Green |
| School | Bonafide, student letters | Amber |
| Legal | Affidavit, court documents | Maroon |
| Personal | Family letters, requests | Rose |
| Nature | Environmental complaints | Forest Green |
| Ocean | Coastal/marine documents | Ocean Blue |
| Sunset | Warm, festive invitations | Orange |
| Festival | Celebration invitations | Red |
| Minimal | Clean, simple documents | Gray |

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, Tailwind CSS (via CDN)
- **PDF Export**: html2pdf.js (HTML → Canvas → PDF)
- **PDF Reading**: PDF.js (Mozilla)
- **Fonts**: Google Fonts (Noto Sans Kannada, Roboto, Inter, Noto Serif)
- **AI**: OpenAI API / OpenRouter / Groq (OpenAI-compatible)
- **PWA**: Service Worker, Web App Manifest
- **Android**: Capacitor (optional wrapper)

---

## 📜 License

MIT License — Free for personal and commercial use.

---

## 🙏 Credits

- **PDF.js** — Mozilla
- **html2pdf.js** — eKoopmans
- **Tailwind CSS** — Tailwind Labs
- **Noto Sans Kannada** — Google Fonts / Noto Project

---

## 🚀 GitHub Push Instructions

```bash
git init
git add .
git commit -m "Initial commit: LetterCraft AI - Kannada & English Document Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lettercraft-ai.git
git push -u origin main
```

For GitHub Pages hosting:
1. Go to repository → Settings → Pages
2. Source: Deploy from a branch → main → / (root)
3. Your app will be live at `https://YOUR_USERNAME.github.io/lettercraft-ai/`

---

Made with ❤️ for Kannada & English document writers everywhere.

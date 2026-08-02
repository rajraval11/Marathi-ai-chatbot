# 🚩 SaarthiAI — Offline Marathi Government Services Chatbot

**SaarthiAI** is a 100% **offline, privacy-first conversational chatbot** designed to assist citizens of Maharashtra with government services (आधार कार्ड, पॅन कार्ड, पासपोर्ट, रेशन कार्ड, ड्रायव्हिंग लायसन्स, दाखले, इ.) in native Marathi, Roman Marathi, and mixed Marathi-English queries.

Built specifically without any dependency on external LLMs, cloud AI, or internet APIs, SaarthiAI operates using local **Marathi Natural Language Processing (NLP)**, custom **TF-IDF Vectorization**, **Cosine Similarity Search**, **Unicode Text Normalization**, and a client-side **SQLite database**.

---

## 🚀 Key Highlights & Architecture

- 🛡️ **100% Offline & Internet-Independent**: Zero external API dependencies (No Gemini, OpenAI, Google Cloud, or third-party web services).
- 🧠 **Local Marathi Natural Language Engine**:
  - **Intent Detection Layer**: Instant rule-based detection for greetings (*नमस्कार, हाय*), gratitude (*धन्यवाद*), farewells (*बाय*), and small talk before TF-IDF vectorization.
  - **Roman Marathi & Phonetic Normalizer**: Translates Latin script / Hinglish / Roman Marathi (*"adhar card sathi documents"*, *"passport fee kiti"*, *"pan card apply"*) into canonical Devanagari Marathi prior to matching.
  - **Unicode Normalizer**: Strips Devanagari diacritics, removes punctuation, and standardizes spelling variants (*उदा. आधार / आधार्*).
  - **Custom TF-IDF Vectorizer & Cosine Similarity**: Matches citizen queries against a pre-indexed corpus of 396+ government knowledge records with sub-millisecond response times.
- 💬 **Conversational Interactive Guidance**:
  - Guides users naturally with topic selection chips (*📄 आवश्यक कागदपत्रे, 📝 अर्ज प्रक्रिया, 💰 शुल्क, ⏳ कालावधी, ✅ पात्रता*).
  - Contextual follow-up suggestions after every answer.
- 🗄️ **Embedded SQLite Database Engine**:
  - Uses `sql.js` (WebAssembly SQLite) for client-side persistence and query processing.
  - Full CRUD administrative dashboard for dataset management, index rebuilds, and CSV import/export.
- 🔒 **Security & Performance**:
  - Sub-50ms query latency.
  - Strict input truncation (>500 chars) and HTML tag sanitization to prevent XSS and malformed input crashes.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend UI** | React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion |
| **Database** | Embedded SQLite (`sql.js` WASM), LocalStorage Sync |
| **NLP & Search Engine** | Custom Marathi NLP Pipeline, TF-IDF Vectorizer, Cosine Similarity |
| **Backend Option** | FastAPI (Python) or Standalone React SPA |
| **Build System** | Vite 6 |

---

## 📁 Project Structure

```
.
├── index.html                  # HTML entry point with SaarthiAI branding
├── package.json                # Offline dependencies
├── metadata.json               # Applet capabilities declaration
├── README.md                   # Comprehensive project documentation
├── vite.config.ts              # Vite configuration
└── src/
    ├── App.tsx                 # Main application layout & page router
    ├── components/
    │   ├── ChatWorkspace.tsx   # Conversational Chatbot UI with chip actions
    │   └── Sidebar.tsx         # Conversation history & service navigation
    ├── data/
    │   └── initialData.ts      # Default 396+ Marathi Government Service Records
    ├── db/
    │   └── sqliteManager.ts    # Client-side SQLite & LocalStorage synchronization
    ├── nlp/
    │   ├── marathiEngine.ts    # TF-IDF, Cosine Similarity, & Intent Layer
    │   └── romanMarathiNormalizer.ts # Roman Marathi to Devanagari normalization
    └── pages/
        ├── AdminDashboardPage.tsx # Administrative management console
        ├── DocumentChecklistPage.tsx # Document requirements view
        ├── AnalyticsPage.tsx   # Query analytics & statistics
        └── UserGuidePage.tsx   # How-to guide & manual
```

---

## 💻 Local Setup & Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Startup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/saarthiai-marathi-chatbot.git
   cd saarthiai-marathi-chatbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Type check and linting**:
   ```bash
   npm run lint
   ```

---

## 🧪 Testing & Validation

SaarthiAI has undergone comprehensive multi-phase testing:
- **100+ Functional & NLP Test Cases**: Verified across greetings, Roman Marathi, mixed English-Marathi queries, typos, and follow-ups.
- **Security Audit**: Tested against XSS script injection, large payloads (>10,000 chars), SQL injection patterns, and malformed Unicode.
- **Offline Integrity**: 100% operational in isolated network environments with zero external HTTP API calls.

---

## 📄 License

This project is licensed under the MIT License — feel free to use and adapt for offline civic tech solutions and educational projects.

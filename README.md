# HoneyChain 🍯⛓️

> **National Decentralized Apiculture Platform & Web3 Provenance Ledger**  
> An enterprise-grade, end-to-end prototype integrating IoT hive monitoring, bio-acoustic colony analysis, decentralized cryptographic batch provenance, and consumer-facing verification.

---

## 🌟 Key Features & Architecture

1. **IoT Fleet Telemetry & Mesh Gateway**
   - Real-time micro-climate monitoring (temperature, humidity, acoustic frequency, internal hive mass).
   - Live telemetry polling simulation with jitter calculation and connection health checks.
   - Built-in Web Audio API frequency synthesizer (240 Hz worker hum vs. 310 Hz queen piping / 480 Hz swarm alarm).
   - HTML5 Canvas real-time acoustic waveform visualizer.

2. **AI Colony Health Diagnostics**
   - Swarm risk radar scoring, queen vigor index, and acoustic variance detection.
   - Emergency dispatch alert triggers and apiary-level field inspection logging.

3. **Decentralized Batch Minting & Web3 Provenance**
   - 4-Stage cryptographic consensus pipeline:
     1. SHA-256 Telemetry Hash generation.
     2. IPFS CID provenance seal.
     3. Polygon PoS consensus verification (simulated distributed node confirmation).
     4. Dynamic ERC-1155 batch NFT registration.
   - Real-time yield-to-unit calculator (bulk kg to consumer glass jars).

4. **Distributed Traceability & Regulatory Ledger**
   - Cryptographic milestone audit trail from hive harvest to retail distribution.
   - NABL & FSSAI certified lab metrics (NMR purity scan, C4 sugar analysis, pollen profile, HMF level).
   - Interactive certificate inspection and on-chain ledger explorer modals.

5. **Consumer Transparency & Micro-Escrow**
   - Mobile-first QR verification interface with cryptographic integrity badges.
   - Direct-to-farmer UPI micro-escrow tip system (0% intermediary fees).
   - Interactive provenance proof inspector with tamper-evident certificate hashes.

6. **Unified Stakeholder Experience**
   - On-page stakeholder switcher across 5 enterprise roles:
     - **Rural Beekeeper / FPO Partner**
     - **Processing Plant & Packaging Facility**
     - **Accredited Testing Laboratory (NMR & Pollen)**
     - **Government Regulatory & Field Auditor**
     - **Consumer & Retail Verifier**
   - Persistent `localStorage` data store (`HoneyDataStore`) maintaining state across sessions.
   - Global Screen Switcher HUD for seamless evaluation.

---

## 🖥️ Screen Overview

| # | Screen | Description | File |
|---|--------|-------------|------|
| 1 | **Overview & Landing** | Platform architecture, live cluster status, metrics | [`index.html`](index.html) |
| 2 | **Secure Gateway** | Role-based OTP authentication & node authorization | [`login.html`](login.html) |
| 3 | **Beekeeper Command Center** | Fleet telemetry, cluster filters, inspection logging | [`beekeeper-dashboard.html`](beekeeper-dashboard.html) |
| 4 | **Hive Telemetry & Audio** | Live sensor telemetry, FFT bio-acoustic synthesizer | [`telemetry.html`](telemetry.html) |
| 5 | **AI Colony Health** | Predictive swarm radar, queen vigor analysis | [`ai-health.html`](ai-health.html) |
| 6 | **Harvest & Minting** | Web3 batch registration, SHA-256 & IPFS sealing | [`harvest-batch.html`](harvest-batch.html) |
| 7 | **Traceability Ledger** | Immutable milestone timeline, NABL NMR certificates | [`batch-traceability.html`](batch-traceability.html) |
| 8 | **Consumer Verification** | Public QR scan page, NMR purity seal, farmer tips | [`consumer-qr.html`](consumer-qr.html) |

---

## 🚀 Getting Started

No build tools or heavy installations required. The platform is crafted with pure standards-compliant modern JavaScript and Tailwind CSS.

### Run with Python (Built-in HTTP Server)
```bash
# In the project root directory
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

### Run with Node.js
```bash
npx serve . -p 8080
```

---

## 🛠️ Technology Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, Canvas API, Web Audio API
- **Styling:** Tailwind CSS (Modern Theme System), Material Symbols, Google Fonts
- **State Management:** Reactive `HoneyDataStore` with persistent browser `localStorage`
- **Cryptography & Web3 Simulation:** SHA-256 telemetry hashing, IPFS CID generation, Polygon PoS consensus simulation

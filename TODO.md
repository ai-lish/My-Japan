# TODO — my-japan-web-app [WIP: initial commit]

> Snapshot from 2026-06-19. This file tracks what is **intentionally missing or stubbed** in this initial commit.

## ⛔ Known issues from source truncation

The original `index.html` source was truncated mid-function at:

```js
if (imagePreset === "okinawa") imgUrl = "
```

MacD added a `// <<< TRUNCATION POINT >>>` marker at that location and closed the JS scope with **minimum-viable stubs** so the page renders. Missing functionality that needs to be patched in:

- [ ] Complete `submitNote()` — finishes the okinawa image preset, modal close, sync queue entry, and gacha point award
- [ ] `simulateCheckin()` — proper region-based dialect unlock + checklist feedback
- [ ] `playMusicBGM()` — actual fetch to backend music proxy (currently stub log only)
- [ ] `triggerGacha()` — full prize pool with rarity tiers (currently deducts points, no prize selection)
- [ ] `interactWithPet('feed')` — proper affinity + BGM trigger
- [ ] `toggleNetworkStatus()` — toggle `onlineMode`, refresh `syncBadge`, replay syncQueue on online
- [ ] `forceSyncNow()` — actual Last-Write-Wins resolution of `syncQueue`
- [ ] `addDialogueToFSRS()` — proper card generation flow
- [ ] `saveConfigMock()` — persist Firebase config to localStorage with warning
- [ ] `getSimulatedLocation()` — GeoLocation API fallback chain

## 🖼️ Missing assets

- [ ] `icons/icon-192.png` — referenced in `manifest.webmanifest`, not yet created
- [ ] `icons/icon-512.png` — same
- [ ] (recommended) `icons/icon-maskable-512.png` for adaptive icon support

## 🔒 Backend security proxy (referenced in HTML comments but not in repo)

The HTML contains a Phase-2 API contract draft for three endpoints, **none of which are implemented**:

- [ ] `POST /api/minimax/vision-to-cards` — image-to-cards extraction (Firebase ID Token auth, 10 req/user/hr)
- [ ] `POST /api/minimax/tts` — speech-2.8-hd TTS with offline cache (Firebase ID Token auth, 100 req/user/day)
- [ ] `POST /api/minimax/music` — Music-2.6 BGM creation (Firebase ID Token auth, 2 req/user/day)

These should live in a separate repo (e.g. `ai-lish/my-japan-proxy` or Cloudflare Workers) and **NEVER** in this client-side repo.

## 🔑 Firestore data model

Schema is fully documented in `README.md` §4. No implementation yet — needs:

- [ ] Security rules
- [ ] Client SDK wrapper with auth.currentUser.uid validation
- [ ] Offline-first queue with conflict copy handling

## 🚀 Deployment

- [ ] GitHub Pages settings — `Settings > Pages > Source: main / root`
- [ ] Custom domain (optional)
- [ ] PWA install verification on iOS Safari + Android Chrome

## 🤝 Collaborator

- [x] `math-lish` invited as collaborator with **push** permission — ✅ **accepted** (verified 2026-06-20 via `/collaborators` endpoint)
- [x] Owner: `ai-lish` user
- [x] Repo renamed `my-japan-web-app` → `My-Japan` on 2026-06-20
- [x] Visibility: PUBLIC

---

_Last updated by MacD on initial commit. Patch each item before promoting beyond prototype._

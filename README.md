# My-Japan（心の日本）

My-Japan（心の日本）是一款專為日語高級學習者（JLPT N1/N2 衝刺）與日本深度旅遊愛好者設計的行動優先 Web App。本專案採用「本機優先、雲端協同」的 PWA 架構，使用者可將其直接「儲存至手機主畫面」作為隨身筆記本與 AI 助教。即使在無網路的日本地下鐵、鄉間鐵道或山林神社中，你依然能流暢背誦字卡、記錄旅行見聞，並在恢復連線後透過安全代理呼叫 MiniMax 多模態 AI 進行深度語境生成與文化配樂。

My-Japan 採用**單人開發、AI 輔助模式（Gemini + Claude 協作）**構建，是一個完全公開且歡迎社群共同維護與使用的開源專案。

-----

## 1. 專案概覽

- **專案定位**：JLPT N1/N2 語音記憶字卡 + 日本隨身旅行日記 PWA。
- **開發模式**：單人開發（AI 共創，由 Claude 進行架構規劃與提示詞設計，Gemini 執行程式碼生成與修改）。
- **設計理念**：不因通過 N1 考試而停止使用。它是一本伴隨你一生的日語學習與日本文化數位大腦。
- **託管與部署**：前端支援 GitHub Pages 一鍵部署，後端安全代理支援 Firebase Functions、Cloudflare Workers 等無伺服器架構。

-----

## 2. 功能特色

### 📖 學習模組（Learning）

- **FSRS 智能排程**：內建自由間隔重複排程（FSRS）演算法，根據記憶遺忘曲線動態精確調整下一輪複習時間。
- **離線記憶庫**：支援上萬張單字與文法卡片本地 IndexedDB 快取，斷網環境下依體系流暢複習。

### 🗺️ 旅遊與隨身筆記模組（Travel）

- **日本見聞即時採集**：支援實地拍照、語音錄音與文字隨筆，隨時隨地記錄旅行足跡。
- **多維度標籤體系**：支援自定義雙向標籤，例如 `#N1文法`、`#東京美食`、`#京都避暑`、`#2026年度語句`。
- **地理與時間軌跡**：自動記錄筆記的建立時間與地理坐標，在手機端渲染出個人的「日本足跡地圖」。

### 🎵 音頻與 AI 模組（Audio & AI）

- **多模態語境解析**：實地拍照後，透過安全代理呼叫 MiniMax-M3 多模態模型自動提取相片中的生字、指示牌與文化典故，一鍵轉為字卡。
- **中日混合極致 TTS**：對接 MiniMax `speech-2.8-hd` 頂級同步語音合成，提供極致流暢的中日雙語情境例句朗讀。
- **環境音樂創作**：根據旅遊隨筆的情感與文化意境，利用 MiniMax `Music-2.6` 創作出專屬的和風禪意立體聲背景樂。

### 🎮 遊戲化與文化解鎖模組（Gamification & Culture）

- **稱號聯動生字卡**：解鎖特定旅行或學習成就（如 "神社巡禮者"）時，系統會自動生成對應的日語與文化背景生字卡（如 "巡禮" 的語義與熊野古道典故），自動匯入 FSRS 記憶庫中。
- **地區限定方言與諺語包**：當使用者在日本實地打卡（如大阪、青森、那霸）後，系統將自動解鎖關西腔、東北腔、沖繩腔等方言卡片與地方特色諺語（如 "案ずるより産むが易し" 的關西對比版 "やってみなはれ"）。
- **互動式隨身寵物**：陪伴你的虛擬寵物每天會根據你的學習進度，使用已解鎖的方言或諺語向你打招呼，並自動將對話句型加入當日複習隊列中。
- **地區限定扭蛋系統**：複習或記錄隨筆可獲得點數進行扭蛋。獎池中除標準稱號外，更包含打卡解鎖的稀有地區方言稱號與超稀有古語稱號（如 "もののあはれを知る者"）。

-----

## 3. 技術架構圖

本系統採用前端 PWA (HTML/JS/IndexedDB) + 安全後端代理 (Firebase Functions/Workers) + Firebase SDK + MiniMax API 的架構，兼顧本機操作零延遲與核心 API 金鑰安全性。

-----

## 4. 數據結構說明

My-Japan 採用 Firebase Firestore 作為雲端 NoSQL 數據庫。為避免重複主鍵概念，集合中的唯一識別碼（如 `cardId`、`noteId`）在實作上直接等同於 Firestore 的 Document ID (doc.id)。

### 核心數據集合

#### `users` 集合（使用者帳號）

> Document ID：使用者唯一識別碼 `uid`（與 Firebase Auth 綁定）

|欄位名稱 |數據類型 |說明 |
|-----------|---------|-------|
|email |String |使用者電子信箱|
|displayName|String |使用者暱稱 |
|createdAt |Timestamp|帳號創立時間 |

#### `cards` 集合（FSRS 複習卡片）

> Document ID：卡片唯一識別碼 `cardId`

|欄位名稱 |數據類型 |說明 |
|---------------|---------|----------------------------------------------------------|
|userId |String |關聯的使用者 uid |
|category |String |卡片分類（如 'N1_grammar'、'N2_vocab'、'dialect_kansai'、'proverb'）|
|kanji |String |漢字詞條（如 "相まって"） |
|kana |String |假名與讀音（如 "あいまって"） |
|translation |String |繁體中文釋義與文法接續說明（如 "#與…相結合、再加上"） |
|contextSentence|String |AI 生成或旅行實地採集的雙語情境例句 |
|stability |Number |FSRS 記憶穩定度 S |
|difficulty |Number |FSRS 記憶難度 D |
|repetitions |Number |成功複習次數 |
|lapses |Number |忘記次數 |
|lastReview |Timestamp|上次複習時間 |
|nextReview |Timestamp|下次複習時間（用於本地調度排序） |
|audioUrl |String |語音合成後上傳至 Firebase Storage 的永久音訊網址 |

#### `notes` 集合（隨身筆記與旅行日記）

> Document ID：筆記唯一識別碼 `noteId`

|欄位名稱 |數據類型 |說明 |
|---------|---------|------------------------------------------|
|userId |String |關聯的使用者 uid |
|title |String |筆記標題 |
|content |String |隨筆正文（支援 Markdown 語法） |
|tags |Array |自定義標籤陣列（如 ["#N1文法", "#京都避暑"]） |
|imageUrl |String |實地拍下的照片在 Firebase Storage 的儲存網址 |
|musicUrl |String |MiniMax 生成的和風 BGM 在 Firebase Storage 的儲存網址|
|latitude |Number |建立時的地理緯度（可選） |
|longitude|Number |建立時的地理經度（可選） |
|createdAt|Timestamp|建立時間 |

#### `achievements` 集合（遊戲化成就稱號）

> Document ID：成就唯一識別碼 `achievementId`

|欄位名稱 |數據類型 |說明 |
|----------------|---------|-------------------------|
|userId |String |關聯的使用者 uid |
|title |String |獲得的稱號名稱（如 '神社巡禮者'、'不撓不屈'）|
|isCardGenerated |Boolean |是否已將稱號自動轉化為 FSRS 卡片 |
|triggerCondition|String |解鎖該稱號的統計條件說明 |
|unlockedAt |Timestamp|解鎖時間 |

#### `pets` 集合（隨身寵物數據）

> Document ID：寵物唯一識別碼 `petId`

|欄位名稱 |數據類型 |說明 |
|---------------|---------|--------------------------------|
|userId |String |關聯的使用者 uid |
|name |String |寵物自定義名字 |
|affinity |Number |寵物好感度（透過日常學習互動提升） |
|status |String |當前寵物狀態（如 'joy'、'reading'、'idle'）|
|lastInteraction|Timestamp|上次互動時間 |

#### `gacha_logs` 集合（扭蛋與獎勵紀錄）

> Document ID：扭蛋唯一識別碼 `gachaId`

|欄位名稱 |數據類型 |說明 |
|----------|---------|--------------------------------------|
|userId |String |關聯的使用者 uid |
|prizeTitle|String |抽中的特殊物品或方言稱號 |
|rarity |String |抽中物品的稀有度（'Common'、'Rare'、'Ultra_Rare'）|
|pulledAt |Timestamp|抽選時間 |

### 補充功能集合

#### `dialect_packages` 集合（地區方言與諺語庫）

> Document ID：方言包唯一識別碼 `packageId`（如 'kansai_level_1'）

|欄位名稱 |數據類型 |說明 |
|--------|------|------------------------------|
|region |String|日本地區（如 'Kansai'、'Okinawa'） |
|name |String|方言包名稱 |
|proverbs|Array |包含本地方言、對應標準語、中文釋義與語音設定的 Map 陣列|

#### `location_checkins` 集合（地理打卡紀錄）

> Document ID：打卡唯一識別碼 `checkinId`

|欄位名稱 |數據類型 |說明 |
|----------|---------|------------------------|
|userId |String |關聯的使用者 uid |
|latitude |Number |打卡緯度 |
|longitude |Number |打卡經度 |
|prefecture|String |打卡對應的日本都道府縣名稱（用於觸發方言包解鎖）|
|createdAt |Timestamp|打卡時間 |

#### `pet_dialogues` 集合（寵物問候對話紀錄）

> Document ID：對話唯一識別碼 `dialogueId`

|欄位名稱 |數據類型 |說明 |
|-------------|---------|-------------------|
|userId |String |關聯的使用者 uid |
|petId |String |寵物唯一識別碼 |
|japaneseText |String |日文對話內容（含方言/諺語） |
|translation |String |繁體中文翻譯 |
|isAddedToFSRS|Boolean |是否已將該對話轉換為生字卡加入複習隊列|
|createdAt |Timestamp|生成時間 |

#### `user_inventory` 集合（使用者獎勵與稱號庫）

> Document ID：物品格唯一識別碼 `inventoryId`

|欄位名稱 |數據類型 |說明 |
|----------|---------|----------------------------------|
|userId |String |關聯的使用者 uid |
|itemType |String |物品類型（如 'title' 稱號、'cosmetic' 寵物外觀）|
|itemId |String |指向成就標題或扭蛋物品 ID |
|isEquipped|Boolean |當前是否正在使用/佩戴 |
|acquiredAt |Timestamp |獲得時間 |

-----

## 5. 前端與底層服務模組

My-Japan 前端採用高內聚、低耦合的單頁模組化結構。整體架構由 **七個前端頁面模組** 以及 **兩個核心底層服務** 共同組成。

### 🔑 底層服務 (1)：使用者認證模組 (Authentication)

基於 `Firebase Auth` 實作。提供一鍵式 Google 帳號授權登入，安全管理 Session。登入成功後，系統自動在本地 IndexedDB 建立該用戶專屬的沙盒數據區，確保多帳號切換時本地快取資料的安全與隔離。

### 📈 頁面模組 (2)：FSRS 記憶卡牌排程模組 (FSRS Scheduler)

本模組基於自由間隔重複排程器（FSRS）演算法核心。當卡片複習時間間隔為 t 天、記憶穩定度為 S 時，使用者能回想該卡片的可提取率（Recall Rate）R 公式如下：

```
R(t,S) = (1 + factor × t / S)^decay
```

- **t**：複習間隔（天）
- **S**：記憶穩定度（Stability）
- **factor**：FSRS 模型常數
- **decay**：FSRS 模型常數
- **R**：Recall Rate（回想率）
- **R_target = 0.9**

系統預設目標回想率 R_target = 0.9。每次複習時，使用者根據自我記憶狀況給出評分 G（1: 忘記, 2: 困難, 3: 良好, 4: 簡單），排程引擎隨即在本機計算出更新後的難度 D 與穩定度 S，重新排定 nextReview 時間戳記，並將計算結果回傳雲端與寫入本地暫存。

### 📸 頁面模組 (3)：多模態採集與筆記模組 (Multimodal Notes)

利用行動端的相機與麥克風權限，實地拍照、錄音。相片與音訊經由 PWA 前端上傳至 Firebase Storage 後，觸發後端安全代理。代理伺服器呼叫 MiniMax M3 多模態模型進行語境解析，自動提取招牌或相片中不常見的日文漢字、背景文化典故，並將其實例化為雙語 JSON 格式，自動寫入使用者的 `cards` 集合中，實現無痛建卡。

### 🔊 頁面模組 (4)：智慧語音與統一快取模組 (TTS Engine)

對接安全代理呼叫 `speech-2.8-hd` T2A API。為解決雲端資料轉發與本地離線播放的衝突，專案採用統一快取架構：

- **雲端永久存儲**：音訊合成後直接保存為 Firebase Storage 中的音訊檔案，Firestore 中的 `audioUrl` 僅指向該音訊檔案的永久 URL。
- **本機離線快取**：前端下載音訊後，將其轉換為二進位 `Blob` 或 `ArrayBuffer` 直接快取至本地 IndexedDB，以 `audioCacheKey` (通常為 `cardId`) 進行索引。
- **安全警示**：Firestore 不會長期保存大型 Base64 或 Hex 音訊字串，以避免超過單一文件 1MB 的限制並降低讀寫開銷。即使在無網路的日本電車上，前端亦能直接解碼 IndexedDB 中的二進位串流，流暢播放。

### 🎵 頁面模組 (5)：意境音樂創作模組 (Music Composer)

整合 MiniMax Music-2.6 服務。當用戶寫下一篇充滿和風禪意的京都隨感日記，大腦會調用安全代理將其提煉為裝飾有日文韻律的歌詞，並以 "Traditional Japanese Folk, Shakuhachi, Ambient" 為風格 Prompt 呼叫音樂生成 API，為日記合成一首獨一無二的原創立體聲 BGM，並將生成的音檔 URL 記錄於筆記中。

### 📲 底層服務 (6)：離線同步與衝突處理服務 (Offline Sync)

基於 `Service Worker` 監聽網路狀態。當系統偵測到無網路（Offline）時，所有的卡片評分、旅遊隨筆寫入操作會自動緩存至 IndexedDB 的本地寫入佇列中。

本地佇列中每筆 pending 操作均附帶以下標準欄位：

- `operationId` (UUID)
- `updatedAt` (時間戳記)
- `syncStatus` ( 'pending' / 'synced' / 'conflict' )

一旦設備重新連線（Online），同步網關自動在背景啟動：

1. **常規同步**：預設採用 Last Write Wins (LWW) 策略，依據本地與雲端 `updatedAt` 的新舊程度自動進行雙向覆蓋。
1. **衝突解決**：針對核心旅遊日記等關鍵文本，若檢測到本地與雲端皆有修改且發生衝突，系統將自動保留一個 `conflict copy`，並於 UI 彈出醒目提示，等待使用者手動進行比對與合併。

### 🏆 頁面模組 (7)：遊戲化成就與稱號連動模組 (Gamified Achievements)

當使用者在旅行或背誦過程中觸發特定統計閾值，系統會寫入 `achievements` 集合，並觸發 MiniMax M3 模型將該 "成就稱號" 轉化為生字卡（解讀稱號語源、關聯典故、近義四字熟語等），將生字卡塞入 FSRS 排程中複習，將實地體驗與單字學習深度結合。

### 🐱 頁面模組 (8)：寵物互動與扭蛋抽選模組 (Pet & Gacha)

隨身寵物會根據使用者當前已解鎖的方言包與學習進度，每日自動生成一句方言或諺語問候語（例如解鎖關西腔後，寵物會以「おはようさん！今日もええ感じやで！」打招呼），並將該句型自動加入當日 FSRS 複習隊列。

扭蛋系統透過以下方式獲取點數：

- 每完成一次 FSRS 複習：+1 點
- 上傳實地照片並成功提取生字：+3 點
- 完成每日學習任務：+5 點

獎池分為三個稀有度等級：

- **Common（普通）**：標準敬語稱號、寵物服裝裝飾
- **Rare（稀有）**：地區限定方言稱號（需打卡對應地區後進入獎池）
- **Ultra_Rare（超稀有）**：古語稱號（如 "もののあはれを知る者"）與特殊寵物造型

所有扭蛋記錄寫入 Firestore 的 `gacha_logs` 集合，稀有稱號解鎖後同步觸發成就連動生字卡生成流程。

-----

## 6. 安全性與 API 金鑰配置方法

> ⚠️ **重點安全性聲明：API 金鑰零洩露原則**
>
> 不可將 `MINIMAX_API_KEY` 直接置於前端（如 `config.js`）！在單頁 Web App (SPA) 中，任何人均可輕易透過瀏覽器開發者工具（DevTools）提取你的 API 密鑰。

正確的安全配置如下：

1. 前端 `config.js` 僅存放公開的 Firebase Web 配置（此段配置不含敏感金鑰，安全無虞）。
1. 將 MiniMax 的請求邏輯移至安全代理服務（如 Firebase Functions 託管在 `/api/minimax`，或部署在 Cloudflare Workers / 自建中轉 Server）。
1. 代理伺服器在後端環境變數中安全讀取 `MINIMAX_API_KEY`，在請求時自動附加認證 Headers，並將結果安全返回前端。

### 步驟 1：建立本地前端設定檔

前端專案僅保存公開的 Firebase SDK 連線配置，此處不含任何 MiniMax 密鑰。

### 步驟 2：後端安全代理部署 (以 Cloudflare Workers 範例)

-----

## 7. 安裝與本地運行步驟

1. **複製本專案庫**
1. **啟動本地開發伺服器**
- Python 3：`python3 -m http.server 8080`
- Node.js：`npx http-server -p 8080`
1. **瀏覽器訪問**：`http://localhost:8080`
1. **手機端安裝 (PWA)**：使用 Safari（iOS）或 Chrome（Android）打開部署網址，點擊「加入主畫面（Add to Home Screen）」即可像原生 App 使用。

-----

## 8. 開發路線圖 (Roadmap)

My-Japan 採用單人開發節奏，將功能分為三個務實的核心階段推進。

-----

## 9. 成本估算表格

為評估 My-Japan 的營運可行性，以下針對一名每日複習 50 張 FSRS 語音字卡、記錄 2 篇多模態旅遊日記並合成本日配樂的活躍使用者，進行單月（30 天）API 消耗成本估算。

> ⚠️ **本表僅供估算參考。**
>
> 實際費用將依 MiniMax、Firebase 官方最新定價、模型版本、地區計費規則及實際使用量而變動。本文件中的成本數據不構成任何價格承諾或保證。

|服務項目 |每日預估用量 |調用 API 規格 |資費標準 |未優化每日成本 (USD)|啟用快取後每日成本 (USD) |
|--------------|--------------------|----------------------|-------------------|-------------|----------------------|
|多模態對話與 RAG |10 次對話，約 40k Tokens |MiniMax-M3 原生輸入 |平均 1.00 / 百萬 Tokens|0.040 |0.040 |
|N1/N2 語音卡片合成 |50 張 × 120字 × 50% 新增|Speech-2.8-HD 同步 T2A |100.00 / 百萬字元 |0.300 |0.060 |
|日常口說語音會話 |約 5,000 字元 |Speech-2.8-Turbo 低延遲 |60.00 / 百萬字元 |0.300 |0.060 |
|文化意境音樂創作 |每日創作 1 首日記 BGM |Music-2.6 意境音樂 |固定 0.15 / 次 |0.150 |0.150 |
|Music Cover 翻唱|每日 1 次音軌提取 |Music Cover Preprocess|免費 |0.000 |0.000 |
|**單日合計** |— |— |— |**0.790** |**0.310** |
|**單月預估總成本** |— |— |— |**~23.70** |**~9.30 (依實際快取命中率調整)**|

-----

## 10. 貢獻指南

我們非常歡迎社群開發者一起豐富 `My-Japan` 的生態，無論是改進前端 UI、優化 FSRS 本地演算法、還是貢獻日語高級文法數據集，我們都張開雙臂歡迎！

1. **Fork 專案** 到你自己的 GitHub 帳號下。
1. **建立你的 Feature 分支**

然後開啟 Pull Request，我們會在第一時間進行審查與合併。

-----

## 11. 倉庫狀態 (Repository Status)

| 項目 | 狀態 |
|------|------|
| Repo | **`ai-lish/My-Japan`** (renamed from `my-japan-web-app` on 2026-06-20) |
| Visibility | 🌍 **PUBLIC** |
| Owner | `ai-lish` |
| Collaborator | `math-lish` — ✅ **accepted** (role: write, push permission) |
| Initial commit | 2026-06-19 by MacD (`c5323db`) |
| Truncated file note | 見 [`TODO.md`](./TODO.md) — `index.html` 喺 source truncation point 加咗 `// <<< TRUNCATION POINT >>>` marker,並用最小 viable stubs 補完 render-able 結構 |
| 後端安全代理 | ⏳ 尚未建立 (見 §6 + TODO.md) |

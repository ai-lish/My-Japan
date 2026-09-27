# JLPT N1 完全學習套件 🈴

> **目標**：24 週內通過 JLPT N1（日語能力試驗最高級）
> **設計**：配合 [My-Japan PWA](https://github.com/ai-lish/My-Japan) 的 FSRS 智能排程，每日 30–60 分鐘碎片化學習。
> **維護**：小心（Hermes）｜ 創建 2026-06-20

---

## 📚 教材清單

| # | 檔案 | 內容 | 字數 |
|---|---|---|---|
| 0 | `00-study-plan.md` | 24 週學習計劃 + 考試結構 + 心理建設 | ~2,800 |
| 1 | `01-vocabulary.md` | **280 個高頻詞彙**（抽象名詞 / 複合動詞 / 副詞 / 慣用 / 外來語 / 形式名詞） | ~14,000 |
| 2 | `02-grammar.md` | **86 個核心句型** + 近義對比 + N1 考試提醒 | ~16,000 |
| 3 | `03-reading.md` | 3 篇読解長文（論説文 / 科學記事 / 文化評論）+ 15 題 + 詳解 | ~12,000 |
| 4 | `04-listening.md` | 3 段聴解完整文字稿（課題 / ポイント / 概要）+ 設題 + TTS 設定建議 | ~10,000 |
| 5 | `05-mock-test.md` | 完整一份模擬試（35 題）+ 詳解 + 計分診斷 | ~12,000 |

**總計**：~67,000 字 / 700+ 個 N1 高頻考點

---

## 🚀 學習路徑

```
W1 ──► 00-study-plan.md （先讀，確立全局觀）
 │
W1–W4 ──► 01-vocabulary.md（每日 20 詞）
 │
W5–W12 ──► 02-grammar.md（每日 2 句型）
 │
W9–W16 ──► 03-reading.md（每週 3 篇）
 │
W13–W20 ──► 04-listening.md（每日 1 段 + TTS 音檔）
 │
W21–W24 ──► 05-mock-test.md（每週 1 份完整模擬）
 │
W24 ──► 🎉 考試！
```

---

## 🎯 預期效益

- **詞彙**：0 → 10,000+（含本套件 280 個高頻 + 自主擴展）
- **文法**：200 條核心句型（本套件覆蓋 86 條最常考）
- **読解**：8 分鐘/篇 → 5 分鐘/篇（速度提升 60%）
- **聴解**：正確率 50% → 80%
- **模擬試**：B 級 → A 級（30/35 → 33/35）

---

## 🛠️ 配合 My-Japan PWA 使用

### 1. 將詞彙入 FSRS 卡

每個 `01-vocabulary.md` 的詞條可以做成：

```javascript
// cards 集合的文件結構
{
  cardId: "vocab_認識_001",
  userId: "<your-uid>",
  category: "N1_vocab",
  kanji: "認識",
  kana: "にんしき",
  translation: "認識、理解",
  contextSentence: "自己認識を深める",
  stability: 0,
  difficulty: 5.0,
  repetitions: 0,
  lapses: 0,
  lastReview: null,
  nextReview: <now>,
  audioUrl: "<tts-generated-url>"
}
```

### 2. 將文法入 FSRS 卡

```javascript
{
  cardId: "grammar_のに_001",
  category: "N1_grammar",
  pattern: "〜にもかかわらず",
  formula: "普通形/N + にもかかわらず",
  meaning: "儘管…卻",
  example: "雨にもかかわらず、試合は続行された。",
  contrast: "〜のに（口語）／〜ものの（書面）"
}
```

### 3. 將錯題入 FSRS 卡

```javascript
{
  cardId: "mock_error_問26",
  category: "N1_mock_error",
  question: "筆者が最も言いたいことは何か",
  wrongAnswer: "<你選的>",
  correctAnswer: "AI を批判的に活用する教育方法",
  explanation: "第 4 段＋最終段落「批判的検討」..."
}
```

---

## 🔊 TTS 音檔生成（Phase 2）

待 Zach 確認後執行，將 `04-listening.md` 的 3 段對話製作成日文 TTS 音檔：

| 段 | 角色 | 推薦聲音 | 情感 |
|---|---|---|---|
| 第 1 段 | 男性上司 + 女性部下 | ja-JP-NormalMale / ja-JP-NormalFemale | 業務禮儀 |
| 第 2 段 | 大學教授 | ja-JP-MatureMale | 學術沉穩 |
| 第 3 段 | アナウンター | ja-JP-ProfessionalFemale | 中立播報 |

**API**：MiniMax `speech-2.8-hd`（高質感）或 `speech-02-turbo`（低延遲）

---

## 📊 學習數據追蹤

每週記錄：

| 週 | 新增詞彙 | FSRS 卡片總數 | 模擬試分數 | 弱點 |
|---|---|---|---|---|
| W1 | | | | |
| W2 | | | | |
| ... | | | | |
| W24 | | | 目標 ≥30/35 | — |

---

## 📖 推薦補充資源

### 官方
- [JLPT 官方網站](https://www.jlpt.jp/) — 過去問題、報名資訊
- [日本語教材ストア](https://www.jes.or.jp/) — 教科書

### 辭典
- [Weblio](https://www.weblio.jp/) — 例句豐富
- [goo辞書](https://dictionary.goo.ne.jp/) — 語感近義詞
- [漢字辞典 online](https://kanji.reader.bz/) — 漢字詳解

### 新聞・聴解
- [NHK ニュース](https://www3.nhk.or.jp/news/) — 標準發音
- [TBS ニュース](https://news.tbs.co.jp/) — 較快語速
- [Japan Times](https://www.japantimes.co.jp/) — 日英對照

### 推薦書籍（紙本 / 電子）
- **必備**：《新完全マスター N1 文法》（スリーエーネットワーク）
- **必備**：《Try! N1》（アスク出版）
- **進階**：《漢字彙 N1》（アスク出版）
- **衝刺**：《Shin Kanzen Master N1》（スリーエーネットワーク）
- **詞彙**：《日本語能力試験 1 級 語彙》（Unicorn）

---

## 🔄 版本歷史

| 版本 | 日期 | 內容 |
|---|---|---|
| v1.0 | 2026-06-20 | 初版：5 個檔案 + 完整學習套件 |

---

## 📜 授權與聲明

- 本教材採用 **CC BY-NC 4.0**（姓名標示-非商業性）
- 內容由小心（Hermes / MiniMax-M3）原創編寫，可作為個人學習用途
- 不得用於商業販售

---

## 🙏 致謝

- 教材編排參考：[日本語総まとめ N1](https://www.ask-books.com/)、[新完全マスター](https://www.3anet.co.jp/)
- 文化評論文章為原創，非引自真實報章

---

> 📬 **回饋**：使用本教材時如發現錯漏，請直接喺 Discord #my-japan thread 講，小心會即刻修正。

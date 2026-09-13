# 台南一日遊｜行程地圖

單頁靜態 web app：可拖曳排序的行程清單 + 互動地圖，手機優先。

- **前端**：Vite + React 19 + TypeScript + Tailwind CSS v4
- **地圖**：Leaflet + react-leaflet，OpenStreetMap 底圖，不需要 API key
- **排序**：@dnd-kit，順序存在 localStorage（換行程時記得改 `useStopOrder.ts` 的 `STORAGE_KEY`）
- **定位**：`navigator.geolocation.watchPosition`，地圖右下角 ➤ 可跳到目前位置（需 HTTPS）
- **導航**：每站展開後有「Apple 地圖導航」，用 `maps.apple.com/?daddr=` 開啟
- **測試**：Vitest（排序工具函式）

## 本機開發

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # 單元測試
npm run build    # 型別檢查 + 打包到 dist/
```

## 修改行程

所有景點都在 `src/data/itinerary.ts`，每一站一個物件：

```ts
{
  id: 'komoya',
  name: '小茂屋',
  emoji: '🍜',
  category: 'food',              // food | shop | dessert | photo | temple | sight
  address: '台南市東區長榮路三段40號',
  position: [22.993065, 120.221785],   // [緯度, 經度]
  hours: '10:00–00:00',
  closed: '每月 1 日、15 日公休',
  phone: '06-235-8162',
  note: '成大人的共同回憶……',
}
```

陣列順序就是預設順序；使用者在 App 裡拖曳過的順序會存在瀏覽器，按「還原順序」可回到預設。

要查座標可以在 Google Maps 對著店家按右鍵，第一行就是「緯度, 經度」。

## 部署

### GitHub Pages（建議，零成本、不用額外帳號）

1. 在 GitHub 建一個 repo，把這個專案 push 上去（`main` 分支）。
2. Repo → **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
3. 之後每次 push 到 `main`，`.github/workflows/deploy.yml` 會自動測試、打包、部署。
   網址會是 `https://<你的帳號>.github.io/<repo 名稱>/`。

`vite.config.ts` 已設定 `base: './'`，所以放在子路徑也能正常載入。

### Vercel / Netlify（替代方案）

匯入 repo 即可，framework 選 Vite，build command `npm run build`，output `dist`。

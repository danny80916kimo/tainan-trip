# 台南一日散步｜行程地圖

單頁靜態 web app：時間軸行程 + 互動地圖，手機優先。

- **前端**：Vite + React 19 + TypeScript + Tailwind CSS v4
- **地圖**：Leaflet + react-leaflet，底圖用 CARTO Voyager（OpenStreetMap 資料），不需要 API key
- **測試**：Vitest（時間與距離工具函式）

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
  id: 'ajiang',
  time: '18:15',                 // 開始時間，停留時間由下一站自動算出
  name: '阿江鱔魚意麵',
  emoji: '🍜',
  category: 'food',              // food | shop | dessert | photo | temple
  address: '台南市中西區民族路三段89號',
  position: [22.9983576, 120.1970408],   // [緯度, 經度]
  hours: '17:00–00:00',
  closed: '週一公休',
  phone: '0937-671-052',
  note: '40 年老店……',
}
```

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

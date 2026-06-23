# 开发指南

## 项目结构

本项目是一个**纯前端 PWA**，所有代码都在单个 HTML 文件中。

```
index.html          # 主程序（~21KB）
├─ <head>          # PWA 元标签 + CSS
└─ <body>          # HTML + 内联 JavaScript

manifest.json       # PWA 清单
sw.js               # Service Worker
icon-*.png          # 应用图标
```

## 核心特性实现

### 1. 数据存储

```javascript
// 存储键
const STORAGE_KEY = 'youshu_assets';

// 数据结构
{
  id: "时间戳",
  name: "物品名",
  price: 数字,
  date: "YYYY-MM-DD"
}
```

### 2. 核心计算

```javascript
// 已用天数（最小为 1）
const daysUsed = Math.max(1, Math.floor((today - purchaseDate) / 86400000) + 1);

// 日均成本
const dailyCost = price / daysUsed;
```

### 3. 实时更新

```javascript
// 每秒重新计算（保证实时性）
setInterval(() => updateUI(), 1000);

// 页面可见性变化时更新
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateUI();
});
```

## 修改和扩展

### 修改配色

在 `index.html` 的 `:root` 中修改 CSS 变量：

```css
:root {
  --color-dark: #16140f;    /* 深色 */
  --color-light: #f5f1e8;   /* 浅色 */
  --color-gold: #b8893d;    /* 金色 */
  --color-red: #9c4a3a;     /* 红色 */
}
```

### 修改应用清单

编辑 `manifest.json`：

```json
{
  "name": "应用名称",
  "short_name": "短名",
  "theme_color": "#主题颜色",
  "background_color": "#背景颜色"
}
```

### 添加新功能

#### 示例：添加分类功能

1. **更新数据结构**
   ```javascript
   // 在 assets 数组中添加 category 字段
   assets.push({
     id: generateId(),
     name: "物品名",
     price: 价格,
     date: "日期",
     category: "电子产品"  // 新字段
   });
   ```

2. **更新表单**
   ```html
   <div class="form-group">
     <label class="form-label">分类</label>
     <select id="assetCategory" class="form-input">
       <option>电子产品</option>
       <option>服装</option>
     </select>
   </div>
   ```

3. **更新列表显示**
   ```javascript
   // 在 renderAssetList 中添加分类显示
   <div class="asset-meta">
     <span>${asset.category}</span>
     <span>${asset.date}</span>
   </div>
   ```

## 性能优化

### 已优化的地方

- ✅ 单文件架构，无 HTTP 请求
- ✅ CSS Grid 和 Flexbox 高效布局
- ✅ CSS 变量减少重复
- ✅ 事件委托（点击列表使用委托）
- ✅ 防抖/节流（每秒更新而非频繁更新）

### 如果要进一步优化

```javascript
// 使用 Web Workers 计算（适用于海量数据）
const worker = new Worker('calculate.js');
worker.postMessage(assets);
worker.onmessage = (e) => {
  updateUI(e.data);
};
```

## 兼容性

| 特性 | iOS | Android | Desktop |
|------|-----|---------|----------|
| 基础功能 | 11.3+ | 5.0+ | ✅ |
| PWA 安装 | 11.3+ | 5.0+ | ✅ |
| Service Worker | 11.3+ | 5.0+ | ✅ |
| localStorage | 11.0+ | 2.1+ | ✅ |

## 调试

### 在 Chrome DevTools 中

```javascript
// 查看所有数据
JSON.parse(localStorage.getItem('youshu_assets'))

// 清空所有数据
localStorage.clear()

// 手动添加测试数据
localStorage.setItem('youshu_assets', JSON.stringify([
  {id: "1", name: "iPhone", price: 5999, date: "2024-01-01"}
]))

// 重新加载
location.reload()
```

### Service Worker 调试

1. F12 → Application → Service Workers
2. 检查注册状态
3. 点击「Unregister」清空缓存
4. 硬刷新：`Ctrl+Shift+R`

## 测试

### 功能测试清单

- [ ] 添加资产
- [ ] 编辑资产
- [ ] 删除资产
- [ ] 查看统计数据
- [ ] 离线功能（断网后仍可用）
- [ ] Service Worker 注册
- [ ] PWA 安装（iOS/Android）
- [ ] 键盘导航（Tab 键）
- [ ] 屏幕阅读器（VoiceOver/TalkBack）

### 性能测试

```bash
# Lighthouse 审计
1. F12 → Lighthouse
2. 生成报告
3. 查看 PWA/Performance 得分
```

## 发布清单

- [ ] 所有 PNG 图标已生成
- [ ] manifest.json 配置正确
- [ ] sw.js 注册成功
- [ ] HTTPS 已启用
- [ ] README.md 已更新
- [ ] 在多个设备上测试
- [ ] Lighthouse 得分 ≥ 90

## 常见问题

### Q: 如何增加数据容量？

A: localStorage 通常有 5-10MB 的容量，足够存储数千条记录。如需更多：

```javascript
// 使用 IndexedDB（可存储数百 MB）
const db = indexedDB.open('youshu');
```

### Q: 如何实现云同步？

A: 需要后端服务。基本思路：

```javascript
// 当数据变化时，上传到服务器
async function sync() {
  const data = JSON.parse(localStorage.getItem('youshu_assets'));
  await fetch('/api/sync', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

### Q: 如何更改主题颜色？

A: 修改 manifest.json 和 index.html 中的颜色变量。

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

MIT License

---

**Happy coding! 🚀**

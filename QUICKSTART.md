# 快速开始指南

## 🚀 最快的方式

### 方案 1: GitHub Pages（推荐，无需任何配置）

1. **Fork 此仓库**
   ```bash
   点击右上角 Fork 按钮
   ```

2. **启用 GitHub Pages**
   - 进入 `Settings` → `Pages`
   - Source 选择 `main` 分支
   - 保存

3. **访问你的 App**
   ```
   https://你的用户名.github.io/youshu/
   ```

4. **在 iPhone 上安装**
   - Safari 打开上面的链接
   - 点击分享按钮 → 添加到主屏幕
   - 完成！现在像原生 App 一样使用

---

### 方案 2: 本地运行（开发）

#### Mac/Linux

```bash
# 1. 克隆仓库
git clone https://github.com/qiongtaoli-star/youshu.git
cd youshu

# 2. 启动本地服务器
python3 -m http.server 8000

# 3. 打开浏览器
# http://localhost:8000
```

#### Windows

```bash
# 1. 克隆仓库
git clone https://github.com/qiongtaoli-star/youshu.git
cd youshu

# 2. 启动本地服务器
python -m http.server 8000

# 3. 打开浏览器
# http://localhost:8000
```

#### 使用 VS Code Live Server

1. 在 VS Code 中打开项目
2. 右键点击 `index.html` → Open with Live Server
3. 自动打开浏览器

---

### 方案 3: 自己的服务器

1. **上传所有文件到服务器**
   ```
   index.html
   manifest.json
   sw.js
   icon-180.png
   icon-192.png
   icon-512.png
   ```

2. **确保启用 HTTPS**（PWA 要求）

3. **访问你的域名**
   ```
   https://your-domain.com/youshu/
   ```

---

## 📱 在手机上安装

### iOS (iPhone / iPad)

1. 在 Safari 中打开应用链接
2. 点击底部分享按钮 ⬆️
3. 选择「添加到主屏幕」
4. 输入名称（如「有数」）
5. 点击「添加」
6. ✅ 完成！现在可以像原生 App 一样全屏使用

### Android

1. 在 Chrome 中打开应用链接
2. 点击菜单按钮 ⋮
3. 选择「安装应用」
4. 确认
5. ✅ 会自动添加到主屏幕

---

## 🔧 生成图标

如果想自定义图标：

```bash
# 1. 安装依赖
npm install

# 2. 生成图标
npm run generate-icons

# 生成的文件：
# - icon-180.png
# - icon-192.png
# - icon-512.png
```

---

## 📋 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 主程序（包含所有 HTML/CSS/JS） |
| `manifest.json` | PWA 配置 |
| `sw.js` | Service Worker（离线支持） |
| `icon-*.png` | 应用图标（三个尺寸） |
| `package.json` | NPM 配置 |
| `generate-icons.js` | 图标生成脚本 |
| `README.md` | 完整文档 |
| `QUICKSTART.md` | 本文件 |

---

## 💡 使用提示

### 数据备份

在浏览器 DevTools 中：

```javascript
// 复制所有数据
const data = localStorage.getItem('youshu_assets');
copy(data);
// 然后粘贴到文本编辑器保存
```

### 恢复数据

```javascript
// 替换 YOUR_JSON_DATA 为你保存的 JSON 字符串
localStorage.setItem('youshu_assets', 'YOUR_JSON_DATA');
// 刷新页面
location.reload();
```

### 清除所有数据

```javascript
localStorage.removeItem('youshu_assets');
location.reload();
```

---

## ⚠️ 常见问题

### Q: PWA 为什么无法安装？

**A:** 确保：
- ✅ 使用 HTTPS（localhost 除外）
- ✅ `manifest.json` 正确加载（F12 → Network 检查）
- ✅ `sw.js` 成功注册（F12 → Application → Service Workers）

### Q: 数据会丢失吗？

**A:** 数据存储在本地 `localStorage`：
- ✅ 清除浏览器缓存不会删除（除非选择「站点数据」）
- ✅ 不同浏览器数据互不同步
- ⚠️ **定期在 DevTools 中备份数据**

### Q: 如何在多个设备同步？

**A:** 目前是纯本地存储。如需同步：
1. 手动导出 JSON 数据
2. 在另一设备导入

（未来计划支持云端同步）

### Q: 离线是否可用？

**A:** ✅ 完全离线可用！Service Worker 会缓存所有资源。

### Q: 支持哪些浏览器？

**A:**
- iOS Safari 11.3+
- Android Chrome 5.0+
- Desktop 所有现代浏览器

---

## 🌍 部署到其他平台

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

连接 GitHub 仓库，自动部署

### 其他静态主机

- Surge.sh
- Firebase Hosting
- AWS S3 + CloudFront
- Cloudflare Pages

---

## 🐛 提交问题

遇到问题？提交 Issue：

https://github.com/qiongtaoli-star/youshu/issues

---

## 📄 许可证

MIT License - 可自由使用和修改

---

**祝你使用愉快！🎉**

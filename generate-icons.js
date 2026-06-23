#!/usr/bin/env node

/**
 * 有数·资产记录 PWA 图标生成脚本
 * 生成 180x180, 192x192, 512x512 的 PNG 图标
 * 
 * 使用方法:
 * 1. npm install sharp
 * 2. node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// 尝试使用 sharp (需要安装)
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  未检测到 sharp 库，使用备用方案...');
  console.log('安装命令: npm install sharp');
  console.log('或使用在线工具生成: https://www.favicon-generator.org/');
  process.exit(0);
}

// 颜色定义
const colors = {
  dark: '#16140f',      // 深墨色
  gold: '#b8893d',      // 金色
  light: '#f5f1e8'      // 米白色
};

/**
 * 创建 SVG 图标
 */
function createSVG(size) {
  const padding = size * 0.1;
  const innerSize = size - padding * 2;
  const fontSize = size * 0.5;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景 -->
  <rect width="${size}" height="${size}" fill="${colors.dark}"/>
  
  <!-- 外围金色边框 (渐变) -->
  <defs>
    <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#d4a574;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8a6a2f;stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <circle cx="${size/2}" cy="${size/2}" r="${innerSize/2}" fill="none" stroke="url(#goldGradient)" stroke-width="${size * 0.08}"/>
  
  <!-- 内部圆形背景 -->
  <circle cx="${size/2}" cy="${size/2}" r="${innerSize/2 - size * 0.05}" fill="${colors.dark}"/>
  
  <!-- 金色"数"字 (使用方形块构成) -->
  <text 
    x="${size/2}" 
    y="${size/2 + fontSize * 0.3}" 
    font-family="Georgia, serif" 
    font-size="${fontSize}" 
    font-weight="bold" 
    fill="${colors.gold}" 
    text-anchor="middle"
    dominant-baseline="middle">
    数
  </text>
  
  <!-- 顶部装饰线 -->
  <line x1="${size * 0.2}" y1="${size * 0.15}" x2="${size * 0.8}" y2="${size * 0.15}" stroke="${colors.gold}" stroke-width="${size * 0.03}" opacity="0.6"/>
  
  <!-- 底部装饰线 -->
  <line x1="${size * 0.2}" y1="${size * 0.85}" x2="${size * 0.8}" y2="${size * 0.85}" stroke="${colors.gold}" stroke-width="${size * 0.03}" opacity="0.6"/>
</svg>`;
}

/**
 * 生成指定尺寸的图标
 */
async function generateIcon(size) {
  const svg = createSVG(size);
  const filename = `icon-${size}.png`;
  
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(filename);
    
    console.log(`✅ 生成: ${filename} (${size}x${size})`);
    return true;
  } catch (err) {
    console.error(`❌ 生成 ${filename} 失败:`, err.message);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🎨 有数·资产记录 PWA 图标生成器\n');
  
  const sizes = [180, 192, 512];
  let success = true;
  
  for (const size of sizes) {
    const result = await generateIcon(size);
    if (!result) success = false;
  }
  
  if (success) {
    console.log('\n✨ 所有图标生成完成！');
    console.log('📁 文件已保存到当前目录');
    console.log('🚀 现在可以提交到 Git 仓库了');
  } else {
    console.log('\n⚠️  部分图标生成失败，请检查 sharp 库是否正确安装');
  }
}

main().catch(err => {
  console.error('❌ 出错:', err);
  process.exit(1);
});

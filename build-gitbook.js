#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 创建输出目录
const outputDir = path.join(__dirname, '_book');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 读取 SUMMARY.md 解析目录结构
const summaryContent = fs.readFileSync('SUMMARY.md', 'utf-8');

// 创建基础 HTML 模板
const htmlTemplate = (title, content, navigation) => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 中小企业AI时代生存指北</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.8;
            color: #333;
            background: #f5f5f5;
        }
        .container {
            display: flex;
            min-height: 100vh;
        }
        .sidebar {
            width: 300px;
            background: white;
            border-right: 1px solid #e0e0e0;
            padding: 20px;
            overflow-y: auto;
            position: fixed;
            height: 100vh;
        }
        .sidebar h2 {
            font-size: 18px;
            margin-bottom: 20px;
            color: #667eea;
        }
        .sidebar ul {
            list-style: none;
        }
        .sidebar li {
            margin: 8px 0;
        }
        .sidebar a {
            color: #555;
            text-decoration: none;
            display: block;
            padding: 5px 10px;
            border-radius: 4px;
            transition: all 0.3s;
        }
        .sidebar a:hover, .sidebar a.active {
            background: #f0f0f0;
            color: #667eea;
        }
        .sidebar .section-title {
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 5px;
            color: #333;
        }
        .content {
            flex: 1;
            margin-left: 300px;
            padding: 40px;
            max-width: 900px;
        }
        .content-wrapper {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        h1 { 
            color: #2d3748; 
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 3px solid #667eea;
        }
        h2 { 
            color: #4a5568; 
            margin: 30px 0 20px; 
        }
        h3 { 
            color: #718096; 
            margin: 25px 0 15px; 
        }
        p { margin: 15px 0; }
        ul, ol { 
            margin: 15px 0; 
            padding-left: 30px; 
        }
        li { margin: 8px 0; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #e0e0e0;
            padding: 12px;
            text-align: left;
        }
        th {
            background: #f7fafc;
            font-weight: bold;
        }
        blockquote {
            border-left: 4px solid #667eea;
            padding-left: 20px;
            margin: 20px 0;
            color: #666;
            font-style: italic;
        }
        code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #f8fafc;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .nav-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #e0e0e0;
        }
        .nav-footer a {
            color: #667eea;
            text-decoration: none;
            padding: 10px 20px;
            border: 1px solid #667eea;
            border-radius: 5px;
            transition: all 0.3s;
        }
        .nav-footer a:hover {
            background: #667eea;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <nav class="sidebar">
            <h2>📚 中小企业AI时代生存指北</h2>
            ${navigation}
        </nav>
        <main class="content">
            <div class="content-wrapper">
                ${content}
            </div>
        </main>
    </div>
</body>
</html>
`;

// 解析 Markdown 为简单 HTML
function parseMarkdown(markdown) {
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Lists
        .replace(/^\* (.+)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // Paragraphs
        .split('\n\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('\n');
    
    return html;
}

// 构建导航
function buildNavigation() {
    const lines = summaryContent.split('\n');
    let nav = '<ul>';
    
    for (const line of lines) {
        if (line.includes('* [')) {
            const match = line.match(/\* \[(.+?)\]\((.+?)\)/);
            if (match) {
                const [_, title, path] = match;
                const htmlPath = path.replace('.md', '.html').replace('README', 'index');
                const indent = line.match(/^(\s*)/)[1].length;
                
                if (indent === 0) {
                    nav += `<li class="section-title">${title}</li>`;
                } else {
                    nav += `<li style="margin-left: ${indent * 10}px"><a href="/${htmlPath}">${title}</a></li>`;
                }
            }
        }
    }
    
    nav += '</ul>';
    return nav;
}

// 处理所有 Markdown 文件
function processFiles(dir = '.') {
    const files = fs.readdirSync(dir);
    const navigation = buildNavigation();
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== '_book' && file !== 'node_modules') {
            // 创建对应目录
            const outputPath = path.join(outputDir, file);
            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath, { recursive: true });
            }
            // 递归处理子目录
            processFiles(filePath);
        } else if (file.endsWith('.md')) {
            // 处理 Markdown 文件
            const content = fs.readFileSync(filePath, 'utf-8');
            const htmlContent = parseMarkdown(content);
            const title = content.match(/^# (.+)/m)?.[1] || file.replace('.md', '');
            
            const outputFile = file === 'README.md' ? 'index.html' : file.replace('.md', '.html');
            const outputPath = path.join(outputDir, dir === '.' ? '' : dir, outputFile);
            
            // 确保输出目录存在
            const outputDirPath = path.dirname(outputPath);
            if (!fs.existsSync(outputDirPath)) {
                fs.mkdirSync(outputDirPath, { recursive: true });
            }
            
            fs.writeFileSync(outputPath, htmlTemplate(title, htmlContent, navigation));
            console.log(`✅ Generated: ${outputPath}`);
        }
    }
}

console.log('🚀 Building GitBook...');
processFiles();

// 复制其他资源
if (fs.existsSync('assets')) {
    const assetsDir = path.join(outputDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }
    console.log('📁 Copying assets...');
}

console.log('✨ Build complete! Output in _book directory');
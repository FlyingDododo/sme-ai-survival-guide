# GitBook 发布方案指南

## 本地开发

### 1. 安装依赖
```bash
cd sme-ai-survival-guide
npm install -g gitbook-cli
gitbook install
```

### 2. 本地预览
```bash
npm run serve
# 或
gitbook serve
```
访问 http://localhost:4000 查看效果

### 3. 构建静态文件
```bash
npm run build
# 或
gitbook build
```
生成的静态文件在 `_book` 目录

## 在线发布方案

### 方案1：GitHub Pages（免费，推荐）

**优点**：
- 完全免费
- 自动部署
- 自定义域名支持
- 版本控制

**步骤**：
1. 创建GitHub仓库
2. 推送代码到仓库
3. 创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy GitBook to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '12'
    
    - name: Install GitBook CLI
      run: npm install -g gitbook-cli
    
    - name: Install GitBook plugins
      run: gitbook install
    
    - name: Build GitBook
      run: gitbook build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_book
```

4. 在仓库Settings中启用GitHub Pages
5. 访问 https://[username].github.io/[repository-name]

### 方案2：Netlify（免费套餐够用）

**优点**：
- 一键部署
- 自动HTTPS
- CDN加速
- 预览部署

**步骤**：
1. 注册Netlify账号
2. 连接GitHub仓库
3. 配置构建设置：
   - Build command: `gitbook build`
   - Publish directory: `_book`
4. 点击部署

**访问地址**：https://[your-site-name].netlify.app

### 方案3：Vercel（免费套餐够用）

**优点**：
- 极速部署
- 全球CDN
- 自动HTTPS
- 分析功能

**步骤**：
1. 安装Vercel CLI：`npm i -g vercel`
2. 在项目根目录运行：`vercel`
3. 按提示操作即可

### 方案4：GitBook.com（官方服务）

**优点**：
- 官方支持
- 在线编辑
- 团队协作
- 搜索优化

**缺点**：
- 免费版功能有限
- 付费版较贵（$8/月起）

**步骤**：
1. 注册 gitbook.com 账号
2. 创建新的space
3. 导入GitHub仓库或直接编辑

### 方案5：自建服务器

**适合场景**：
- 需要内网访问
- 有特殊安全要求
- 需要集成其他系统

**使用Docker部署**：
```dockerfile
FROM node:12-alpine
WORKDIR /gitbook
COPY . .
RUN npm install -g gitbook-cli && \
    gitbook install && \
    gitbook build
    
FROM nginx:alpine
COPY --from=0 /gitbook/_book /usr/share/nginx/html
EXPOSE 80
```

**使用Nginx部署**：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/gitbook/_book;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 域名配置

### GitHub Pages自定义域名
1. 在 `_book` 目录创建 `CNAME` 文件，内容为你的域名
2. 在域名DNS设置CNAME记录指向 `[username].github.io`

### Netlify/Vercel自定义域名
在控制面板中直接添加域名，按提示配置DNS

## 持续更新策略

### 自动化工作流
1. 使用GitHub Actions自动构建和部署
2. 设置Webhook触发部署
3. 使用CI/CD工具（Jenkins、GitLab CI等）

### 版本管理
1. 使用Git标签管理版本
2. 维护多个分支（如stable、dev）
3. 保留历史版本供读者访问

## SEO优化

### 基础优化
```html
<!-- 在自定义模板中添加 -->
<meta name="description" content="中小企业AI时代生存指北">
<meta name="keywords" content="AI,人工智能,中小企业">
<meta property="og:title" content="中小企业AI时代生存指北">
<meta property="og:description" content="帮助中小企业在AI时代找到生存发展之道">
```

### 提交搜索引擎
1. Google Search Console
2. 百度站长平台
3. Bing Webmaster Tools

## 监控与分析

### 添加分析代码
在 `book.json` 中配置Google Analytics：
```json
{
  "plugins": ["ga"],
  "pluginsConfig": {
    "ga": {
      "token": "UA-XXXX-Y"
    }
  }
}
```

### 监控指标
- 页面访问量
- 用户停留时间
- 跳出率
- 热门章节

## 常见问题

### Q: GitBook CLI安装失败？
A: 尝试使用Node.js 10.x版本，或使用Docker容器

### Q: 插件安装失败？
A: 检查网络，或使用npm镜像源

### Q: 构建速度慢？
A: 使用缓存，减少插件数量，优化图片大小

### Q: 如何支持评论功能？
A: 集成Disqus或Gitalk插件

## 推荐方案总结

- **个人项目**：GitHub Pages（免费+简单）
- **商业项目**：Netlify/Vercel（专业+稳定）
- **企业内部**：自建服务器（安全+可控）
- **团队协作**：GitBook.com（功能全面）

---

选择最适合你的方案，让你的知识触达更多读者！
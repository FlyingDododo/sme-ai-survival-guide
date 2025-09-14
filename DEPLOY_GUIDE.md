# 🚀 GitBook 部署到 GitHub Pages 指南

## ✅ 已完成的准备工作

1. ✅ Git仓库已初始化
2. ✅ GitHub Actions配置文件已创建
3. ✅ GitBook项目结构已完成

## 📝 接下来的步骤

### 步骤1：创建GitHub仓库

1. 登录你的GitHub账号
2. 点击右上角的 **+** → **New repository**
3. 填写仓库信息：
   - Repository name: `sme-ai-survival-guide`
   - Description: 中小企业AI时代生存指北
   - Public（公开）
   - **不要**勾选 "Add a README file"
   - 点击 **Create repository**

### 步骤2：推送代码到GitHub

在本地项目目录执行以下命令：

```bash
# 1. 添加所有文件
git add .

# 2. 提交
git commit -m "Initial commit: 中小企业AI时代生存指北"

# 3. 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/sme-ai-survival-guide.git

# 4. 推送到GitHub
git push -u origin main
```

如果使用SSH：
```bash
git remote add origin git@github.com:YOUR_USERNAME/sme-ai-survival-guide.git
```

### 步骤3：配置GitHub Pages

1. 推送代码后，进入GitHub仓库页面
2. 点击 **Settings** （设置）
3. 左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - Source: 选择 **GitHub Actions**
   - 不需要选择分支

### 步骤4：触发自动部署

1. 回到仓库主页
2. 点击 **Actions** 标签
3. 你应该能看到 "Deploy GitBook to GitHub Pages" 工作流
4. 如果没有自动运行，点击它并手动运行：
   - 点击 **Run workflow**
   - 选择 `main` 分支
   - 点击绿色的 **Run workflow** 按钮

### 步骤5：访问你的GitBook

部署成功后（通常需要2-5分钟），你可以通过以下地址访问：

```
https://YOUR_USERNAME.github.io/sme-ai-survival-guide/
```

例如，如果你的用户名是 `zhangsan`，访问地址就是：
```
https://zhangsan.github.io/sme-ai-survival-guide/
```

## 🎯 验证部署状态

1. 在 **Actions** 页面查看工作流状态
   - 绿色✅ = 成功
   - 红色❌ = 失败（查看日志排查问题）
   - 黄色🟡 = 正在运行

2. 第一次部署可能需要等待几分钟才能生效

## 🌐 自定义域名（可选）

如果你有自己的域名（如 `ai-guide.com`）：

### 方法1：通过GitHub界面设置

1. 在 **Settings** → **Pages** 页面
2. 在 **Custom domain** 输入你的域名
3. 点击 **Save**

### 方法2：通过CNAME文件

1. 在项目根目录创建 `CNAME` 文件：
```bash
echo "你的域名.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### DNS配置

在你的域名DNS设置中添加：

**For apex domain (example.com):**
```
A记录 → 185.199.108.153
A记录 → 185.199.109.153
A记录 → 185.199.110.153
A记录 → 185.199.111.153
```

**For subdomain (www.example.com):**
```
CNAME记录 → YOUR_USERNAME.github.io
```

## 🔧 常见问题

### Q: Actions运行失败？

检查以下几点：
1. Node.js版本是否正确（配置文件使用16）
2. 仓库设置中Pages是否启用
3. 查看Actions日志具体错误

### Q: 页面404？

1. 确认Actions运行成功
2. 等待5-10分钟（首次部署需要时间）
3. 检查访问地址是否正确
4. 清除浏览器缓存

### Q: 如何更新内容？

每次推送到 `main` 分支都会自动触发重新部署：
```bash
git add .
git commit -m "Update content"
git push
```

## 📊 部署成功后

- 你的GitBook将自动获得HTTPS证书
- 享受GitHub的全球CDN加速
- 完全免费，无限流量
- 支持自定义域名

## 💡 进阶优化

1. **添加Google Analytics**
   - 在 `book.json` 中配置GA插件

2. **SEO优化**
   - 添加 `sitemap.xml`
   - 优化meta标签

3. **性能优化**
   - 压缩图片
   - 使用CDN资源

## 📧 需要帮助？

如果遇到问题，可以：
1. 查看GitHub Actions的详细日志
2. 在GitHub仓库创建Issue
3. 参考GitBook官方文档

---

**祝贺！你的《中小企业AI时代生存指北》即将上线！** 🎉
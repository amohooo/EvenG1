# Railway部署配置指南

## � 安全警告
**在部署前，请确保所有API密钥都已从代码中移除！**

## 🔐 API密钥安全处理

### 立即执行的安全步骤：
1. **撤销暴露的API密钥**：
   - 登录 OpenAI Dashboard，撤销当前密钥
   - 登录 MentraOS Console，重新生成API密钥

2. **生成新的API密钥**：
   - 创建新的OpenAI API密钥
   - 创建新的MentraOS API密钥

## 🚀 Railway部署步骤

### 方法1：自动检测（推荐）

1. **准备代码**
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **连接到Railway**
   - 访问 [Railway.app](https://railway.app)
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo" 
   - 选择 `EvenG1` 仓库

3. **配置环境变量**
   在Railway项目中：
   - 点击你的服务
   - 进入 "Variables" 标签
   - 添加环境变量：
   
   ```
   PORT=3000
   PACKAGE_NAME=com.imhaom.ai-glasses
   MENTRAOS_API_KEY=你的新MentraOS密钥
   OPENAI_API_KEY=你的新OpenAI密钥
   ```

4. **部署**
   - Railway会自动检测Bun项目
   - 自动运行 `bun install` 和 `bun start`

### 方法2：手动配置

如果自动检测有问题，创建 `railway.toml`：

```toml
[deploy]
startCommand = "bun start"
```

## 🔍 故障排除

### 常见错误及解决方案：

1. **`build.builder: Invalid input`**
   - 删除 `railway.toml` 文件
   - 让Railway自动检测项目类型

2. **环境变量未生效**
   - 检查Railway Variables页面
   - 确保变量名正确
   - 重新部署

3. **启动失败**
   - 检查 `package.json` 中的 `start` 脚本
   - 查看Railway部署日志
   - 确认所有依赖都已安装

4. **API连接失败**
   - 验证API密钥格式
   - 检查API密钥权限
   - 测试API密钥有效性

## 📱 部署完成后的配置

1. **获取Railway URL**
   - 例如：`https://your-app-production.up.railway.app`

2. **更新MentraOS配置**
   - 登录 [console.mentra.glass](https://console.mentra.glass/)
   - 更新应用的 "Public URL" 为Railway URL
   - 确认包名匹配

3. **测试部署**
   ```
   https://your-app.railway.app/health
   https://your-app.railway.app/webview
   ```

## 🛡️ 安全检查清单

- [ ] API密钥已从代码中移除
- [ ] 旧的API密钥已撤销
- [ ] 新的API密钥已在Railway中配置
- [ ] `.env` 文件在 `.gitignore` 中
- [ ] 代码中没有硬编码的敏感信息

## � 获取帮助

如果遇到问题：
1. 检查Railway部署日志
2. 运行本地环境检查：`bun run env-check`
3. 查看Railway文档：[docs.railway.app](https://docs.railway.app)

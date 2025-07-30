# Railway部署配置指南

## 🚀 在Railway上部署MentraOS应用

### 步骤1：连接GitHub仓库

1. 登录 [Railway.app](https://railway.app)
2. 点击 "New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择你的 `EvenG1` 仓库

### 步骤2：配置环境变量

在Railway项目面板中：

1. 点击你的服务
2. 进入 "Variables" 标签页
3. 添加以下环境变量：

```bash
PORT=3000
PACKAGE_NAME=com.imhaom.ai-glasses
MENTRAOS_API_KEY=你的真实MentraOS_API密钥
OPENAI_API_KEY=你的真实OpenAI_API密钥
```

### 步骤3：获取API密钥

#### MentraOS API密钥：
1. 访问 [console.mentra.glass](https://console.mentra.glass/)
2. 登录账户
3. 创建或查看你的应用
4. 复制API密钥

#### OpenAI API密钥：
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 登录账户  
3. 进入 "API Keys" 页面
4. 创建新的API密钥
5. 复制密钥（注意：创建后只显示一次）

### 步骤4：设置构建配置

Railway会自动检测到这是一个Bun项目。如果需要，可以创建 `railway.toml`：

```toml
[build]
builder = "bun"
buildCommand = "bun install"

[deploy]
startCommand = "bun start"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10
```

### 步骤5：获取部署URL

部署完成后：
1. Railway会提供一个公共URL（类似：`https://your-app-name.up.railway.app`）
2. 将此URL更新到MentraOS控制台的"Public URL"字段

### 步骤6：测试部署

访问你的Railway URL：
- `https://your-app.up.railway.app/` - 主页
- `https://your-app.up.railway.app/health` - 健康检查
- `https://your-app.up.railway.app/webview` - Web界面

## 🔧 本地开发环境配置

### 方法1：手动配置.env文件
1. 复制 `.env.example` 为 `.env`
2. 填入真实的API密钥

### 方法2：使用Railway CLI同步环境变量
```bash
# 安装Railway CLI
npm install -g @railway/cli

# 登录Railway
railway login

# 同步环境变量到本地
railway variables
```

## 🛡️ 安全最佳实践

1. **永远不要将API密钥提交到Git**
2. **使用不同的API密钥用于开发和生产**
3. **定期轮换API密钥**
4. **监控API使用情况**
5. **设置API密钥的使用限制**

## 📱 MentraOS配置更新

部署完成后，记得在MentraOS控制台更新：
- **Public URL**: 你的Railway部署URL
- **Package Name**: `com.imhaom.ai-glasses`（或你选择的包名）

## 🔍 故障排除

### 常见问题：

1. **环境变量未生效**
   - 检查Railway Variables页面配置
   - 重新部署应用

2. **API密钥错误**  
   - 验证密钥格式正确
   - 检查API密钥权限

3. **连接失败**
   - 确认URL正确配置在MentraOS控制台
   - 检查防火墙和网络设置

4. **部署失败**
   - 查看Railway部署日志
   - 检查package.json配置

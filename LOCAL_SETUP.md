# 本地开发环境设置指南

## 🔧 设置.env文件

1. **编辑 `.env` 文件**，替换占位符为真实值：

```bash
PORT=3000
PACKAGE_NAME=com.imhaom.ai-glasses
MENTRAOS_API_KEY=你的真实MentraOS_API密钥
OPENAI_API_KEY=你的真实OpenAI_API密钥
```

## 🔑 获取API密钥

### MentraOS API密钥：
1. 访问 [console.mentra.glass](https://console.mentra.glass/)
2. 登录你的账户
3. 找到你的应用或创建新应用
4. 复制API密钥

### OpenAI API密钥：
1. 访问 [platform.openai.com](https://platform.openai.com/)
2. 登录账户
3. 进入 "API Keys" 页面
4. 创建新的API密钥
5. 复制密钥（只显示一次）

## 🧪 本地测试步骤

### 1. 检查环境配置
```bash
bun run env-check
```

### 2. 测试AI功能
```bash
bun run test-ai
```

### 3. 测试工具调用
```bash
bun run test-manual
```

### 4. 启动开发服务器
```bash
bun run dev
```

## 📋 测试检查清单

- [ ] `.env` 文件包含真实API密钥
- [ ] `bun run env-check` 显示所有配置正确
- [ ] `bun run test-ai` 成功返回AI回答
- [ ] `bun run test-manual` 模拟工具调用成功
- [ ] `bun run dev` 启动服务器无错误
- [ ] 访问 `http://localhost:3000/health` 返回OK

## 🚨 注意事项

- **不要提交含有真实API密钥的.env文件到Git**
- **如果你不小心提交了，立即撤销这些密钥**
- **本地测试完成后，从.env文件中移除真实密钥**

## 🔍 如果测试失败

### AI功能测试失败：
- 检查OpenAI API密钥是否正确
- 检查网络连接
- 检查API账户余额

### 环境检查失败：
- 确保所有变量都已设置
- 检查变量名拼写
- 确保没有多余的空格

### 服务器启动失败：
- 检查端口3000是否被占用
- 查看错误日志
- 确保依赖已安装（`bun install`）

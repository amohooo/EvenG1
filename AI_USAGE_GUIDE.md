# AI语音助手功能使用说明

## 🎯 新增功能

### 1. AI问答功能
**语音激活词：**
- "ask AI"
- "hey AI"
- "AI help"
- "question AI"

**使用方法：**
说出激活词 + 你的问题，例如：
- "Ask AI what's the weather like today?"
- "Hey AI, how do I cook pasta?"
- "AI help with JavaScript syntax"

### 2. 重复功能
**语音激活词：**
- "can you repeat"
- "repeat please"
- "repeat that"
- "say that again"
- "I didn't understand"

**使用方法：**
当你没听清AI的回答时，说出激活词即可重复上一次的回答。

## 🔧 配置说明

### OpenAI API配置
1. 打开 `.env` 文件
2. 将 `OPENAI_API_KEY=your_openai_api_key_here` 中的 `your_openai_api_key_here` 替换为你的真实OpenAI API密钥

### 获取OpenAI API密钥
1. 访问 [OpenAI平台](https://platform.openai.com/)
2. 注册/登录账户
3. 去API Keys页面创建新的API密钥
4. 复制密钥到 `.env` 文件中

## 🚀 启动应用

```bash
cd g:\EvenG1
bun run dev
```

## 💡 使用流程

1. 启动应用服务器
2. 连接MentraOS智能眼镜
3. 说出语音命令
4. 查看眼镜显示的AI回答
5. 如果没听清，使用"repeat"命令重复

## 🔍 故障排除

### 如果OpenAI API不可用
- 应用会自动切换到模拟模式
- 会显示模拟回答和配置提示

### 如果语音识别不准确
- 确保在安静环境中使用
- 清晰地说出激活词
- 检查MentraOS麦克风权限

### 如果显示有问题
- 检查眼镜连接状态
- 重启应用服务器
- 查看控制台错误信息

## 📱 示例对话

```
用户: "Ask AI what is machine learning?"
眼镜显示: "🤖 Thinking..."
眼镜显示: "🤖 AI: Machine learning is a type of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task."

用户: "Sorry can you repeat?"
眼镜显示: "🔄 Repeating: Machine learning is a type of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task."
```

## 🎨 自定义配置

你可以在 `app_config.json` 中：
- 添加更多语音激活词
- 修改工具描述
- 添加新的参数

你可以在 `ai-service.ts` 中：
- 修改AI系统提示词
- 调整回答长度
- 添加更多AI模型选项

<template>
  <div class="about-page">
    <el-card shadow="never" class="app-info-card">
      <div class="app-header">
        <div class="app-icon">
          <el-icon size="64">
            <Picture />
          </el-icon>
        </div>
        <div class="app-info">
          <h1 class="app-name">图片管理器</h1>
          <p class="app-version">版本 {{ appVersion }}</p>
          <p class="app-description">
            一个基于 Electron 和 Vue.js 的现代化图片管理应用
          </p>
        </div>
      </div>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never" class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon><Star /></el-icon>
              <span>主要功能</span>
            </div>
          </template>
          
          <ul class="feature-list">
            <li>
              <el-icon><Check /></el-icon>
              <span>批量选择和预览图片</span>
            </li>
            <li>
              <el-icon><Check /></el-icon>
              <span>支持多种图片格式</span>
            </li>
            <li>
              <el-icon><Check /></el-icon>
              <span>系统图片目录浏览</span>
            </li>
            <li>
              <el-icon><Check /></el-icon>
              <span>图片详情查看</span>
            </li>
            <li>
              <el-icon><Check /></el-icon>
              <span>现代化用户界面</span>
            </li>
            <li>
              <el-icon><Check /></el-icon>
              <span>跨平台支持</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card shadow="never" class="tech-card">
          <template #header>
            <div class="card-header">
              <el-icon><Tools /></el-icon>
              <span>技术栈</span>
            </div>
          </template>
          
          <div class="tech-list">
            <el-tag type="primary" class="tech-tag">Electron</el-tag>
            <el-tag type="success" class="tech-tag">Vue.js 3</el-tag>
            <el-tag type="info" class="tech-tag">Element Plus</el-tag>
            <el-tag type="warning" class="tech-tag">Node.js</el-tag>
            <el-tag type="danger" class="tech-tag">Vite</el-tag>
            <el-tag class="tech-tag">TypeScript</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" class="system-info-card">
      <template #header>
        <div class="card-header">
          <el-icon><Monitor /></el-icon>
          <span>系统信息</span>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="操作系统">
          {{ systemInfo.platform }}
        </el-descriptions-item>
        <el-descriptions-item label="架构">
          {{ systemInfo.arch }}
        </el-descriptions-item>
        <el-descriptions-item label="Node.js 版本">
          {{ systemInfo.nodeVersion }}
        </el-descriptions-item>
        <el-descriptions-item label="Electron 版本">
          {{ systemInfo.electronVersion }}
        </el-descriptions-item>
        <el-descriptions-item label="Chrome 版本">
          {{ systemInfo.chromeVersion }}
        </el-descriptions-item>
        <el-descriptions-item label="V8 版本">
          {{ systemInfo.v8Version }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never" class="contact-card">
      <template #header>
        <div class="card-header">
          <el-icon><Message /></el-icon>
          <span>联系信息</span>
        </div>
      </template>
      
      <div class="contact-content">
        <div class="contact-item">
          <el-icon><Link /></el-icon>
          <span>项目地址：</span>
          <el-link href="https://github.com/your-repo" target="_blank" type="primary">
            GitHub Repository
          </el-link>
        </div>
        
        <div class="contact-item">
          <el-icon><Document /></el-icon>
          <span>文档：</span>
          <el-link href="#" target="_blank" type="primary">
            使用文档
          </el-link>
        </div>
        
        <div class="contact-item">
          <el-icon><QuestionFilled /></el-icon>
          <span>问题反馈：</span>
          <el-link href="https://github.com/your-repo/issues" target="_blank" type="primary">
            Issues
          </el-link>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="license-card">
      <template #header>
        <div class="card-header">
          <el-icon><Document /></el-icon>
          <span>许可证</span>
        </div>
      </template>
      
      <div class="license-content">
        <p>本软件基于 MIT 许可证开源发布。</p>
        <p>Copyright © 2024 图片管理器. All rights reserved.</p>
        
        <div class="license-actions">
          <el-button type="primary" @click="showLicense">查看完整许可证</el-button>
          <el-button @click="checkUpdates">检查更新</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { 
  Picture, Star, Check, Tools, Monitor, Message, 
  Link, Document, QuestionFilled 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 响应式数据
const appVersion = ref('1.0.0')

const systemInfo = reactive({
  platform: 'Unknown',
  arch: 'Unknown',
  nodeVersion: 'Unknown',
  electronVersion: 'Unknown',
  chromeVersion: 'Unknown',
  v8Version: 'Unknown'
})

// 方法
function showLicense() {
  ElMessageBox.alert(
    `MIT License

Copyright (c) 2024 图片管理器

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    'MIT 许可证',
    {
      confirmButtonText: '确定',
      customClass: 'license-dialog'
    }
  )
}

function checkUpdates() {
  ElMessage.info('检查更新功能暂未实现')
}

function getSystemInfo() {
  // 模拟获取系统信息
  systemInfo.platform = navigator.platform || 'Unknown'
  systemInfo.arch = 'x64'
  systemInfo.nodeVersion = process?.versions?.node || 'Unknown'
  systemInfo.electronVersion = process?.versions?.electron || 'Unknown'
  systemInfo.chromeVersion = process?.versions?.chrome || 'Unknown'
  systemInfo.v8Version = process?.versions?.v8 || 'Unknown'
}

onMounted(() => {
  getSystemInfo()
})
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.app-info-card {
  margin-bottom: 20px;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 0;
}

.app-icon {
  color: #409eff;
}

.app-info {
  flex: 1;
}

.app-name {
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: bold;
  color: #303133;
}

.app-version {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #909399;
}

.app-description {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  color: #606266;
}

.feature-list li .el-icon {
  color: #67c23a;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tech-tag {
  font-size: 14px;
  padding: 8px 12px;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-item .el-icon {
  color: #409eff;
}

.license-content {
  line-height: 1.6;
  color: #606266;
}

.license-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

:deep(.license-dialog) {
  width: 80%;
  max-width: 800px;
}

:deep(.license-dialog .el-message-box__message) {
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 400px;
  overflow-y: auto;
}
</style>

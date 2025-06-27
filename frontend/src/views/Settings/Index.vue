<template>
  <div class="settings-page">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>应用设置</span>
        </div>
      </template>
      
      <el-form :model="settings" label-width="120px" class="settings-form">
        <el-form-item label="主题设置">
          <el-radio-group v-model="settings.theme">
            <el-radio value="light">浅色主题</el-radio>
            <el-radio value="dark">深色主题</el-radio>
            <el-radio value="auto">跟随系统</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="语言设置">
          <el-select v-model="settings.language" placeholder="选择语言">
            <el-option label="简体中文" value="zh-CN" />
            <el-option label="English" value="en-US" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="图片预览">
          <el-switch 
            v-model="settings.autoPreview" 
            active-text="自动预览"
            inactive-text="手动预览"
          />
        </el-form-item>
        
        <el-form-item label="最大预览数量">
          <el-input-number 
            v-model="settings.maxPreviewCount" 
            :min="1" 
            :max="50"
            controls-position="right"
          />
          <el-text type="info" size="small" class="help-text">
            同时预览的图片数量限制，避免内存占用过高
          </el-text>
        </el-form-item>
        
        <el-form-item label="缓存设置">
          <el-switch 
            v-model="settings.enableCache" 
            active-text="启用缓存"
            inactive-text="禁用缓存"
          />
        </el-form-item>
        
        <el-form-item label="启动时">
          <el-checkbox-group v-model="settings.startupOptions">
            <el-checkbox value="autoLoadDirectory">自动加载图片目录</el-checkbox>
            <el-checkbox value="rememberLastSession">记住上次会话</el-checkbox>
            <el-checkbox value="checkUpdates">检查更新</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="saveSettings">保存设置</el-button>
          <el-button @click="resetSettings">重置默认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card shadow="never" class="info-card">
      <template #header>
        <div class="card-header">
          <span>存储信息</span>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="缓存大小">
          <el-tag type="info">{{ cacheSize }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="临时文件">
          <el-tag type="warning">{{ tempFiles }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="配置文件">
          <el-text class="config-path">{{ configPath }}</el-text>
        </el-descriptions-item>
        <el-descriptions-item label="操作">
          <el-button type="danger" size="small" @click="clearCache">
            清理缓存
          </el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 响应式数据
const settings = reactive({
  theme: 'light',
  language: 'zh-CN',
  autoPreview: true,
  maxPreviewCount: 10,
  enableCache: true,
  startupOptions: ['checkUpdates']
})

const cacheSize = ref('0 MB')
const tempFiles = ref('0 个')
const configPath = ref('~/.config/image-manager')

// 方法
function saveSettings() {
  // 这里可以调用 Electron 服务保存设置
  localStorage.setItem('imageManagerSettings', JSON.stringify(settings))
  ElMessage.success('设置已保存')
}

function resetSettings() {
  ElMessageBox.confirm(
    '确定要重置所有设置为默认值吗？',
    '重置设置',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    Object.assign(settings, {
      theme: 'light',
      language: 'zh-CN',
      autoPreview: true,
      maxPreviewCount: 10,
      enableCache: true,
      startupOptions: ['checkUpdates']
    })
    ElMessage.success('设置已重置')
  }).catch(() => {
    ElMessage.info('已取消重置')
  })
}

function clearCache() {
  ElMessageBox.confirm(
    '确定要清理所有缓存文件吗？这将删除临时文件和缓存数据。',
    '清理缓存',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 这里可以调用 Electron 服务清理缓存
    cacheSize.value = '0 MB'
    tempFiles.value = '0 个'
    ElMessage.success('缓存已清理')
  }).catch(() => {
    ElMessage.info('已取消清理')
  })
}

function loadSettings() {
  const saved = localStorage.getItem('imageManagerSettings')
  if (saved) {
    try {
      Object.assign(settings, JSON.parse(saved))
    } catch (error) {
      console.error('加载设置失败:', error)
    }
  }
}

function updateStorageInfo() {
  // 模拟获取存储信息
  cacheSize.value = '12.5 MB'
  tempFiles.value = '8 个'
  configPath.value = process.platform === 'win32' 
    ? '%APPDATA%\\image-manager' 
    : '~/.config/image-manager'
}

onMounted(() => {
  loadSettings()
  updateStorageInfo()
})
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-form {
  max-width: 600px;
}

.help-text {
  margin-left: 12px;
}

.info-card {
  margin-top: 20px;
}

.config-path {
  font-family: monospace;
  font-size: 12px;
  word-break: break-all;
}
</style>

<template>
  <div class="settings-container">
    <!-- 页面标题 -->
    <div class="page-header mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">系统设置</h1>
      <p class="text-gray-600">配置系统参数和偏好设置</p>
    </div>

    <!-- 设置选项卡 -->
    <el-tabs v-model="activeTab" class="settings-tabs">
      <!-- 基础设置 -->
      <el-tab-pane label="基础设置" name="basic">
        <div class="settings-panel bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">基础配置</h3>
          
          <el-form :model="basicSettings" label-width="120px" class="settings-form">
            <el-form-item label="系统名称">
              <el-input v-model="basicSettings.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            
            <el-form-item label="系统描述">
              <el-input
                v-model="basicSettings.systemDescription"
                type="textarea"
                :rows="3"
                placeholder="请输入系统描述"
              />
            </el-form-item>
            
            <el-form-item label="默认语言">
              <el-select v-model="basicSettings.defaultLanguage" placeholder="选择默认语言">
                <el-option label="简体中文" value="zh-CN" />
                <el-option label="English" value="en-US" />
                <el-option label="日本語" value="ja-JP" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="时区设置">
              <el-select v-model="basicSettings.timezone" placeholder="选择时区">
                <el-option label="北京时间 (UTC+8)" value="Asia/Shanghai" />
                <el-option label="东京时间 (UTC+9)" value="Asia/Tokyo" />
                <el-option label="纽约时间 (UTC-5)" value="America/New_York" />
              </el-select>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="saveBasicSettings">保存设置</el-button>
              <el-button @click="resetBasicSettings">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- 界面设置 -->
      <el-tab-pane label="界面设置" name="ui">
        <div class="settings-panel bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">界面配置</h3>
          
          <el-form :model="uiSettings" label-width="120px" class="settings-form">
            <el-form-item label="主题模式">
              <el-radio-group v-model="uiSettings.theme">
                <el-radio label="light">亮色主题</el-radio>
                <el-radio label="dark">暗色主题</el-radio>
                <el-radio label="auto">跟随系统</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="主色调">
              <el-color-picker v-model="uiSettings.primaryColor" />
            </el-form-item>
            
            <el-form-item label="侧边栏">
              <el-switch
                v-model="uiSettings.sidebarCollapsed"
                active-text="默认折叠"
                inactive-text="默认展开"
              />
            </el-form-item>
            
            <el-form-item label="面包屑导航">
              <el-switch
                v-model="uiSettings.showBreadcrumb"
                active-text="显示"
                inactive-text="隐藏"
              />
            </el-form-item>
            
            <el-form-item label="动画效果">
              <el-switch
                v-model="uiSettings.enableAnimation"
                active-text="启用"
                inactive-text="禁用"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="saveUISettings">保存设置</el-button>
              <el-button @click="resetUISettings">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- 安全设置 -->
      <el-tab-pane label="安全设置" name="security">
        <div class="settings-panel bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">安全配置</h3>
          
          <el-form :model="securitySettings" label-width="120px" class="settings-form">
            <el-form-item label="会话超时">
              <el-input-number
                v-model="securitySettings.sessionTimeout"
                :min="5"
                :max="1440"
                controls-position="right"
              />
              <span class="ml-2 text-gray-600">分钟</span>
            </el-form-item>
            
            <el-form-item label="密码策略">
              <el-checkbox-group v-model="securitySettings.passwordPolicy">
                <el-checkbox label="requireUppercase">包含大写字母</el-checkbox>
                <el-checkbox label="requireLowercase">包含小写字母</el-checkbox>
                <el-checkbox label="requireNumbers">包含数字</el-checkbox>
                <el-checkbox label="requireSpecialChars">包含特殊字符</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="最小密码长度">
              <el-input-number
                v-model="securitySettings.minPasswordLength"
                :min="6"
                :max="32"
                controls-position="right"
              />
            </el-form-item>
            
            <el-form-item label="登录失败限制">
              <el-input-number
                v-model="securitySettings.maxLoginAttempts"
                :min="3"
                :max="10"
                controls-position="right"
              />
              <span class="ml-2 text-gray-600">次</span>
            </el-form-item>
            
            <el-form-item label="双因子认证">
              <el-switch
                v-model="securitySettings.enableTwoFactor"
                active-text="启用"
                inactive-text="禁用"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="saveSecuritySettings">保存设置</el-button>
              <el-button @click="resetSecuritySettings">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 当前活跃的选项卡
const activeTab = ref('basic')

// 基础设置
const basicSettings = ref({
  systemName: 'Vue Electron App',
  systemDescription: '基于Vue 3和Electron的桌面应用',
  defaultLanguage: 'zh-CN',
  timezone: 'Asia/Shanghai'
})

// 界面设置
const uiSettings = ref({
  theme: 'light',
  primaryColor: '#409EFF',
  sidebarCollapsed: false,
  showBreadcrumb: true,
  enableAnimation: true
})

// 安全设置
const securitySettings = ref({
  sessionTimeout: 30,
  passwordPolicy: ['requireUppercase', 'requireLowercase', 'requireNumbers'],
  minPasswordLength: 8,
  maxLoginAttempts: 5,
  enableTwoFactor: false
})

// 保存基础设置
const saveBasicSettings = () => {
  ElMessage.success('基础设置已保存')
}

// 重置基础设置
const resetBasicSettings = () => {
  basicSettings.value = {
    systemName: 'Vue Electron App',
    systemDescription: '基于Vue 3和Electron的桌面应用',
    defaultLanguage: 'zh-CN',
    timezone: 'Asia/Shanghai'
  }
  ElMessage.info('基础设置已重置')
}

// 保存界面设置
const saveUISettings = () => {
  ElMessage.success('界面设置已保存')
}

// 重置界面设置
const resetUISettings = () => {
  uiSettings.value = {
    theme: 'light',
    primaryColor: '#409EFF',
    sidebarCollapsed: false,
    showBreadcrumb: true,
    enableAnimation: true
  }
  ElMessage.info('界面设置已重置')
}

// 保存安全设置
const saveSecuritySettings = () => {
  ElMessage.success('安全设置已保存')
}

// 重置安全设置
const resetSecuritySettings = () => {
  securitySettings.value = {
    sessionTimeout: 30,
    passwordPolicy: ['requireUppercase', 'requireLowercase', 'requireNumbers'],
    minPasswordLength: 8,
    maxLoginAttempts: 5,
    enableTwoFactor: false
  }
  ElMessage.info('安全设置已重置')
}
</script>

<style lang="scss" scoped>
.settings-container {
  .settings-tabs {
    :deep(.el-tabs__header) {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 24px;
      padding: 0 24px;
    }
    
    :deep(.el-tabs__nav-wrap) {
      &::after {
        display: none;
      }
    }
    
    :deep(.el-tabs__item) {
      font-weight: 500;
      
      &.is-active {
        color: #3b82f6;
      }
    }
  }
  
  .settings-panel {
    transition: box-shadow 0.2s ease;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }
  
  .settings-form {
    max-width: 600px;
    
    :deep(.el-form-item__label) {
      font-weight: 500;
      color: #374151;
    }
  }
}
</style>

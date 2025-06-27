<template>
  <div class="home-page">
    <div class="welcome-section">
      <h1 class="welcome-title">欢迎使用 Vue Electron 应用</h1>
      <p class="welcome-description">这是一个使用双布局系统的示例应用</p>

      <div class="layout-demo">
        <el-card class="demo-card">
          <template #header>
            <div class="card-header">
              <span>布局系统演示</span>
            </div>
          </template>

          <div class="demo-content">
            <p>当前页面使用的是 <strong>MainLayout</strong>，包含顶部导航栏。</p>

            <div class="demo-buttons">
              <el-button type="primary" @click="goToLogin">
                查看 SimpleLayout (登录页面)
              </el-button>

              <el-button type="info" @click="refreshPage"> 刷新当前页面 </el-button>
            </div>
          </div>
        </el-card>

        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>布局特性</span>
            </div>
          </template>

          <div class="features-list">
            <div class="feature-item">
              <el-icon class="feature-icon"><Check /></el-icon>
              <span>MainLayout: 包含导航栏的主应用布局</span>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><Check /></el-icon>
              <span>SimpleLayout: 全屏简洁布局，适用于登录页面</span>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><Check /></el-icon>
              <span>响应式设计，支持移动端适配</span>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><Check /></el-icon>
              <span>Element Plus 组件库集成</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Check } from '@element-plus/icons-vue'

const router = useRouter()

const goToLogin = () => {
  router.push('/auth/login')
}

const refreshPage = () => {
  window.location.reload()
}
</script>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  box-sizing: border-box;
}

.welcome-section {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-title {
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 16px;
}

.welcome-description {
  font-size: 18px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 40px;
}

.layout-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;
}

.demo-card,
.info-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.card-header {
  font-weight: 600;
  font-size: 16px;
  color: #2c3e50;
}

.demo-content {
  text-align: center;
}

.demo-content p {
  margin-bottom: 24px;
  color: #5a6c7d;
  line-height: 1.6;
}

.demo-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #5a6c7d;
}

.feature-icon {
  color: #67c23a;
  font-size: 18px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout-demo {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .welcome-title {
    font-size: 24px;
  }

  .welcome-description {
    font-size: 16px;
  }

  .demo-buttons {
    flex-direction: column;
    align-items: center;
  }

  .demo-buttons .el-button {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .home-page {
    padding: 16px;
  }

  .welcome-title {
    font-size: 20px;
  }

  .welcome-description {
    font-size: 14px;
  }
}
</style>

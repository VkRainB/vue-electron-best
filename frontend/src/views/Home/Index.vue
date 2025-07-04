<template>
  <div class="home-page">
    <!-- 主要内容区域 -->
    <div class="home-container">
      <!-- 英雄区域 -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-text">Vue 3 + Electron</span>
          </div>

          <h1 class="hero-title">
            现代化桌面应用
            <span class="title-highlight">开发框架</span>
          </h1>

          <p class="hero-description">
            基于 Vue 3、Element Plus 和 UnoCSS 构建的高性能桌面应用模板
          </p>

          <div class="hero-actions">
            <el-button
              type="primary"
              size="large"
              @click="goToIcons"
              class="action-button primary-button"
            >
              <Icon
                name="gallery"
                category="system"
                size="20px"
                color="white"
                class="mr-2"
                :tooltip="'图标库'"
              />
              浏览图标库
            </el-button>

            <el-button size="large" @click="goToLogin" class="action-button secondary-button">
              <Icon
                name="login"
                category="user"
                size="20px"
                color="currentColor"
                class="mr-2"
                :tooltip="'登录页面'"
              />
              查看登录页
            </el-button>

            <el-button size="large" @click="goToSidebar" class="action-button secondary-button">
              <Icon
                name="dashboard"
                category="system"
                size="20px"
                color="currentColor"
                class="mr-2"
                :tooltip="'管理后台'"
              />
              管理后台
            </el-button>
          </div>
        </div>

        <!-- 装饰性元素 -->
        <div class="hero-decoration">
          <div class="decoration-circle circle-1"></div>
          <div class="decoration-circle circle-2"></div>
          <div class="decoration-circle circle-3"></div>
        </div>
      </section>

      <!-- 特性展示区域 -->
      <section class="features-section">
        <div class="section-header">
          <h2 class="section-title">核心特性</h2>
          <p class="section-subtitle">现代化的技术栈，优雅的用户体验</p>
        </div>

        <div class="features-grid">
          <!-- 技术栈特性 -->
          <div class="feature-card tech-card" @click="handleFeatureClick('tech')">
            <div class="card-icon tech-icon">
              <Icon
                name="tools"
                category="tool"
                size="32px"
                color="currentColor"
                :tooltip="'现代技术栈'"
              />
            </div>
            <h3 class="card-title">现代技术栈</h3>
            <p class="card-description">Vue 3 Composition API + Element Plus + UnoCSS</p>
            <div class="card-tags">
              <span class="tag">Vue 3</span>
              <span class="tag">Element Plus</span>
              <span class="tag">UnoCSS</span>
            </div>
          </div>

          <!-- 图标库特性 -->
          <div class="feature-card icons-card" @click="goToIcons">
            <div class="card-icon icons-icon">
              <Icon
                name="gallery"
                category="system"
                size="32px"
                color="currentColor"
                :tooltip="'图标库'"
              />
            </div>
            <h3 class="card-title">丰富图标库</h3>
            <p class="card-description">WeUI 图标集，支持搜索、预览和一键复制</p>
            <div class="card-stats">
              <span class="stat">
                <span class="stat-number">162+</span>
                <span class="stat-label">图标</span>
              </span>
              <span class="stat">
                <span class="stat-number">100%</span>
                <span class="stat-label">矢量</span>
              </span>
            </div>
          </div>

          <!-- 响应式设计特性 -->
          <div class="feature-card responsive-card" @click="handleFeatureClick('responsive')">
            <div class="card-icon responsive-icon">
              <Icon
                name="i-weui-computer-outlined"
                size="32px"
                color="currentColor"
                :tooltip="'响应式设计'"
              />
            </div>
            <h3 class="card-title">响应式设计</h3>
            <p class="card-description">适配各种屏幕尺寸，完美的移动端体验</p>
            <div class="card-features">
              <div class="feature-item">
                <el-icon class="feature-icon"><Check /></el-icon>
                <span>桌面端优化</span>
              </div>
              <div class="feature-item">
                <el-icon class="feature-icon"><Check /></el-icon>
                <span>移动端适配</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 快速开始区域 -->
      <section class="quickstart-section">
        <div class="quickstart-card">
          <div class="quickstart-content">
            <h3 class="quickstart-title">快速开始</h3>
            <p class="quickstart-description">探索应用的各项功能，体验现代化的桌面应用开发</p>
          </div>

          <div class="quickstart-actions">
            <el-button type="primary" @click="goToIcons" class="quickstart-button">
              开始探索
            </el-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'
import Icon from '@/components/Icon.vue'

const router = useRouter()

// 导航方法
const goToLogin = () => {
  router.push('/auth/login')
}

const goToIcons = () => {
  router.push('/icons')
}

const goToSidebar = () => {
  router.push('/sidebar/dashboard')
}

// 特性点击处理
const handleFeatureClick = (feature) => {
  switch (feature) {
    case 'tech':
      ElMessage.info('技术栈信息：Vue 3 + Element Plus + UnoCSS + Electron')
      break
    case 'responsive':
      ElMessage.success('响应式设计已在各个页面中实现')
      break
    default:
      break
  }
}
</script>

<style scoped>
/* 页面整体布局 */
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
}

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 英雄区域 */
.hero-section {
  position: relative;
  padding: 80px 0 120px;
  text-align: center;
  color: white;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-block;
  margin-bottom: 24px;
}

.badge-text {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-highlight {
  background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  border-radius: 50px;
  padding: 12px 32px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
}

.primary-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 装饰性元素 */
.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 5%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  top: 50%;
  right: 5%;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 特性展示区域 */
.features-section {
  background: white;
  padding: 80px 0;
  border-radius: 32px 32px 0 0;
  margin-top: -32px;
  position: relative;
  z-index: 3;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #718096;
  max-width: 500px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
}

/* 特性卡片 */
.feature-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: white;
}

.tech-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.icons-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.responsive-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
}

.card-description {
  font-size: 1rem;
  color: #718096;
  line-height: 1.6;
  margin-bottom: 24px;
}

/* 技术标签 */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

/* 统计数据 */
.card-stats {
  display: flex;
  gap: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
}

.stat-label {
  font-size: 0.875rem;
  color: #718096;
  margin-top: 4px;
}

/* 特性列表 */
.card-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #4a5568;
}

.feature-icon {
  color: #48bb78;
  font-size: 16px;
}

/* 快速开始区域 */
.quickstart-section {
  background: #f7fafc;
  padding: 60px 0;
}

.quickstart-card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.quickstart-content {
  flex: 1;
}

.quickstart-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
}

.quickstart-description {
  font-size: 1.125rem;
  color: #718096;
  line-height: 1.6;
}

.quickstart-actions {
  flex-shrink: 0;
}

.quickstart-button {
  border-radius: 50px;
  padding: 16px 32px;
  font-weight: 600;
  font-size: 1.125rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .action-button {
    width: 100%;
    max-width: 280px;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .feature-card {
    padding: 24px;
  }

  .quickstart-card {
    flex-direction: column;
    text-align: center;
    padding: 32px;
  }

  .decoration-circle {
    display: none;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 0 16px;
  }

  .hero-section {
    padding: 60px 0 80px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .features-section {
    padding: 60px 0;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .quickstart-section {
    padding: 40px 0;
  }
}
</style>

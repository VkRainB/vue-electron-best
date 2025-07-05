<script setup>
import { Check } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import Icon from '@/components/icon/index.vue';

const router = useRouter();

// 导航方法
function goToLogin() {
  router.push('/auth/login');
}

function goToIcons() {
  router.push('/icons');
}

function goToSidebar() {
  router.push('/sidebar/dashboard');
}

// 特性点击处理
function handleFeatureClick(feature) {
  switch (feature) {
    case 'tech':
      ElMessage.info('技术栈信息：Vue 3 + Element Plus + UnoCSS + Electron');
      break;
    case 'responsive':
      ElMessage.success('响应式设计已在各个页面中实现');
      break;
    default:
      break;
  }
}
</script>

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

          <p class="hero-description">基于 Vue 3、Element Plus 和 UnoCSS 构建的高性能桌面应用模板</p>

          <div class="hero-actions">
            <el-button type="primary" size="large" class="action-button primary-button" @click="goToIcons">
              <Icon name="gallery" category="system" size="20px" color="white" class="mr-2" tooltip="图标库" />
              浏览图标库
            </el-button>

            <el-button size="large" class="action-button secondary-button" @click="goToLogin">
              <Icon name="login" category="user" size="20px" color="currentColor" class="mr-2" tooltip="登录页面" />
              查看登录页
            </el-button>

            <el-button size="large" class="action-button secondary-button" @click="goToSidebar">
              <Icon
                name="dashboard"
                category="system"
                size="20px"
                color="currentColor"
                class="mr-2"
                tooltip="管理后台"
              />
              管理后台
            </el-button>
          </div>
        </div>

        <!-- 装饰性元素 -->
        <div class="hero-decoration">
          <div class="decoration-circle circle-1" />
          <div class="decoration-circle circle-2" />
          <div class="decoration-circle circle-3" />
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
              <Icon name="tools" category="tool" size="32px" color="currentColor" tooltip="现代技术栈" />
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
              <Icon name="gallery" category="system" size="32px" color="currentColor" tooltip="图标库" />
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
              <Icon name="i-weui-computer-outlined" size="32px" color="currentColor" tooltip="响应式设计" />
            </div>
            <h3 class="card-title">响应式设计</h3>
            <p class="card-description">适配各种屏幕尺寸，完美的移动端体验</p>
            <div class="card-features">
              <div class="feature-item">
                <el-icon class="feature-icon">
                  <Check />
                </el-icon>
                <span>桌面端优化</span>
              </div>
              <div class="feature-item">
                <el-icon class="feature-icon">
                  <Check />
                </el-icon>
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
            <el-button type="primary" class="quickstart-button" @click="goToIcons">开始探索</el-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>

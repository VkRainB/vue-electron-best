<script setup>
import { ref } from 'vue';

const features = ref([
  {
    icon: 'i-weui-desktop',
    title: '跨平台',
    description: '支持 Windows、MacOS、Linux 多平台',
    color: '#409EFF',
  },
  {
    icon: 'i-weui-setting',
    title: '功能丰富',
    description: '集成多种常用功能和组件',
    color: '#67C23A',
  },
  {
    icon: 'i-weui-brush',
    title: '主题定制',
    description: '支持自定义主题和暗黑模式',
    color: '#E6A23C',
  },
  {
    icon: 'i-weui-lightning-bolt',
    title: '快速开发',
    description: '提供完整的开发框架和工具链',
    color: '#F56C6C',
  },
]);
</script>

<template>
  <div class="home-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <Icon name="i-weui-star-outlined" size="80" color="var(--el-color-primary)" />
      <h1 class="welcome-title">
        欢迎使用
      </h1>
      <p class="welcome-desc">
        Vue3 + Electron + Element Plus 模板
      </p>
    </div>

    <!-- 功能卡片区域 -->
    <div class="features-grid">
      <el-card v-for="feature in features" :key="feature.title" class="feature-card">
        <div class="feature-content">
          <Icon :name="feature.icon" size="32" :color="feature.color" />
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 1rem;

  .welcome-title {
    font-size: 2.5rem;
    font-weight: 600;
    margin: 1rem 0;
    background: linear-gradient(120deg, var(--el-color-primary), var(--el-color-success));
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }

  .welcome-desc {
    font-size: 1.2rem;
    color: var(--el-text-color-secondary);
    margin-top: 0.5rem;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.feature-card {
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .feature-content {
    text-align: center;
    padding: 1rem;

    h3 {
      margin: 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    p {
      color: var(--el-text-color-secondary);
      line-height: 1.5;
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .home-container {
    padding: 0.5rem;
  }

  .welcome-section {
    padding: 1rem;

    .welcome-title {
      font-size: 2rem;
    }

    .welcome-desc {
      font-size: 1rem;
    }
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>

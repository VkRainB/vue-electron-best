<template>
  <div class="w-full min-h-full bg-gradient-to-br from-gray-50 to-blue-50 p-5 box-border">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-8 font-semibold text-gray-800 text-center mb-4">
        欢迎使用 Vue Electron 应用
      </h1>
      <p class="text-lg text-gray-600 text-center mb-10">这是一个使用双布局系统的示例应用</p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <el-card class="shadow-lg rounded-3 border-0">
          <template #header>
            <div class="font-semibold text-4 text-gray-800">
              <span>布局系统演示</span>
            </div>
          </template>

          <div class="text-center">
            <p class="mb-6 text-gray-600 leading-relaxed">
              当前页面使用的是 <strong>MainLayout</strong>，包含顶部导航栏。
            </p>

            <div class="flex gap-3 justify-center flex-wrap">
              <el-button type="primary" @click="goToLogin" class="min-w-48">
                查看 SimpleLayout (登录页面)
              </el-button>

              <el-button type="info" @click="refreshPage" class="min-w-48">
                刷新当前页面
              </el-button>
            </div>
          </div>
        </el-card>

        <el-card class="shadow-lg rounded-3 border-0">
          <template #header>
            <div class="font-semibold text-4 text-gray-800">
              <span @click="goToIcons">图标</span>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Check, Grid } from '@element-plus/icons-vue'

const router = useRouter()

const goToLogin = () => {
  router.push('/auth/login')
}

const refreshPage = () => {
  window.location.reload()
}

const goToIcons = () => {
  router.push('/icons')
}
</script>

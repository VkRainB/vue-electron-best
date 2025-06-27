<template>
  <div
    class="w-screen h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5 sm:p-4 box-border"
  >
    <div class="w-full max-w-md flex flex-col items-center">
      <div class="w-full bg-white/95 rounded-4 p-10 sm:p-8 shadow-2xl backdrop-blur-md">
        <div class="text-center mb-8">
          <h1 class="text-7 sm:text-6 font-semibold text-gray-800 mb-2">欢迎登录</h1>
          <p class="text-4 sm:text-3.5 text-gray-600">Vue Electron 应用</p>
        </div>

        <el-form class="w-full" :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username" class="mb-6">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              prefix-icon="User"
              class="h-12"
            />
          </el-form-item>

          <el-form-item prop="password" class="mb-6">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              prefix-icon="Lock"
              show-password
              class="h-12"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="w-full h-12 text-4 font-medium rounded-2"
              @click="handleLogin"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="text-center mt-6">
          <el-button
            type="text"
            @click="goToMain"
            class="text-indigo-600 text-sm hover:text-indigo-800"
          >
            跳过登录，直接进入主页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loginFormRef = ref()
const loading = ref(false)

// 表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 登录处理
const handleLogin = async () => {
  try {
    const valid = await loginFormRef.value.validate()
    if (!valid) return

    loading.value = true

    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1000))

    ElMessage.success('登录成功！')
    router.push('/home')
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}

// 跳转到主页
const goToMain = () => {
  router.push('/home')
}
</script>

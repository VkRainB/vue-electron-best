<script setup>
import { Hide, Lock, User, View } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Update from '@/components/app/updatePage.vue';
import { useAppStore } from '@/stores/modules/app';

const { showUpdate } = storeToRefs(useAppStore());
const router = useRouter();
const loginFormRef = ref();
const loading = ref(false);
const loginForm = reactive({
  username: '',
  password: '',
});
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
};
const remenberPsw = ref(false); // 记住密码
const autoLogin = ref(false); // 自动登录
const passwordVisible = ref(false); // 密码可见性
const pwdInputRef = ref();

watch(() => showUpdate.value, (newValue) => {
  newValue ? ipc.send('win:setSize', 'normal') : ipc.send('win:setSize', 'small');
}, { immediate: true });

// 切换密码可见性
async function handleTogglePwdVisible() {
  passwordVisible.value = !passwordVisible.value;
  await nextTick();
  const inputEl = pwdInputRef.value?.input;
  if (inputEl) {
    inputEl.focus();
    // 延迟执行，确保DOM完全更新
    setTimeout(() => {
      const textLength = inputEl.value.length;
      // 直接设置光标位置到末尾
      inputEl.selectionStart = textLength;
      inputEl.selectionEnd = textLength;
    }, 0);
  }
}
// 登录处理
async function handleLogin() {
  try {
    // const valid = await loginFormRef.value.validate();
    // if (!valid) return;

    loading.value = true;

    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000));

    ElMessage.success('登录成功！');

    router.push('/home');
    await nextTick();
    setTimeout(() => {
      ipc.send('win:setSize', 'large');
    }, 500);
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <div
    v-show="!showUpdate"
    class="w-full h-full bg-white flex items-center justify-center"
  >
    <div class=" flex flex-col items-center">
      <div class="w-full rounded-4 p-8 pt-5 select-none only-xs:shadow-0  xs:shadow-2xl ">
        <div class="flex justify-center mb-5">
          <div class=" mb-2">
            <Icon name="svg-sys-electron" size="50" />
          </div>
        </div>

        <el-form ref="loginFormRef" class="w-full" :model="loginForm" :rules="rules">
          <el-form-item prop="username" class="mb-6">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item prop="password" class="mb-6">
            <el-input
              ref="pwdInputRef"
              v-model="loginForm.password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              size="large"
            >
              <template #suffix>
                <el-icon style="cursor: pointer;" @click="handleTogglePwdVisible">
                  <component :is="passwordVisible ? View : Hide" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- 记住密码/自动登录 -->
          <el-form-item>
            <div class="w-full flex justify-between">
              <el-checkbox v-model="remenberPsw" label="记住密码" size="large" />
              <el-checkbox v-model="autoLogin" label="自动登录" size="large" />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="default"
              class="w-full text-4 font-medium rounded-2"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <Update v-show="showUpdate" />
</template>

<style scoped lang="scss">
// 300px取消阴影
@media (width: 300px) {
  .only-xs\:shadow-0 {
    box-shadow: none
  }
}
</style>

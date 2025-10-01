<script setup>
import { Hide, Lock, User, View } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Update from '@/components/app/updatePage.vue';
import { useAppStore } from '@/store/modules/app';
import { compileDecode, compileEncode } from '@/utils';

const { showUpdate } = storeToRefs(useAppStore());
const router = useRouter();
const loginFormRef = ref();
const loading = ref(false);
const loginForm = reactive({
  account: '',
  password: '',
});
const rules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
};
const remenberPsw = ref(false); // 记住密码
const autoLogin = ref(false); // 自动登录
const autoStatus = ref(false); // 自动登录状态
let autoLoginTimer = null;

const passwordVisible = ref(false); // 密码可见性
const pwdInputRef = ref();

watch(
  () => showUpdate.value,
  (newValue) => {
    newValue ? ipc.send('win:setSize', 'normal') : ipc.send('win:setSize', 'small');
  },
  { immediate: true }
);

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

// 取消自动登录
function cancelAutoLogin() {
  clearTimeout(autoLoginTimer);

  autoLogin.value = false;
  autoStatus.value = false;
  localStorage.removeItem('autoLogin');
}
// 登录处理
async function handleLogin() {
  try {
    if (loginFormRef.value) {
      const valid = await loginFormRef.value.validate();
      if (!valid) return;
    }

    loading.value = true;



    if (true) {
      localStorage.setItem('autoLogin', autoLogin.value);
      const certificate = compileEncode(`${loginForm.account}^login^${loginForm.password}`);
      remenberPsw.value ? localStorage.setItem('login', certificate) : localStorage.removeItem('login');


      ElMessage.success('登录成功！');

      router.push('/home');
      nextTick(() => {
        ipc.send('win:setSize', 'large');
      });
    } else {
      ElMessage.error(res.msg || '登录失败!');

      // 自动登录情况下，登录失败退出自动登录
      autoStatus.value = false;
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}

onMounted(() => {
  console.log('Storage test:', {
    isElectron: typeof window !== 'undefined' && window.require,
    localStorage: typeof localStorage !== 'undefined',
    userDataPath: window.require ? window.require('electron').remote?.app.getPath('userData') : null,
  });
  // 获取凭证信息
  const certificate = localStorage.getItem('login');
  if (certificate) {
    const decodedStr = compileDecode(certificate);
    const [account, password] = decodedStr.split('^login^') || [];
    console.log(account, password);
    account && (loginForm.account = account);
    password && (loginForm.password = password);
    remenberPsw.value = true;
  }

  // 自动登录
  const autoLoginStorage = localStorage.getItem('autoLogin');
  autoLogin.value = autoLoginStorage === 'true';
  autoStatus.value = autoLogin.value;

  if (autoLogin.value) {
    autoLoginTimer = setTimeout(() => {
      console.log('自动登录');
      handleLogin();
    }, 2000);
  }
});

onUnmounted(() => {
  clearTimeout(autoLoginTimer);
});
</script>

<template>
  <div v-show="!showUpdate" class="w-full h-full bg-white flex items-center justify-center">
    <div class="flex flex-col items-center" v-loading="loading">
      <!-- 登录界面 -->
      <template v-if="!autoStatus">
        <div class="w-full rounded-4 p-8 pt-5 select-none only-xs:shadow-0 xs:shadow-2xl">
          <div class="flex justify-center mb-4">
            <div class="mb-2">
              <Icon name="svg-sys-electron" size="50" />
            </div>
          </div>

          <el-form ref="loginFormRef" class="w-full" :model="loginForm" :rules="rules">
            <el-form-item prop="account" class="mb-6">
              <el-input v-model="loginForm.account" placeholder="请输入用户名" size="large" :prefix-icon="User" />
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
                  <el-icon style="cursor: pointer" @click="handleTogglePwdVisible">
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
      </template>

      <!-- 自动登录 -->
      <template v-else>
        <div
          class="flex flex-col items-center justify-center min-h-screen gap-3 absolute only-xs:shadow-0 xs:shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span class="text-lg flex items-center gap-2">
            <el-icon><User /></el-icon>
            {{ loginForm.account }}
          </span>
          <p>自动登录中，请稍等...</p>
          <el-button class="w-full" @click="cancelAutoLogin()">退 出</el-button>
        </div>
      </template>
    </div>
  </div>
  <!-- 更新面板 -->
  <Update v-show="showUpdate" />
</template>

<style scoped lang="scss">
// 300px取消阴影
@media (width: 300px) {
  .only-xs\:shadow-0 {
    box-shadow: none;
  }
}
</style>

<template>
  <div class="user-management-container">
    <!-- 页面标题 -->
    <div class="page-header mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        用户管理
      </h1>
      <p class="text-gray-600">
        管理系统用户信息和权限
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="stat-card bg-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">
              总用户数
            </p>
            <p class="text-3xl font-bold text-blue-600">
              1,234
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon name="el-icon-User" size="2em" color="#2563eb" />
          </div>
        </div>
      </div>

      <div class="stat-card bg-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">
              活跃用户
            </p>
            <p class="text-3xl font-bold text-green-600">
              856
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Icon name="el-icon-UserFilled" size="2em" color="#22c55e" />
          </div>
        </div>
      </div>

      <div class="stat-card bg-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">
              新增用户
            </p>
            <p class="text-3xl font-bold text-orange-600">
              42
            </p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Icon name="el-icon-Plus" size="2em" color="#f59e42" />
          </div>
        </div>
      </div>
    </div>

    <!-- 用户列表 -->
    <div class="user-list bg-white p-6 rounded-xl shadow-lg">
      <div class="list-header flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">
          用户列表
        </h3>
        <el-button type="primary" @click="handleAddUser">
          <Icon name="el-icon-Plus" size="1em" class="mr-1" />
          添加用户
        </el-button>
      </div>

      <div class="user-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="user in users"
          :key="user.id"
          class="user-card p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-3 mb-3">
            <el-avatar :size="48" :src="user.avatar" />
            <div>
              <h4 class="font-semibold text-gray-800">
                {{ user.name }}
              </h4>
              <p class="text-gray-600 text-sm">
                {{ user.email }}
              </p>
            </div>
          </div>

          <div class="user-info space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 text-sm">角色:</span>
              <el-tag :type="getRoleType(user.role)" size="small">
                {{ user.role }}
              </el-tag>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-600 text-sm">状态:</span>
              <el-tag :type="getStatusType(user.status)" size="small">
                {{ user.status }}
              </el-tag>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-600 text-sm">注册时间:</span>
              <span class="text-gray-800 text-sm">{{ user.createTime }}</span>
            </div>
          </div>

          <div class="user-actions mt-4 flex gap-2">
            <el-button type="primary" size="small" @click="handleEditUser(user)">
              编辑
            </el-button>
            <el-button type="warning" size="small" @click="handleResetPassword(user)">
              重置密码
            </el-button>
            <el-button type="danger" size="small" @click="handleDeleteUser(user)">
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';

// 模拟用户数据
const users = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: '活跃',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2024-01-15',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: '活跃',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2024-01-16',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: '禁用',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2024-01-17',
  },
]);

// 获取角色标签类型
function getRoleType(role) {
  const typeMap = {
    管理员: 'danger',
    编辑: 'warning',
    用户: 'primary',
  };
  return typeMap[role] || 'info';
}

// 获取状态标签类型
function getStatusType(status) {
  const typeMap = {
    活跃: 'success',
    禁用: 'danger',
    待审核: 'warning',
  };
  return typeMap[status] || 'info';
}

// 处理添加用户
function handleAddUser() {
  ElMessage.success('添加用户功能开发中...');
}

// 处理编辑用户
function handleEditUser(user) {
  ElMessage.info(`编辑用户：${user.name}`);
}

// 处理重置密码
function handleResetPassword(user) {
  ElMessageBox.confirm(`确定要重置用户"${user.name}"的密码吗？`, '确认重置', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('密码重置成功');
    })
    .catch(() => {
      ElMessage.info('已取消重置');
    });
}

// 处理删除用户
function handleDeleteUser(user) {
  ElMessageBox.confirm(`确定要删除用户"${user.name}"吗？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
}
</script>

<style scoped></style>

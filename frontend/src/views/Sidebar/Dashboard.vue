<template>
  <div class="dashboard-container">
    <!-- 页面标题 -->
    <div class="page-header mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        仪表板
      </h1>
      <p class="text-gray-600">
        欢迎使用SidebarLayout布局，这是一个功能丰富的管理后台界面
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="stat-card bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">
              总用户数
            </p>
            <p class="text-3xl font-bold">
              1,234
            </p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon name="users" category="user" size="24px" color="white" tooltip="总用户数" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-blue-100 text-sm">
          <el-icon class="mr-1">
            <TrendCharts />
          </el-icon>
          <span>+12% 较上月</span>
        </div>
      </div>

      <div class="stat-card bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">
              活跃用户
            </p>
            <p class="text-3xl font-bold">
              856
            </p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon name="i-weui-user-outlined" size="24px" color="white" tooltip="活跃用户" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-green-100 text-sm">
          <el-icon class="mr-1">
            <TrendCharts />
          </el-icon>
          <span>+8% 较上月</span>
        </div>
      </div>

      <div class="stat-card bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">
              数据量
            </p>
            <p class="text-3xl font-bold">
              45.2K
            </p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon name="i-weui-file-outlined" size="24px" color="white" tooltip="数据量" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-purple-100 text-sm">
          <el-icon class="mr-1">
            <TrendCharts />
          </el-icon>
          <span>+15% 较上月</span>
        </div>
      </div>

      <div class="stat-card bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium">
              收入
            </p>
            <p class="text-3xl font-bold">
              ¥89.5K
            </p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <el-icon class="text-2xl">
              <Money />
            </el-icon>
          </div>
        </div>
        <div class="mt-4 flex items-center text-orange-100 text-sm">
          <el-icon class="mr-1">
            <TrendCharts />
          </el-icon>
          <span>+22% 较上月</span>
        </div>
      </div>
    </div>

    <!-- 图表和表格区域 -->
    <div class="content-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 图表卡片 -->
      <div class="chart-card bg-white p-6 rounded-xl shadow-lg">
        <div class="card-header flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            访问趋势
          </h3>
          <el-button type="primary" size="small" plain>
            <el-icon class="mr-1">
              <Refresh />
            </el-icon>
            刷新
          </el-button>
        </div>
        <div class="chart-placeholder h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <el-icon class="text-4xl mb-2">
              <TrendCharts />
            </el-icon>
            <p>图表区域</p>
            <p class="text-sm">
              这里可以集成 ECharts 或其他图表库
            </p>
          </div>
        </div>
      </div>

      <!-- 快速操作卡片 -->
      <div class="actions-card bg-white p-6 rounded-xl shadow-lg">
        <div class="card-header mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            快速操作
          </h3>
        </div>
        <div class="actions-grid grid grid-cols-2 gap-4">
          <el-button
            type="primary"
            size="large"
            class="h-16 flex flex-col items-center justify-center"
            @click="handleAction('add-user')"
          >
            <Icon name="i-weui-add-outlined" size="20px" color="white" class="mb-1" tooltip="添加用户" />
            <span class="text-sm">添加用户</span>
          </el-button>

          <el-button
            type="success"
            size="large"
            class="h-16 flex flex-col items-center justify-center"
            @click="handleAction('export-data')"
          >
            <Icon name="i-weui-download-outlined" size="20px" color="white" class="mb-1" tooltip="导出数据" />
            <span class="text-sm">导出数据</span>
          </el-button>

          <el-button
            type="warning"
            size="large"
            class="h-16 flex flex-col items-center justify-center"
            @click="handleAction('system-settings')"
          >
            <el-icon class="text-xl mb-1">
              <Setting />
            </el-icon>
            <span class="text-sm">系统设置</span>
          </el-button>

          <el-button
            type="info"
            size="large"
            class="h-16 flex flex-col items-center justify-center"
            @click="handleAction('view-reports')"
          >
            <el-icon class="text-xl mb-1">
              <Document />
            </el-icon>
            <span class="text-sm">查看报告</span>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="activity-card bg-white p-6 rounded-xl shadow-lg mt-6">
      <div class="card-header flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">
          最近活动
        </h3>
        <el-link type="primary" :underline="false">
          查看全部
        </el-link>
      </div>
      <div class="activity-list space-y-4">
        <div class="activity-item flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div class="activity-icon w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <el-icon>
              <User />
            </el-icon>
          </div>
          <div class="activity-content flex-1">
            <p class="text-gray-800 font-medium">
              新用户注册
            </p>
            <p class="text-gray-500 text-sm">
              张三 刚刚注册了账号
            </p>
          </div>
          <div class="activity-time text-gray-400 text-sm">
            2分钟前
          </div>
        </div>

        <div class="activity-item flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div
            class="activity-icon w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
          >
            <el-icon>
              <Document />
            </el-icon>
          </div>
          <div class="activity-content flex-1">
            <p class="text-gray-800 font-medium">
              数据导出完成
            </p>
            <p class="text-gray-500 text-sm">
              用户数据已成功导出
            </p>
          </div>
          <div class="activity-time text-gray-400 text-sm">
            5分钟前
          </div>
        </div>

        <div class="activity-item flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div
            class="activity-icon w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"
          >
            <el-icon>
              <Setting />
            </el-icon>
          </div>
          <div class="activity-content flex-1">
            <p class="text-gray-800 font-medium">
              系统配置更新
            </p>
            <p class="text-gray-500 text-sm">
              管理员更新了系统配置
            </p>
          </div>
          <div class="activity-time text-gray-400 text-sm">
            10分钟前
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Document,
  Money,
  Refresh,
  Setting,
  TrendCharts,
  User,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import Icon from '@/components/icon/index.vue';

// 处理快速操作
function handleAction(action) {
  const actionMap = {
    'add-user': '添加用户',
    'export-data': '导出数据',
    'system-settings': '系统设置',
    'view-reports': '查看报告',
  };

  ElMessage.success(`${actionMap[action]}功能开发中...`);
}
</script>

<style scoped></style>

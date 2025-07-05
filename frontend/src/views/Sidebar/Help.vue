<template>
  <div class="help-container">
    <!-- 页面标题 -->
    <div class="page-header mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        帮助中心
      </h1>
      <p class="text-gray-600">
        查找常见问题解答和使用指南
      </p>
    </div>

    <!-- 搜索框 -->
    <div class="search-section bg-white p-6 rounded-xl shadow-lg mb-6">
      <el-input v-model="searchQuery" placeholder="搜索帮助内容..." size="large" clearable @input="handleSearch">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>

    <!-- 帮助内容 -->
    <div class="help-content grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 常见问题 -->
      <div class="faq-section bg-white p-6 rounded-xl shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <el-icon class="mr-2 text-blue-600">
            <Icon name="el-icon-QuestionFilled" size="1em" class="mr-2 text-blue-600" />
          </el-icon>
          常见问题
        </h3>

        <el-collapse v-model="activeFAQ" accordion>
          <el-collapse-item v-for="faq in faqs" :key="faq.id" :title="faq.question" :name="faq.id">
            <p class="text-gray-600 leading-relaxed">
              {{ faq.answer }}
            </p>
          </el-collapse-item>
        </el-collapse>
      </div>

      <!-- 快速指南 -->
      <div class="guide-section bg-white p-6 rounded-xl shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <el-icon class="mr-2 text-green-600">
            <Icon name="el-icon-Document" size="1em" class="mr-2 text-green-600" />
          </el-icon>
          快速指南
        </h3>

        <div class="guide-list space-y-3">
          <div
            v-for="guide in guides"
            :key="guide.id"
            class="guide-item p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
            @click="openGuide(guide)"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <el-icon>
                  <component :is="guide.icon" />
                </el-icon>
              </div>
              <div>
                <h4 class="font-medium text-gray-800">
                  {{ guide.title }}
                </h4>
                <p class="text-gray-600 text-sm">
                  {{ guide.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系支持 -->
      <div class="support-section bg-white p-6 rounded-xl shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <el-icon class="mr-2 text-purple-600">
            <Icon name="el-icon-Service" size="1em" class="mr-2 text-purple-600" />
          </el-icon>
          联系支持
        </h3>

        <div class="support-options space-y-4">
          <div class="support-item p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3 mb-2">
              <el-icon class="text-blue-600">
                <Icon name="el-icon-Message" size="1em" class="text-blue-600" />
              </el-icon>
              <span class="font-medium text-gray-800">在线客服</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">
              工作时间：9:00-18:00
            </p>
            <el-button type="primary" size="small" @click="openChat">
              开始对话
            </el-button>
          </div>

          <div class="support-item p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3 mb-2">
              <el-icon class="text-green-600">
                <Icon name="el-icon-Phone" size="1em" class="text-green-600" />
              </el-icon>
              <span class="font-medium text-gray-800">电话支持</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">
              400-123-4567
            </p>
            <el-button type="success" size="small" @click="callSupport">
              拨打电话
            </el-button>
          </div>

          <div class="support-item p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3 mb-2">
              <el-icon class="text-orange-600">
                <Icon name="el-icon-Message" size="1em" class="text-orange-600" />
              </el-icon>
              <span class="font-medium text-gray-800">邮件支持</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">
              support@example.com
            </p>
            <el-button type="warning" size="small" @click="sendEmail">
              发送邮件
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频教程 -->
    <div class="video-section bg-white p-6 rounded-xl shadow-lg mt-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <el-icon class="mr-2 text-red-600">
          <Icon name="el-icon-VideoPlay" size="1em" class="mr-2 text-red-600" />
        </el-icon>
        视频教程
      </h3>

      <div class="video-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="video in videos"
          :key="video.id"
          class="video-item border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          @click="playVideo(video)"
        >
          <div class="video-thumbnail h-32 bg-gray-200 flex items-center justify-center">
            <el-icon class="text-4xl text-gray-400">
              <Icon name="el-icon-VideoPlay" size="2em" class="text-4xl text-gray-400" />
            </el-icon>
          </div>
          <div class="video-info p-3">
            <h4 class="font-medium text-gray-800 mb-1">
              {{ video.title }}
            </h4>
            <p class="text-gray-600 text-sm">
              {{ video.duration }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Search,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

// 搜索查询
const searchQuery = ref('');
const activeFAQ = ref('1');

// 常见问题数据
const faqs = ref([
  {
    id: '1',
    question: '如何重置密码？',
    answer: '您可以在登录页面点击"忘记密码"链接，然后按照提示操作重置密码。',
  },
  {
    id: '2',
    question: '如何修改个人信息？',
    answer: '登录后点击右上角的用户头像，选择"个人资料"即可修改个人信息。',
  },
  {
    id: '3',
    question: '如何联系客服？',
    answer: '您可以通过在线客服、电话或邮件的方式联系我们的客服团队。',
  },
  {
    id: '4',
    question: '数据安全如何保障？',
    answer: '我们采用多层安全防护措施，包括数据加密、访问控制和定期备份。',
  },
]);

// 快速指南数据
const guides = ref([
  {
    id: 1,
    title: '新手入门',
    description: '了解系统基本功能',
    icon: 'User',
  },
  {
    id: 2,
    title: '数据管理',
    description: '学习如何管理数据',
    icon: 'DataBoard',
  },
  {
    id: 3,
    title: '系统设置',
    description: '配置系统参数',
    icon: 'Setting',
  },
]);

// 视频教程数据
const videos = ref([
  {
    id: 1,
    title: '系统概览',
    duration: '5:30',
  },
  {
    id: 2,
    title: '用户管理',
    duration: '8:15',
  },
  {
    id: 3,
    title: '数据导入导出',
    duration: '6:45',
  },
]);

// 处理搜索
function handleSearch() {
  if (searchQuery.value) {
    ElMessage.info(`搜索: ${searchQuery.value}`);
  }
}

// 打开指南
function openGuide(guide) {
  ElMessage.info(`打开指南: ${guide.title}`);
}

// 打开在线客服
function openChat() {
  ElMessage.success('正在连接在线客服...');
}

// 拨打电话
function callSupport() {
  ElMessage.info('正在拨打客服电话...');
}

// 发送邮件
function sendEmail() {
  ElMessage.info('正在打开邮件客户端...');
}

// 播放视频
function playVideo(video) {
  ElMessage.info(`播放视频: ${video.title}`);
}
</script>

<style scoped></style>

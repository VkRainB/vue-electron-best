<template>
  <div class="image-manager">
    <!-- 操作区域 -->
    <el-card class="operation-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>图片操作</span>
        </div>
      </template>

      <div class="operation-buttons">
        <el-button
          type="primary"
          :icon="FolderOpened"
          @click="selectImages"
          :loading="loading"
          size="large"
        >
          {{ loading ? '选择中...' : '选择图片' }}
        </el-button>

        <el-button
          type="success"
          :icon="View"
          @click="loadSelectedImages"
          :disabled="!selectedImages.length || loading"
          :loading="loadingImages"
          size="large"
        >
          {{ loadingImages ? '加载中...' : '加载预览' }}
        </el-button>

        <el-button
          type="warning"
          :icon="Delete"
          @click="clearSelection"
          :disabled="!selectedImages.length"
          size="large"
        >
          清空选择
        </el-button>

        <el-button type="info" :icon="Folder" @click="getPicturesDirectory" size="large">
          系统图片目录
        </el-button>
      </div>
    </el-card>

    <!-- 选择的图片列表 -->
    <el-card v-if="selectedImages.length" class="selected-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>已选择的图片 ({{ selectedImages.length }} 张)</span>
          <el-tag type="info" size="small">{{ formatTotalSize() }}</el-tag>
        </div>
      </template>

      <div class="selected-images-container">
        <el-scrollbar max-height="300px">
          <div class="selected-images-list">
            <div
              v-for="(image, index) in selectedImages"
              :key="image.path"
              class="selected-image-item"
            >
              <div class="image-info">
                <el-tag type="primary" size="small" class="image-index">
                  {{ index + 1 }}
                </el-tag>
                <div class="image-details">
                  <div class="image-name">{{ image.name }}</div>
                  <div class="image-meta">
                    <el-tag size="small">{{ formatFileSize(image.size) }}</el-tag>
                    <el-tag v-if="image.error" type="danger" size="small">
                      错误: {{ image.error }}
                    </el-tag>
                  </div>
                </div>
              </div>
              <el-button
                type="danger"
                :icon="Close"
                @click="removeImage(index)"
                size="small"
                circle
              />
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-card>

    <!-- 图片预览网格 -->
    <el-card v-if="loadedImages.length" class="preview-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>图片预览 ({{ loadedImages.length }} 张)</span>
          <div class="header-actions">
            <el-button type="text" :icon="FullScreen" @click="showGallery = true" size="small">
              画廊模式
            </el-button>
          </div>
        </div>
      </template>

      <div class="image-preview-grid">
        <div
          v-for="(image, index) in loadedImages"
          :key="image.path"
          class="image-preview-item"
          @click="showImageDetail(image, index)"
        >
          <div v-if="image.error" class="image-error">
            <el-icon class="error-icon" size="48">
              <WarningFilled />
            </el-icon>
            <div class="error-message">{{ image.error }}</div>
          </div>
          <div v-else class="image-container">
            <el-image
              :src="`data:${image.mimeType};base64,${image.data}`"
              :alt="image.name"
              class="preview-image"
              fit="cover"
              :preview-src-list="[`data:${image.mimeType};base64,${image.data}`]"
              :initial-index="index"
              loading="lazy"
            >
              <template #error>
                <div class="image-error">
                  <el-icon size="32">
                    <Picture />
                  </el-icon>
                  <div>加载失败</div>
                </div>
              </template>
            </el-image>
            <div class="image-overlay">
              <div class="image-name">{{ image.name }}</div>
              <div class="image-details">
                <el-tag size="small" type="info">{{ formatFileSize(image.size) }}</el-tag>
                <el-tag size="small" type="success">{{ getImageFormat(image.mimeType) }}</el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 系统图片目录 -->
    <el-card v-if="picturesDirectory" class="directory-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>系统图片目录</span>
          <el-button
            type="text"
            :icon="Refresh"
            @click="listPictures"
            size="small"
            :disabled="!picturesDirectory"
          >
            刷新
          </el-button>
        </div>
      </template>

      <div class="directory-info">
        <el-input v-model="picturesDirectory" readonly class="directory-path">
          <template #prepend>
            <el-icon><Folder /></el-icon>
          </template>
        </el-input>

        <div v-if="pictures.length" class="directory-images">
          <div class="directory-header">
            <span>找到 {{ pictures.length }} 张图片</span>
            <el-button
              type="primary"
              size="small"
              @click="loadDirectoryImages"
              :disabled="!pictures.length"
            >
              加载目录图片
            </el-button>
          </div>

          <div class="directory-image-list">
            <div
              v-for="picture in pictures.slice(0, 10)"
              :key="picture.path"
              class="directory-image-item"
              @click="loadDirectoryImage(picture.path)"
            >
              <el-icon class="file-icon">
                <Picture />
              </el-icon>
              <div class="file-info">
                <div class="file-name">{{ picture.name }}</div>
                <div class="file-size">{{ formatFileSize(picture.size) }}</div>
              </div>
            </div>
          </div>

          <div v-if="pictures.length > 10" class="more-files">
            <el-text type="info">还有 {{ pictures.length - 10 }} 张图片...</el-text>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 图片详情对话框 -->
    <el-dialog
      v-model="showDetailModal"
      :title="detailImage?.name"
      width="80%"
      center
      destroy-on-close
    >
      <div v-if="detailImage && !detailImage.error" class="detail-content">
        <div class="detail-image-container">
          <el-image
            :src="`data:${detailImage.mimeType};base64,${detailImage.data}`"
            :alt="detailImage.name"
            class="detail-image"
            fit="contain"
          />
        </div>

        <el-descriptions :column="2" border class="detail-info">
          <el-descriptions-item label="文件名">
            {{ detailImage.name }}
          </el-descriptions-item>
          <el-descriptions-item label="文件大小">
            {{ formatFileSize(detailImage.size) }}
          </el-descriptions-item>
          <el-descriptions-item label="文件类型">
            {{ detailImage.mimeType }}
          </el-descriptions-item>
          <el-descriptions-item label="文件路径" :span="2">
            <el-text class="file-path">{{ detailImage.path }}</el-text>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <template #footer>
        <el-button @click="showDetailModal = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 错误提示 -->
    <el-alert
      v-if="error"
      :title="error"
      type="error"
      show-icon
      closable
      @close="clearError"
      class="error-alert"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  FolderOpened,
  View,
  Delete,
  Folder,
  Close,
  FullScreen,
  WarningFilled,
  Picture,
  Refresh
} from '@element-plus/icons-vue'
import { ElMessage, ElNotification } from 'element-plus'
import { getService, SERVICE_NAMES, ServiceError } from '@/utils/electronService'

// 响应式数据
const selectedImages = ref([])
const loadedImages = ref([])
const picturesDirectory = ref('')
const pictures = ref([])
const error = ref('')
const loading = ref(false)
const loadingImages = ref(false)
const showDetailModal = ref(false)
const detailImage = ref(null)
const showGallery = ref(false)

// 获取服务实例
const imageService = getService(SERVICE_NAMES.IMAGE)

// 图片选择方法
async function selectImages() {
  try {
    loading.value = true
    error.value = ''

    const result = await imageService.showImageSelectDialog({
      title: '选择图片文件',
      properties: ['openFile', 'multiSelections']
    })

    if (!result.canceled && result.filePaths.length > 0) {
      // 获取选择的图片信息
      const imageInfos = await imageService.getMultipleImageInfo(result.filePaths)
      selectedImages.value = imageInfos

      // 清空之前的预览
      loadedImages.value = []

      ElNotification({
        title: '选择成功',
        message: `已选择 ${imageInfos.length} 张图片`,
        type: 'success'
      })
    }
  } catch (err) {
    handleError(err)
  } finally {
    loading.value = false
  }
}

async function loadSelectedImages() {
  try {
    loadingImages.value = true
    error.value = ''

    if (selectedImages.value.length === 0) {
      return
    }

    // 只加载没有错误的图片路径
    const validPaths = selectedImages.value.filter((img) => !img.error).map((img) => img.path)

    if (validPaths.length === 0) {
      throw new Error('没有有效的图片可以加载')
    }

    // 批量读取图片数据（限制最多10张以避免内存问题）
    const imageData = await imageService.readMultipleImages(validPaths, 10)
    loadedImages.value = imageData

    ElMessage.success(`成功加载 ${imageData.filter((img) => !img.error).length} 张图片`)
  } catch (err) {
    handleError(err)
  } finally {
    loadingImages.value = false
  }
}

function clearSelection() {
  selectedImages.value = []
  loadedImages.value = []
  error.value = ''
  ElMessage.info('已清空选择')
}

function removeImage(index) {
  const removedImage = selectedImages.value[index]
  selectedImages.value.splice(index, 1)

  // 如果删除的图片已经加载，也从预览中移除
  if (index < loadedImages.value.length) {
    loadedImages.value.splice(index, 1)
  }

  ElMessage.info(`已移除 ${removedImage.name}`)
}

// 系统图片目录方法
async function getPicturesDirectory() {
  try {
    error.value = ''
    const dir = await imageService.getPicturesDirectory()
    picturesDirectory.value = dir
    ElMessage.success('获取图片目录成功')
  } catch (err) {
    handleError(err)
  }
}

async function listPictures() {
  try {
    error.value = ''
    const pictureList = await imageService.listPictures()
    pictures.value = pictureList.filter((item) => item.isImage).slice(0, 50) // 限制显示前50张
    ElMessage.success(`找到 ${pictures.value.length} 张图片`)
  } catch (err) {
    handleError(err)
  }
}

async function loadDirectoryImage(imagePath) {
  try {
    error.value = ''
    const imageData = await imageService.readImage(imagePath)
    showImageDetail(imageData)
  } catch (err) {
    handleError(err)
  }
}

async function loadDirectoryImages() {
  try {
    const paths = pictures.value.slice(0, 10).map((p) => p.path)
    const imageInfos = await imageService.getMultipleImageInfo(paths)
    selectedImages.value = imageInfos

    // 自动加载预览
    await loadSelectedImages()

    ElMessage.success('已加载目录图片')
  } catch (err) {
    handleError(err)
  }
}

// 模态框方法
function showImageDetail(image, index = 0) {
  detailImage.value = image
  showDetailModal.value = true
}

// 工具函数
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatTotalSize() {
  const totalSize = selectedImages.value.reduce((sum, img) => sum + (img.size || 0), 0)
  return formatFileSize(totalSize)
}

function getImageFormat(mimeType) {
  return mimeType.split('/')[1]?.toUpperCase() || 'Unknown'
}

function clearError() {
  error.value = ''
}

function handleError(err) {
  console.error('Service error:', err)
  if (err instanceof ServiceError) {
    error.value = `${err.serviceName}.${err.methodName}: ${err.originalError.message}`
  } else {
    error.value = err.message || '未知错误'
  }

  ElNotification({
    title: '操作失败',
    message: error.value,
    type: 'error'
  })
}
</script>

<style scoped>
.image-manager {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operation-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.selected-images-container {
  margin-top: 16px;
}

.selected-images-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selected-image-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s;
}

.selected-image-item:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.image-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.image-index {
  min-width: 32px;
  text-align: center;
}

.image-details {
  flex: 1;
}

.image-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  word-break: break-all;
}

.image-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}

.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 16px;
}

.image-preview-item {
  position: relative;
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-preview-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  height: 220px;
}

.preview-image {
  width: 100%;
  height: 100%;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 16px 12px 12px;
}

.image-overlay .image-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-overlay .image-details {
  display: flex;
  gap: 8px;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
  background: #f8f9fa;
  color: #6c757d;
}

.error-icon {
  margin-bottom: 8px;
  color: #f56c6c;
}

.error-message {
  font-size: 12px;
  text-align: center;
  padding: 0 10px;
}

.directory-info {
  margin-top: 16px;
}

.directory-path {
  margin-bottom: 16px;
}

.directory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.directory-image-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.directory-image-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.directory-image-item:hover {
  background: #f0f9ff;
  border-color: #409eff;
  transform: translateY(-1px);
}

.file-icon {
  font-size: 24px;
  color: #409eff;
}

.file-info {
  flex: 1;
}

.file-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  word-break: break-all;
}

.file-size {
  color: #666;
  font-size: 12px;
}

.more-files {
  text-align: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-image-container {
  text-align: center;
}

.detail-image {
  max-width: 100%;
  max-height: 60vh;
  border-radius: 8px;
}

.file-path {
  word-break: break-all;
  font-family: monospace;
  font-size: 12px;
}

.error-alert {
  margin-top: 20px;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>

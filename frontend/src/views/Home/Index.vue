<template>
  <div class="home-container">
    <h1>图片管理器</h1>

    <!-- 图片选择功能 -->
    <div class="service-section">
      <h2>图片选择</h2>
      <div class="button-group">
        <button @click="selectImages" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="loading-spinner">⏳</span>
          {{ loading ? '加载中...' : '选择图片' }}
        </button>
        <button
          @click="clearSelection"
          class="btn btn-secondary"
          :disabled="!selectedImages.length"
        >
          清空选择
        </button>
        <button
          @click="loadSelectedImages"
          class="btn btn-accent"
          :disabled="!selectedImages.length || loading"
        >
          <span v-if="loadingImages" class="loading-spinner">⏳</span>
          {{ loadingImages ? '加载预览中...' : '加载预览' }}
        </button>
      </div>

      <!-- 选择的图片信息 -->
      <div v-if="selectedImages.length" class="result-box">
        <h3>已选择 {{ selectedImages.length }} 张图片:</h3>
        <div class="selected-images-list">
          <div
            v-for="(image, index) in selectedImages"
            :key="image.path"
            class="selected-image-item"
          >
            <div class="image-info">
              <span class="image-index">{{ index + 1 }}.</span>
              <span class="image-name">{{ image.name }}</span>
              <span class="image-size">{{ formatFileSize(image.size) }}</span>
              <span v-if="image.error" class="error-text">错误: {{ image.error }}</span>
            </div>
            <button @click="removeImage(index)" class="btn-remove">×</button>
          </div>
        </div>
      </div>

      <!-- 图片预览网格 -->
      <div v-if="loadedImages.length" class="result-box">
        <h3>图片预览 ({{ loadedImages.length }} 张):</h3>
        <div class="image-preview-grid">
          <div
            v-for="(image, index) in loadedImages"
            :key="image.path"
            class="image-preview-item"
            @click="showImageDetail(image)"
          >
            <div v-if="image.error" class="image-error">
              <div class="error-icon">❌</div>
              <div class="error-message">{{ image.error }}</div>
            </div>
            <div v-else class="image-container">
              <img
                :src="`data:${image.mimeType};base64,${image.data}`"
                :alt="image.name"
                class="preview-image"
                @load="onImageLoad"
                @error="onImageError"
              />
              <div class="image-overlay">
                <div class="image-name">{{ image.name }}</div>
                <div class="image-details">
                  <span>{{ formatFileSize(image.size) }}</span>
                  <span>{{ image.mimeType }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 系统图片目录浏览 -->
    <div class="service-section">
      <h2>系统图片目录</h2>
      <div class="button-group">
        <button @click="getPicturesDirectory" class="btn btn-primary">获取图片目录</button>
        <button @click="listPictures" class="btn btn-secondary" :disabled="!picturesDirectory">
          浏览目录图片
        </button>
      </div>

      <div v-if="picturesDirectory" class="result-box">
        <h3>图片目录: {{ picturesDirectory }}</h3>
      </div>

      <div v-if="pictures.length" class="result-box">
        <h3>目录中的图片 ({{ pictures.length }} 张):</h3>
        <div class="directory-image-grid">
          <div
            v-for="picture in pictures"
            :key="picture.path"
            class="directory-image-item"
            @click="loadDirectoryImage(picture.path)"
          >
            <div class="directory-image-info">
              <span class="image-name">{{ picture.name }}</span>
              <span class="image-size">{{ formatFileSize(picture.size) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片详情模态框 -->
    <div v-if="showDetailModal" class="modal-overlay" @click="closeDetailModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ detailImage?.name }}</h3>
          <button @click="closeDetailModal" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <img
            v-if="detailImage && !detailImage.error"
            :src="`data:${detailImage.mimeType};base64,${detailImage.data}`"
            :alt="detailImage.name"
            class="detail-image"
          />
          <div v-if="detailImage" class="detail-info">
            <p><strong>文件名:</strong> {{ detailImage.name }}</p>
            <p><strong>路径:</strong> {{ detailImage.path }}</p>
            <p><strong>大小:</strong> {{ formatFileSize(detailImage.size) }}</p>
            <p><strong>类型:</strong> {{ detailImage.mimeType }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误显示 -->
    <div v-if="error" class="error-box">
      <h3>错误:</h3>
      <p>{{ error }}</p>
      <button @click="clearError" class="btn btn-sm">清除错误</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
}

function removeImage(index) {
  selectedImages.value.splice(index, 1)
  // 如果删除的图片已经加载，也从预览中移除
  if (index < loadedImages.value.length) {
    loadedImages.value.splice(index, 1)
  }
}

// 系统图片目录方法
async function getPicturesDirectory() {
  try {
    error.value = ''
    const dir = await imageService.getPicturesDirectory()
    picturesDirectory.value = dir
  } catch (err) {
    handleError(err)
  }
}

async function listPictures() {
  try {
    error.value = ''
    const pictureList = await imageService.listPictures()
    pictures.value = pictureList.filter((item) => item.isImage).slice(0, 20) // 限制显示前20张
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

// 模态框方法
function showImageDetail(image) {
  detailImage.value = image
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  detailImage.value = null
}

// 图片加载事件
function onImageLoad(event) {
  console.log('图片加载成功:', event.target.src.substring(0, 50) + '...')
}

function onImageError(event) {
  console.error('图片加载失败:', event.target.alt)
}

// 错误处理
function clearError() {
  error.value = ''
}

// 工具函数
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function handleError(err) {
  console.error('Service error:', err)
  if (err instanceof ServiceError) {
    error.value = `${err.serviceName}.${err.methodName}: ${err.originalError.message}`
  } else {
    error.value = err.message || '未知错误'
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.service-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-accent {
  background-color: #28a745;
  color: white;
}

.btn-accent:hover {
  background-color: #1e7e34;
}

.result-box {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.result-box h3 {
  margin-top: 0;
  color: #333;
}

.result-box pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

/* 加载状态 */
.loading-spinner {
  display: inline-block;
  margin-right: 8px;
}

/* 选择的图片列表 */
.selected-images-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.selected-image-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  transition: background-color 0.2s;
}

.selected-image-item:hover {
  background: #e9ecef;
}

.image-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.image-index {
  font-weight: bold;
  color: #007bff;
  min-width: 24px;
}

.image-name {
  font-weight: 500;
  color: #333;
  flex: 1;
  word-break: break-all;
}

.image-size {
  color: #666;
  font-size: 12px;
  white-space: nowrap;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
}

.btn-remove {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.btn-remove:hover {
  background: #c82333;
}

/* 图片预览网格 */
.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.image-preview-item {
  position: relative;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.image-preview-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.image-preview-item:hover .preview-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 15px 10px 10px;
}

.image-overlay .image-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-details {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  opacity: 0.9;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: #f8f9fa;
  color: #6c757d;
}

.error-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.error-message {
  font-size: 12px;
  text-align: center;
  padding: 0 10px;
}

/* 系统目录图片网格 */
.directory-image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.directory-image-item {
  padding: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.directory-image-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.directory-image-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.error-box {
  margin-top: 20px;
  padding: 15px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
}

.error-box h3 {
  margin-top: 0;
  color: #721c24;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
  margin-top: 8px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background: #e9ecef;
}

.modal-body {
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-image {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 20px;
}

.detail-info {
  width: 100%;
  max-width: 500px;
}

.detail-info p {
  margin: 8px 0;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  word-break: break-all;
}

.detail-info strong {
  color: #333;
  margin-right: 8px;
}
</style>

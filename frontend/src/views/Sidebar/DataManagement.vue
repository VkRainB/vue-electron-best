<template>
  <div class="data-management-container">
    <!-- 页面标题 -->
    <div class="page-header mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        数据管理
      </h1>
      <p class="text-gray-600">
        管理和查看系统中的各类数据
      </p>
    </div>

    <!-- 操作工具栏 -->
    <div class="toolbar bg-white p-4 rounded-xl shadow-lg mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <el-input v-model="searchQuery" placeholder="搜索数据..." class="w-64" clearable>
            <template #prefix>
              <el-icon>
                <Icon name="el-icon-Search" size="1em" />
              </el-icon>
            </template>
          </el-input>

          <el-select v-model="selectedCategory" placeholder="选择分类" class="w-32">
            <el-option label="全部" value="all" />
            <el-option label="用户数据" value="users" />
            <el-option label="订单数据" value="orders" />
            <el-option label="产品数据" value="products" />
          </el-select>
        </div>

        <div class="flex items-center gap-2">
          <el-button type="primary" @click="handleAdd">
            <el-icon>
              <Icon name="el-icon-Plus" size="1em" class="mr-1" />
            </el-icon>
            添加数据
          </el-button>

          <el-button type="success" @click="handleExport">
            <el-icon>
              <Icon name="el-icon-Download" size="1em" class="mr-1" />
            </el-icon>
            导出
          </el-button>

          <el-button type="warning" @click="handleRefresh">
            <el-icon>
              <Icon name="el-icon-Refresh" size="1em" class="mr-1" />
            </el-icon>
            刷新
          </el-button>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-container bg-white rounded-xl shadow-lg">
      <el-table
        :data="tableData"
        style="width: 100%"
        :loading="loading"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column prop="id" label="ID" width="80" />

        <el-table-column prop="name" label="名称" min-width="120">
          <template #default="{ row }">
            <div class="flex items-center gap-2">
              <el-avatar :size="32" :src="row.avatar" />
              <span class="font-medium">{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="category" label="分类" width="100">
          <template #default="{ row }">
            <el-tag :type="getCategoryType(row.category)">
              {{ row.category }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" width="160" />

        <el-table-column prop="updateTime" label="更新时间" width="160" />

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleView(row)">
              查看
            </el-button>
            <el-button type="warning" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container p-4 flex justify-between items-center">
        <div class="text-gray-600 text-sm">
          共 {{ total }} 条数据，已选择 {{ selectedRows.length }} 条
        </div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';

// 响应式数据
const searchQuery = ref('');
const selectedCategory = ref('all');
const loading = ref(false);
const tableData = ref([]);
const selectedRows = ref([]);
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '张三',
    category: '用户数据',
    status: '活跃',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-01-20 14:20:00',
  },
  {
    id: 2,
    name: '李四',
    category: '订单数据',
    status: '正常',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2024-01-16 09:15:00',
    updateTime: '2024-01-21 16:45:00',
  },
  {
    id: 3,
    name: '王五',
    category: '产品数据',
    status: '待审核',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    createTime: '2024-01-17 11:20:00',
    updateTime: '2024-01-22 13:10:00',
  },
];

// 获取分类标签类型
function getCategoryType(category) {
  const typeMap = {
    用户数据: 'primary',
    订单数据: 'success',
    产品数据: 'warning',
  };
  return typeMap[category] || 'info';
}

// 获取状态标签类型
function getStatusType(status) {
  const typeMap = {
    活跃: 'success',
    正常: 'primary',
    待审核: 'warning',
    已禁用: 'danger',
  };
  return typeMap[status] || 'info';
}

// 处理选择变化
function handleSelectionChange(selection) {
  selectedRows.value = selection;
}

// 处理添加
function handleAdd() {
  ElMessage.success('添加数据功能开发中...');
}

// 处理导出
function handleExport() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要导出的数据');
    return;
  }
  ElMessage.success(`正在导出 ${selectedRows.value.length} 条数据...`);
}

// 处理刷新
function handleRefresh() {
  loading.value = true;
  setTimeout(() => {
    loadData();
    loading.value = false;
    ElMessage.success('数据已刷新');
  }, 1000);
}

// 处理查看
function handleView(row) {
  ElMessage.info(`查看数据：${row.name}`);
}

// 处理编辑
function handleEdit(row) {
  ElMessage.info(`编辑数据：${row.name}`);
}

// 处理删除
function handleDelete(row) {
  ElMessageBox.confirm(`确定要删除数据"${row.name}"吗？`, '确认删除', {
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

// 处理页面大小变化
function handleSizeChange(size) {
  pageSize.value = size;
  loadData();
}

// 处理当前页变化
function handleCurrentChange(page) {
  currentPage.value = page;
  loadData();
}

// 加载数据
function loadData() {
  // 模拟API调用
  tableData.value = mockData;
  total.value = mockData.length;
}

// 组件挂载时加载数据
onMounted(() => {
  loadData();
});
</script>

<style scoped></style>

<script setup>
import { ref, watch } from 'vue'
import { travelGetSightsService, travelGetToursService } from '@/api/travel'
import { useRoute, useRouter } from 'vue-router'
import { Comment, CirclePlus } from '@element-plus/icons-vue'
import DetailPage from './components/DetailPage.vue'
import { orderPutService } from '@/api/order'
import { useUserStore } from '@/stores'
const isLoading = ref(true)
const travelList = ref([])
const params = ref({
  pagenum: 1,
  pagesize: 2
})
const total = ref(0)

const getList = async () => {
  isLoading.value = true
  const res =
    type.value === 'sights'
      ? await travelGetSightsService(params)
      : await travelGetToursService(params)

  travelList.value = res.data.data
  total.value = res.data.data.length
}
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getList()
}

const detail = ref()
const checkDetail = (row) => {
  detail.value.open(row)
}
const handleAdd = () => {
  detail.value.open({})
}
const userStore = useUserStore()
const router = useRouter()
const addOrder = async (row, $index) => {
  await orderPutService(userStore.userId, $index, row.name)
  ElMessage.success('订单添加成功')
  router.push('/order')
}

const route = useRoute()
const type = ref()
watch(
  () => route,
  () => {
    type.value = route.name
    getList()
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <page-container :title="type === 'sights' ? '景点管理' : '旅游团管理'">
    <template #extra>
      <el-button type="primary" @click="handleAdd">
        添加{{ type === 'sights' ? '景点' : '旅游团' }}
      </el-button>
    </template>
    <el-table v-loading="isLoading" :data="travelList" style="width: 100%">
      <el-table-column
        prop="image"
        fixed
        width="240"
        :label="type === 'sights' ? '景点图片' : '旅游团图片'"
      >
        <template #default="{ row }">
          <el-image
            @load="isLoading = false"
            style="width: 200px; height: 200px"
            :src="row.image"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column sortable prop="exclusiveID" label="编号" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column
        prop="description"
        :label="type === 'sights' ? '景点描述' : '旅游团描述'"
      />
      <el-table-column align="center" label="查看评论" width="140">
        <template #default="{ row, $index }">
          <el-button link type="primary" @click="checkDetail(row, $index)">
            <el-icon size="32"><Comment /></el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        v-if="type === 'tours'"
        label="订购跟团"
        width="140"
        align="center"
      >
        <template #default="{ row, $index }">
          <el-button link type="primary" @click="addOrder(row, $index)">
            <el-icon size="32"><CirclePlus /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5]"
      layout="total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <detail-page ref="detail">
      <template #header>{{
        type === 'sights' ? '添加景点' : '添加旅游团'
      }}</template>
    </detail-page>
  </page-container>
</template>

<style lang="less" scoped></style>

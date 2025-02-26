<script setup>
import { orderDelService, orderGetListService } from '@/api/order'
import { useUserStore } from '@/stores'
import { ref, onMounted, computed } from 'vue'
import { Delete } from '@element-plus/icons-vue'
const orderList = ref([])
const userStore = useUserStore()
const params = ref({
  page: 1,
  size: 2,
  uid: userStore.userInfo.uid
})
const total = computed(() => {
  return orderList.value.length
})
const getList = async () => {
  const res = await orderGetListService(params.value)
  orderList.value = res.data.data
}
const onSizeChange = (size) => {
  params.value.page = 1
  params.value.size = size
  getList()
}
const onCurrentChange = (page) => {
  params.value.page = page
  getList()
}
const delOrder = async (row, $index) => {
  await ElMessageBox.confirm('你确认删除吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await orderDelService(row.orderID, params.value.uid)
  //模拟删除
  orderList.value = orderList.value.filter((item, index) => index != $index)
  // getList()
  ElMessage.success('删除成功')
}
onMounted(() => {
  getList()
})
</script>
<template>
  <page-container title="订单管理">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column type="expand" label="查看详情" width="120">
        <template #default="props">
          <el-descriptions border :column="4">
            <el-descriptions-item
              :rowspan="2"
              :width="100"
              label="Photo"
              align="center"
            >
              <el-image
                style="width: 200px; height: 200px"
                :src="props.row.image"
              />
            </el-descriptions-item>

            <el-descriptions-item width="140px" align="center" label="编号">
              {{ props.row.exclusiveID }}
            </el-descriptions-item>
            <el-descriptions-item width="140px" align="center" label="名称">
              {{ props.row.name }}
            </el-descriptions-item>
            <el-descriptions-item
              width="140px"
              align="center"
              label="订购团人数"
            >
              {{ props.row.number }}
            </el-descriptions-item>
            <el-descriptions-item align="center" label="描述">
              {{ props.row.description }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单ID" prop="orderID" />
      <el-table-column align="center" label="订单创建时间" prop="time" />
      <el-table-column
        align="center"
        fixed="right"
        label="删除订单"
        width="120"
      >
        <template #default="{ row, $index }">
          <el-button
            type="danger"
            :icon="Delete"
            @click="delOrder(row, $index)"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.page"
      v-model:page-size="params.size"
      :page-sizes="[2, 3, 4, 5]"
      layout="total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>
<style lang="less"></style>

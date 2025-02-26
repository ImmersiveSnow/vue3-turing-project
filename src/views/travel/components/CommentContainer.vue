<script setup>
import {
  travelGetCommentService,
  travelUploadCommentService
} from '@/api/travel'
import { useUserStore } from '@/stores'
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  detail: {
    required: true,
    type: Object
  }
})
const userStore = useUserStore()
const Id = computed(() => {
  return parseInt(props.detail.exclusiveID)
})
const comment = ref({
  userId: userStore.userId,
  content: '',
  Id: Id
})
const commentList = ref([])
const getCommentList = async () => {
  const res = await travelGetCommentService(Id)
  commentList.value = res.data.data
}
const handlePublish = async () => {
  await travelUploadCommentService(comment.value)
  ElMessage.success('发表成功')
  //模拟发表
  commentList.value.unshift({
    uid: comment.value.userId,
    content: comment.value.content
  })
  // getCommentList()
  comment.value.content = ''
}
onMounted(() => {
  getCommentList()
})
</script>
<template>
  <el-descriptions size="large" :column="2" border>
    <el-descriptions-item label="编号">{{
      detail.exclusiveID
    }}</el-descriptions-item>
    <el-descriptions-item label="名称">{{ detail.name }}</el-descriptions-item>
    <el-descriptions-item width="250" label="Photo" align="center" :rowspan="1">
      <el-image style="width: 300px; height: 300px" :src="detail.image">
      </el-image>
    </el-descriptions-item>
    <el-descriptions-item label="描述">
      {{ detail.description }}
    </el-descriptions-item>
  </el-descriptions>
  <div class="comment_container">
    <div class="publish_section">
      <div class="input_container">
        <el-input
          class="inputBox"
          v-model="comment.content"
          clearable
          maxlength="200"
          style="width: 100%"
          placeholder="请输入"
          show-word-limit
          type="textarea"
        />
      </div>
      <div class="text_container">
        <el-text>快来发表你的评论吧~</el-text>
        <el-button @click="handlePublish" type="primary" size="large"
          >发布</el-button
        >
      </div>
    </div>

    <div class="comment_list">
      <div class="commentBox" v-for="comment in commentList" :key="comment.uid">
        <div class="comment_header">用户#{{ comment.uid }}</div>
        <div class="comment_content">
          {{ comment.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.comment_container {
  display: flex;
  flex-direction: column;
  padding: 0 250px;
  overflow: hidden;
  .publish_section {
    margin-top: 60px;
    .input_container {
      width: 100%;
      display: flex;
    }
    .text_container {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      padding: 6px;

      .el-button {
        height: 40px;
        width: 80px;
      }
    }
  }

  .comment_list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-top: 40px;
    .commentBox {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      row-gap: 8px;
      padding-bottom: 40px;
      border-bottom: 1px dotted #ccc;
      .comment_header {
        color: #7f7f7f;
      }
      .comment_content {
        width: 100%;
        color: black;
        text-align: left;
      }
    }
  }
}
</style>

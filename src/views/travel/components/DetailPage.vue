<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {
  travelUploadSightsService,
  travelUploadToursService
} from '@/api/travel'
import { useRoute } from 'vue-router'
import CommentContainer from './CommentContainer.vue'
const dialogVisible = ref(false)
const isAdd = ref(false)
const detail = ref({})
const defaultForm = {
  name: '',
  description: '',
  img: ''
}
const formModel = ref({
  ...defaultForm
})
const formRef = ref()
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.img = uploadFile.raw
}

const route = useRoute()
const onSubmit = async () => {
  await formRef.value.validate()
  route.name === 'sights'
    ? await travelUploadSightsService(formModel.value)
    : await travelUploadToursService(formModel.value)

  ElMessage.success('提交成功')
  dialogVisible.value = false
}

const rules = {
  name: { required: true, message: '请输入名称', trigger: 'blur' },
  description: { required: true, message: '请填写活动形式', trigger: 'blur' },
  img: { required: true, message: '请上传图片', trigger: 'blur' }
}
const open = (row) => {
  if (row.exclusiveID) {
    isAdd.value = false
    detail.value = row
  } else {
    isAdd.value = true
  }
  dialogVisible.value = true
  formModel.value = { ...defaultForm }
  imgUrl.value = ''
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    :fullscreen="!isAdd"
    v-model="dialogVisible"
    width="800"
    align-center
  >
    <template #header>
      <span v-if="!isAdd"
        >{{ route.name === 'sights' ? '景点' : '旅游团' }}详情</span
      >
      <slot v-else name="header"></slot>
    </template>
    <comment-container
      v-if="!isAdd"
      :detail="{ ...detail }"
    ></comment-container>
    <el-form
      v-else
      :model="formModel"
      :rules="rules"
      label-width="120px"
      label-position="right"
      class="demo-ruleForm"
      ref="formRef"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="formModel.name"
          :clearable="true"
          label-width="100%"
          maxlength="80"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="img" class="upload" label="图片">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formModel.description" type="textarea" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span v-if="isAdd" class="dialog-footerData">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button auto-insert-space type="primary" @click="onSubmit"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<style lang="less">
.image-slot {
  width: 100%;
  height: 100%;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

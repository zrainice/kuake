<template>
  <div class="hr-uploadImg">
    <!-- 图片墙样式 -->
    <div class="hr-uploadImg--picture-card" v-if="listType === 'pictureCard'">
      <!-- 图片列表hr-uploadImg-list -->
      <ul class="hr-uploadImg-list--picture-card" v-if="showFileList">
        <!-- 图片 -->
        <li class="hr-uploadImg-list__item"
          v-for="(option, index) in fileList"
          :key="index">
          <img :src="option.path"/>
          <x-icon class="hr-uploadImg-list__item-close"
            type="ios-close"
            size="25"
            @click.stop="removeImg(option)"></x-icon>
        </li>
      </ul>
      <!-- 新增图片按钮框 -->
      <div :class="{'hr-uploadImg--upload-btn': showFileList}" @click="uploadImg">
        <slot></slot>
        <x-icon type="ios-plus-empty" size="30" v-if="showFileList"></x-icon>
        <input
          :id="inputFileIden"
          type="file"
          accept="image/*"
          name="uploadImg"
          class="hr-uploadImg__input"
          @change="uploadImgCallBack">
      </div>
    </div>
  </div>
</template>

<script>
import _uploadImg from './index.js'
export default {
  props: {
    'listType': {
      type: String,
      default() {
        return 'pictureCard' // 默认为照片墙展现
      }
    },
    'uploadUrl': { // 上传文件路径
      type: String,
      default() {
        return ''
      }
    },
    'uploadFileList': { // 上传文件数组
      type: Array,
      default() {
        return []
      }
    },
    'showFileList': { // 是否显示上传文件列表
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      fileList: [],
      envType: 'web', // 当前环境
      inputFileIden: ''
    }
  },
  watch: {
    'uploadFileList': { // 同步初始化值
      immediate: true,
      handler(fileList) {
        this.fileList = fileList.map(item => {
          item.uid = item.uid ? item.uid : this._uploadImg_getOnlyKey('image')
          return item
        })
      }
    }
  },
  created() {
    // 初始化元素
    this.inputFileIden = this._uploadImg_getOnlyKey('inputFile')
  },
  methods: {
    uploadImg() {
      document.getElementById(this.inputFileIden).value = null
      document.getElementById(this.inputFileIden).click()
    },
    /**
     * [uploadImgCallBack 上传照片后回调]
     */
    uploadImgCallBack() {
      this._uploadImg_dispatchByWeb()
    },
    removeImg(option) {
      // 获取当前文件对象
      if (this.fileList) {
        let delIndex = -1
        this.fileList.forEach((item, index) => {
          if (item.uid === option.uid) {
            delIndex = index
          }
        })
        if (delIndex !== -1) {
          this.fileList.splice(delIndex, 1)
        }
      }
      console.log('removeImg', option, this.fileList)
      this.$emit('removeCb', option, this.fileList)
    }
  },
  mixins: [_uploadImg]
}
</script>

<style scoped>
  .hr-uploadImg-list--picture-card {
    list-style: none;
  }
  .hr-uploadImg--picture-card::after {
    clear: both;
    content: '';
    display: block;
  }
  .hr-uploadImg-list__item {
    position: relative;
    float: left;
    border: 1px solid #ccc;
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 0.1rem;
  }
  /* picture-card 上传按钮样式 */
  .hr-uploadImg--upload-btn {
    float: left;
    border: 1px dashed #CCC;
    box-sizing: border-box;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    line-height: 2.2rem;
    border-radius: 0.1rem;
    text-align: center;
  }
  .hr-uploadImg__input {
    display: none;
  }
  /* 图片列表 */
  .hr-uploadImg-list__item img {
    width: 2rem;
    height: 2rem;
    border-radius: 0.1rem;
  }
  /* 删除图标 */
  .hr-uploadImg-list__item-close {
    position: absolute;
    fill: red;
    top: -0.2rem;
    right: -0.2rem;
    cursor: pointer;
    z-index: 2;
  }
</style>

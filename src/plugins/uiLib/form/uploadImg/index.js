const _uploadImg = {
  methods: {
    /**
     * [getOnlyKey 生成唯一字符串]
     * @param  {[String]} symbol [用来生产唯一字符串的头部]
     * @return {[String]}        [生成的随字符串]
     */
    _uploadImg_getOnlyKey(symbol) {
      if (!symbol) {
        symbol = 'key'
      }
      return `${symbol}_${new Date().getTime()}_${parseInt(Math.random() * 1000)}`
    },
    /**
     * [_uploadImg_uploadByWeb 通过web环境上传图片]
     */
    _uploadImg_dispatchByWeb() {
      let formData = new window.FormData()
      let inputFile = document.getElementById(this.inputFileIden).files[0]
      formData.append('file', inputFile)
      window.$hrHttp.post(this.uploadUrl, formData).then((response) => { // 上传单张图片
        this._uploadImg_uploadCallBack(response, inputFile)
      })
    },
    /**
     * [_uploadImg_uploadByApp 通过app环境上传图片]
     */
    _uploadImg_dispatchByApp() {},
    /**
     * [_uploadImg_uploadCallBack 上传后回调]
     * successCb: 回调成功事件 请求返回的参数 / 文件对象 / 文件列表
     * errorCb: 回调成功事件 请求返回的参数 / 文件对象 / 文件列表
     */
    _uploadImg_uploadCallBack(response, file) {
      if (response && response.status === 200) { // 上传成功
        let model = {
          uid: this._uploadImg_getOnlyKey('image'),
          name: file.name,
          path: ''
        }
        try {
          model.path = this._uploadImg_getObjectURL(file)
        } catch (error) {
          console.error('hrUploadImgError', error)
          return
        }
        this.fileList.push(model) // 填充到当前图片中
        this.$emit('successCb', response, file, this.fileList)
      } else {
        this.$emit('errorCb', response, file, this.fileList)
      }
      this.$emit('changeCb', file, this.fileList)
    },
    /**
     * [_uploadImg_getObjectURL 从对象中获取文件路径]
     */
    _uploadImg_getObjectURL(file) {
      let url = null
      if(window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file);
      } else if(window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if(window.webkitURL !== undefined) { // web_kit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url
    }
  }
}

export default _uploadImg

module.exports = {
  isApp: false,
  init(vueInstance) {
    // 初始化全局组件
    this.vueInstance = vueInstance
    window.$g = this
  },
  alert(msg, content, btnContent = '确定', cb) {
    this.vueInstance.$vux.alert.show({
      title: msg,
      content: content,
      buttonText: btnContent,
      onShow() {
        console.log('test')
      },
      onHide() {
        console.log('close')
      }
    })
  },
  // type success warn cancel
  toast(msg, type) {
    if (type) {
      this.vueInstance.$vux.toast.show({
        text: msg,
        postion: 'middle',
        type: type
      })
    } else {
      this.vueInstance.$vux.toast.text(msg, 'middle')
    }
  },
  goBack(distance) {
    distance = distance || 1
    router.goBack(-distance)
  },
  // 处理axios异步请求回调数据
  // handleRes(res) {
  //   if (res.status == 200) {
  //     let data = res.data
  //     if (data.code == 200) {
  //       return data.data || true
  //     } else {
  //       if (data.error == '没有权限操作') {
  //         this.toast('登录过期, 请重新登录!', 'cancel')
  //         setTimeout(() => {
  //           $g.hideLoading()
  //           router.replace({
  //             name: 'login',
  //             query: {
  //               target: 'home'
  //             }
  //           })
  //         }, 500)
  //       } else {
  //         this.toast(data.error, 'cancel')
  //       }
  //       return false
  //     }
  //   } else {
  //     this.toast('网络错误', 'cancel')
  //     return false
  //   }
  // },
  dealPicPath(oss, path) {
    return `${oss}/${path}`
  },
  // 校验验证码与手机号是否匹配
  async checkVerifyCode(phone, code) {
    if (!(/^1[3|4|5|8|9][0-9]\d{8}$/.test(phone.trim()))) {
      this.toast('请输入正确的手机号码')
      return false
    }
    let ret = await axios.post('/api/user/verifyCode', { mobile: phone, code: code })
    // ret = $g.handleRes(ret)
    if (ret.status == 200) {
      // status为200则为验证码验证成功
      return true
    } else {
      $g.toast(ret.message)
      return false
    }
  },
  logout(fn) {
    localStorage.setItem('token', '')
    localStorage.setItem('userInfo', '')
    localStorage.setItem('userType', '')
    if (fn) {
      fn()
    } else {
      setTimeout(() => {
        router.push({ name: 'info' })
      }, 200)
    }
  },
  // 获取字典值
  async getDictionary(key) {
    let ret = await axios.get('/api/space/getDictList', { params: { code: key } })
    // ret = this.handleRes(ret)
    return ret
  },
  // 获取用户信息
  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'))
  },
  // 显示加载中
  showLoading(msg) {
    this.vueInstance.$vux.loading.show({ text: msg || '' })
  },
  // 隐藏加载
  hideLoading() {
    this.vueInstance.$vux.loading.hide()
  },
  // apicloud ajax方法上传
  apiUpload(path, successCb) {
    console.log('apiUpload path = ' + path)
    // var moment1 = moment(moment().unix())
    api.ajax({
      url: window.HOST + window.uploadApi,
      method: 'post',
      data: {
        files: {
          file: path
        }
      },
      headers: {
        'token': localStorage.getItem('token') + '%' + window.btoa(new Date().getTime())
      }
    }, function (ret, err) {
      if (ret) {
        successCb(ret)
      } else {
        console.log('error path = ' + path)
        console.log('upload error = ' + $g.j2s(err))
      }
    })
  },
  log(obj) {
    console.log(JSON.stringify(obj))
  },
  /**
   * 文件上传
   */
  upload(url, file, successCb) {
    var fd = new FormData()
    fd.append('file', file)
    var XHR = new XMLHttpRequest()
    if (XHR) {
      XHR.open("POST", url)
      XHR.setRequestHeader('token', this.getToken())
      XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
          var resultValue = XHR.responseText
          // 进行json序列化
          var ret = JSON.parse(resultValue)
          successCb(file, ret)
          XHR = null
        }
      }
      XHR.send(fd)
    }
  },
  getToken() {
    return $api.getStorage('token') + '%' + window.btoa(new Date().getTime())
  },
  parseHTMLDocument(str) {
    if (typeof str == 'string') {
      return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, "'")
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
    }
  },
  getSelectOptions(obj) {
    let list = []
    for (var key in obj) {
      list.push({ value: key, name: obj[key] })
    }
    return [list]
  },
  getMultiOptions(arr) {
    return arr.map(item => ({
      value: item,
      key: item
    }))
  }
}

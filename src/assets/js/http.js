export default {
  
  handleRes(res) {
    if (res.status == 200) {
      let data = res.data
      if (data.code == 200) {
        return data.data || true
      } else {
        this.toast(data.error, 'cancel')
        return false
      }
    } else {
      this.toast('网络错误', 'cancel')
      return false
    }
  }
}
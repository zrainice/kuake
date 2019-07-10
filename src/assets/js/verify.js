export default {
  isEmpty(val) {
    if (val.trim() == '') {
      return false
    } else {
      return true
    }
  },
  // 验证手机号码
  isPhone(val) {
    if (!(/^1[3|4|5|8|9][0-9]\d{8}$/.test(val.trim()))) {
      return false
    } else {
      return true
    }
  },
}
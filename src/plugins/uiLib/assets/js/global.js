const gFunction = {
  /**
   * [dealHttpError 处理API请求产生的范围内错误码]
   * @param {*} response
   */
  dealHttpError(response) {
    console.log('error', response.data ? response.data.error : '连接超时，请检查网络连接')
    if (response && response.data) {
      // 处理接口错误上的逻辑
    }
  }
}

export default gFunction

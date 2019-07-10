export default {
  state: {
    // 课程选集
    sectionInfo: [],
    // 当前章节
    currentSection: '',
    // 当前课程
    currentCourse: '',
    // 用户信息
    userInfo: null,
    isWriteNoteShow: false
  },
  mutations: {
    // 更新某个state 
    // payload: {key, value}
    update(state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    update({commit}, payload) {
      commit('update', payload)
    }
  }
}
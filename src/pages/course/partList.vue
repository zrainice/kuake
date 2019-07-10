// 精彩片段列表
<template>
  <hr-page>
    <hr-header slot="header"
      title="精彩片段"
      :leftOptions="{backText: ''}"></hr-header>
    <div slot="body"
      class="c-white fz-26">
      <div v-for="(item, index) in list"
        :key="index"
        class="bg-black m-b-15 player">
        <div>{{item.title}}</div>
        <div :id="`part-${index}`"
          class="player-container"></div>
        <!-- <video :src="item.url"></video> -->
        <div class="disp-flex justify-between"
          @click="goToDetail">
          <div>
            课程来源：{{item.source}}
          </div>
          <div>
            <span>喜欢</span>
            <span class="m-l-10">转发</span>
          </div>
        </div>
        <div v-if="!item.isPlaying"
          class="mask"></div>
      </div>
    </div>
  </hr-page>
</template>

<script>
import { hrPage, hrHeader } from '@/plugins/uiLib'
export default {
  components: {
    hrPage,
    hrHeader
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    let _temp = {
      title: '微信营销',
      id: 123,
      source: '微信营销法则',
      url:
        'http://video.weclasswe.ruizhutech.com/52527fb458f246baa9af221a8e0aa5ec/d983de5cd15d4df08f952b7e8d0947e9-a9013b727b15ceb93009311fca772d11-ld.mp4',
      playerHandler: null,
      isLoaded: false,
      isPlaying: false
    }
    for (var i = 0; i < 5; i++) {
      this.list.push(JSON.parse(JSON.stringify(_temp)))
    }
  },
  async created() {
    await this.getList()
  },
  mounted() {
    let initIndex = this.$route.query.index
    setTimeout(() => {
      // 滚动到指定的视频位置 待优化
      document.getElementById('vux_view_box_body').scrollTop = 330 * initIndex
      this.setContainerListener()
      this.checkShow()
    }, 500)
  },
  methods: {
    async getList() {
      let res = await axios.post('/api/course/wonderList')
      this.list = res.info.map(item => ({
        title: item.kkapp_highlights_name,
        id: item.kkapp_highlights_name,
        source: item.kkapp_highlights_name,
        url:
          'http://video.weclasswe.ruizhutech.com/1abf9a58f75f4bc6adf85270cebb9bcd/e1b85aaedcd14648839023adfbdf3784-36315b7e52849cb81a12c966c80d0730-ld.mp4',
        playerHandler: null,
        isLoaded: false,
        isPlaying: false,
        cover: item.kkapp_highlights_cover.deal_image
      }))
    },
    initPlayer(index) {
      let playerItem = this.list[index]
      if (!playerItem.isLoaded) {
        playerItem.playerHandler = new Aliplayer(
          {
            id: `part-${index}`,
            height: '300px',
            width: '100%',
            source: playerItem.url,
            cover: playerItem.cover,
            autoplay: false,
            useH5Prism: true,
            controlBarVisibility: 'hover',
            skinLayout: [
              {
                name: 'H5Loading',
                align: 'cc'
              },
              {
                name: 'infoDisplay'
              },
              {
                name: 'thumbnail'
              },
              {
                name: 'controlBar',
                align: 'blabs',
                x: 0,
                y: 0,
                children: [
                  {
                    name: 'progress',
                    align: 'blabs',
                    x: 0,
                    y: 15,
                    width: 100
                  },
                  {
                    name: 'playButton',
                    align: 'tl',
                    x: 15,
                    y: 12
                  },
                  {
                    name: 'timeDisplay',
                    align: 'tl',
                    x: 10,
                    y: 7
                  },
                  {
                    name: 'fullScreenButton',
                    align: 'tr',
                    x: 10,
                    y: 12
                  }
                ]
              }
            ]
          },
          player => {
            player.play()
            playerItem.isLoaded = true
            playerItem.isPlaying = true

            this.list.forEach((item, _index) => {
              if (_index != index) {
                if (item.playerHandler) {
                  item.playerHandler.pause()
                  item.isPlaying = false
                }
              }
            })
          }
        )
      } else {
        playerItem.playerHandler.play()
        playerItem.isPlaying = true
        this.list.forEach((item, _index) => {
          if (_index != index) {
            if (item.playerHandler) {
              item.playerHandler.pause()
              item.isPlaying = false
            }
          }
        })
      }
    },
    setContainerListener() {
      // 此处需要增加防抖处理
      document
        .getElementById('vux_view_box_body')
        .addEventListener('scroll', ev => {
          // 获取播放器容器 如果整个都显示在屏幕中，则进行初始化及播放
          this.checkShow()
        })
    },
    // 检查某个元素是否符合在当前窗口中显示
    checkShow() {
      // 获取容器高度
      let height = document.documentElement.clientHeight
      // 进行判断
      let contianerList = document.querySelectorAll('.player')
      contianerList.forEach((container, index) => {
        let _rect = container.getBoundingClientRect()
        // iphone 不支持getBoundingClientRect().y 要用.top代替
        if (_rect.top >= 0 && _rect.top + 338 <= height) {
          this.initPlayer(index)
        }
      })
    },
    goToDetail() {
      router.push({
        name: 'courseDetail',
        params: {
          id: 2
        }
      })
    }
  }
}
</script>

<style lang="less">
.part-list {
  background: #000;
}

.player {
  position: relative;

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  .prism-player {
    .prism-controlbar {
      .prism-progress.prism-progress-hover {
        width: 42%;
        left: 130px !important;
        height: 2px !important;
        bottom: 16px !important;
      }
      .prism-progress-cursor.cursor-hover {
        height: 10px;
        width: 10px;
        border-radius: 5px;
        top: -3px !important;
      }
    }
    .prism-info-display {
      padding: 0 0 0 0;
    }
  }
  .player-container {
    height: 300px;
  }
}
</style>

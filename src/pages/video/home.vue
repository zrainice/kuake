<template>
  <hr-page>
    <div slot="body">
      <div class="prism-player"
        id="J_prismPlayer"></div>
      <div class="btn"
        @click="playerHandler.play()">播放</div>
      <div class="btn"
        @click="playerHandler.pause()">暂停</div>
      <div class="btn"
        @click="makeMark">打点</div>
    </div>
  </hr-page>
</template>

<script>
import { hrPage } from '@/plugins/uiLib'
import { XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  data() {
    return {
      playerHandler: null,
      markers: [{ offset: 10, text: 'test11' }, { offset: 22, text: 'test11' }]
    }
  },
  async mounted() {
    let videoId = 'fa572fec9efd442c88f47ad7902f5b42'
    // this.initSDKPlay()
    let playAuth = await this.getPlayAuth(videoId)
    console.log(playAuth)
    this.playerHandler = new Aliplayer({
      id: 'J_prismPlayer',
      width: '100%',
      // height: '0px',
      // vid: '08a22b016d344aeba75d8f999c1a38c4',
      // playauth: '',
      // autoplay: true,
      format: 'mp3',
      vid: videoId,
      mediaType: 'audio',
      playauth: playAuth,
      progressMarkers: this.markers
      // definition: 'OD,SD',
      // source: 'https://in-20171211194741589-411fdbh5hr.oss-cn-shanghai.aliyuncs.com/video/1b4f642b-1644d73a371-0004-12f8-f53-9b2b1.mp4?Expires=1560423328&OSSAccessKeyId=LTAIVVfYx6D0HeL2&Signature=EvmwYgTlTnY0WksX4auDnX3VYKk%3D'
      // source: {
      //   'OD': 'http://video.weclasswe.ruizhutech.com/08a22b016d344aeba75d8f999c1a38c4/641cc4ce7ebf4394a8c8e5d0a2f049df-S00000001-200000.mp4',
      //   'LD': 'http://video.weclasswe.ruizhutech.com/08a22b016d344aeba75d8f999c1a38c4/641cc4ce7ebf4394a8c8e5d0a2f049df-5456d705cfd07e668f702e78be66cb6f.mp4'
      // }
    })
  },
  methods: {
    async getPlayAuth(videoId) {
      let ret = await axios.post('api/vod/getPlayAuth', {
        VideoId: videoId
      })
      return ret.PlayAuth
    },
    makeMark() {
      let offset = this.playerHandler.getCurrentTime()
      let ret = this.markers.find(item => item.offset == offset)
      if (ret) {
        return
      } else {
        this.markers.push({
          offset: offset,
          text: 'test222'
        })
      }
      this.playerHandler.setProgressMarkers(this.markers)
    },
    initSDKPlay() {
      var aliyunVodPlayer = api.require('aliyunVodPlayer')
      aliyunVodPlayer.initPlayer(
        {
          rect: {
            x: 0,
            y: 0,
            w: 320,
            h: 300
          }
        },
        function(ret) {
          aliyunVodPlayer.prepareToPlay(
            {
              url:
                'http://video.weclasswe.ruizhutech.com/video/191e1264-16b6e50f771-0004-12f8-f53-9b2b1.mp3'
            },
            function(cb) {}
          )
          alert(222)
          aliyunVodPlayer.show()
          aliyunVodPlayer.start()
        }
      )
    }
  },
  watch: {
    $route(to, from) {
      this.setActiveIndex(to)
    }
  },
  components: { hrPage, Tabbar, TabbarItem }
}
</script>

<style lang="less" scoped>
.btn {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
}
</style>

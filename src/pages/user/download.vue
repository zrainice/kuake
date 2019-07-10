<template>
  <div class="user-download">
    <hr-header slot="header"
               title="离线缓存"
               :leftOptions="{backText: ''}">
      <span
      class="c-blue"
      slot="right">删除</span>
    </hr-header>
    <div slot="body" class="bg-white pd-20">
      <!-- 正在缓存 -->
      <div v-if="maps.ing.length">
        <h4 class="m-b-20">正在缓存 <badge :text="maps.ing.length"></badge></h4>
        <div v-for="(item, index) in maps.ing" :key="index" class="disp-flex m-b-20">
          <div class="img no-img">暂无图片</div>
          <div class="m-l-20 flex-1">
            <h3>{{item.title}}</h3>
            <div class="disp-flex justify-between pd-20-0 fz-14">
              <div class="c-999">
                <span>{{item.duration}}分钟</span>
                <span>{{item.size}}MB</span>
              </div>
              <div class="c-blue">{{item.speed}}M/s</div>
            </div>
            <x-progress :percent="item.percent" :show-cancel="false"></x-progress>
          </div>
        </div>
      </div>
      <div>
        <h4 class="c-666 m-b-20">已缓存</h4>
        <div v-for="(item, index) in maps.end" :key="index" class="disp-flex m-b-20">
          <div class="img no-img">暂无图片</div>
          <div class="m-l-20 flex-1">
            <h4>{{item.title}}</h4>
            <div class="disp-flex pd-20-0 fz-14">
              <div class="c-000">{{item.author}}</div>
              <div class="c-666">{{item.authorIntro}}</div>
            </div>
            <div class="c-666 fz-14">共{{item.total}}节 已缓存{{item.downloadVideo}}节视频 {{item.downloadAudio}}节音频</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Badge, XProgress } from 'vux'
  import { hrPage, hrHeader } from '@/plugins/uiLib'
  export default {
    components: { hrPage, hrHeader, Badge, XProgress },
    name: "download",
    data() {
      return {
        maps: {
          ing: [
            { pic: '', title: '双系统理论', duration: 35, size: 393, speed: 2.94, percent: 50 },
            { pic: '', title: '双系统理论', duration: 35, size: 393, speed: 2.94, percent: 50 },
            { pic: '', title: '双系统理论', duration: 35, size: 393, speed: 2.94, percent: 50 }
          ],
          end: [
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 },
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 },
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 },
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 },
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 },
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 },
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 },
            { pic: '', title: '为什么聪明人也会做蠢事', author: '李善友', authorIntro: '混沌大学创办人', total: 5, downloadVideo: 1, downloadAudio: 3 }
          ]
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-download {
    .img {
      width: 1.8rem;
      height: 2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .no-img {
      border: 1px solid rgba(0,0,0,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0,0,0,0.25);
    }
  }
</style>

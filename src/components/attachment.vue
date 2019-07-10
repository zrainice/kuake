<template>
  <div class="weui-cells weui-cells_form"
    style="margin-top: 0; padding-top: 0.1rem padding-bottom: 0.1rem;">
    <!-- <div class="weui-cell"
      id="uploader">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <div class="weui-uploader__title">{{title?title:'附件'}}</div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files"
              id="uploaderFiles"></ul>
            <div class="weui-uploader__input-box">
              <input id="uploaderInput"
                class="weui-uploader__input"
                type="file"
                accept="image/*" />
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="weui-cell">
    <div class="weui-cell__hd fileupload_title">文件上传<input id="uploadFile" class="weui-uploader__input" type="file"
        @change="uploadFile($event)" />
    </div>
  </div> -->
    <template v-if="!disabled">
      <div class="weui-cell">
        <input type="file"
          ref="uploadFile"
          @change="handleInputChange"
          class="upload-input">
        <div class="weui-cell__hd fileupload_title fz-28">文件上传
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <div class="weui-cell__hd fz-28 h-44 lh-44">{{title || '附件'}}
        </div>
      </div>
    </template>
    <div class="filelist">
      <div class="weui-cell fz-24 disp-flex"
        :class="{disabled: disabled}"
        v-for="(item,index) in filelist"
        :key="index">
        <div class="weui-cell__hd">
          <img class="upload-icon"
            src="../assets/image/i-file.png" />
        </div>
        <div class="weui-cell__bd">
          <div @click="previewItem(item)">{{item.fileName}}</div>
        </div>
        <div v-if="!disabled"
          class="weui-cell__ft"
          @click="delFile(index)">
          <img class="upload-icon"
            src="../assets/image/i-close.png" />
        </div>
        <!-- <div v-else
          class="fileupload_title"
          @click="download(item)">
          下载
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // define(function(require, exports, module) {
  //   require('./index.css')
  //   module.exports = {
  props: ['label', 'value', 'filelist', 'disabled', 'imagelist', 'title', 'ossPath'],
  data() {
    return {
      file: ''
    }
  },
  mounted() {
    $g.log(this.filelist)
    this.initImageUpload()
  },
  methods: {
    initImageUpload() {
      // var _this = this;
      // var uploadCount = 0;
      // var image = {};
      // weui.uploader('#uploader', {
      //   url: $g.uploadUrl,
      //   auto: true,
      //   type: 'file',
      //   fileVal: 'file',
      //   compress: {
      //     width: 1600,
      //     height: 1600,
      //     quality: .8
      //   },
      //   // onBeforeQueued: function (files) {
      //   //   // `this` 是轮询到的文件, `files` 是所有文件
      //   //   if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
      //   //     weui.alert('请上传图片');
      //   //     return false; // 阻止文件添加
      //   //   }
      //   //   if (this.size > 10 * 1024 * 1024) {
      //   //     weui.alert('请上传不超过10M的图片');
      //   //     return false;
      //   //   }
      //   //   if (files.length > 5) { // 防止一下子选择过多文件
      //   //     weui.alert('最多只能上传5张图片，请重新选择');
      //   //     return false;
      //   //   }
      //   //   if (uploadCount + 1 > 5) {
      //   //     weui.alert('最多只能上传5张图片');
      //   //     return false;
      //   //   }
      //   //   ++uploadCount;
      //   // },
      //   onQueued: function () {
      //   },
      //   onBeforeSend: function (data, headers) {
      //     image.fileName = data.name;
      //     // headers.token = $g.getToken()
      //     // $g.assign(data, { test: 1 });
      //     // $g.assign(headers, { token: $api.getStorage('token') });
      //   },
      //   onProgress: function (procent) {
      //   },
      //   onSuccess: function (ret) {
      //     // $g.log(ret);
      //     image.fileUrl = ret.data.data;
      //     // _this.imagelist.push($g.cloneDeep(image));
      //   },
      //   onError: function (err) {
      //     // $g.log(err)
      //   }
      // });
      // 缩略图预览
      // document.querySelector('#uploaderFiles').addEventListener('click', function (e) {
      //   var target = e.target;
      //   while (!target.classList.contains('weui-uploader__file') && target) {
      //     target = target.parentNode;
      //   }
      //   if (!target) return;

      //   var url = target.getAttribute('style') || '';
      //   var id = target.getAttribute('data-id');

      //   if (url) {
      //     url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
      //   }
      //   // 预览图片
      //   var gallery = weui.gallery(url, {
      //     className: 'custom-name',
      //     onDelete: function onDelete() {
      //       // 删除图片
      //       weui.confirm('确定删除该图片？', function () {
      //         --uploadCount;
      //         _this.imagelist.splice(_this.index(target), 1);
      //         target.remove();
      //         gallery.hide();
      //       });
      //     }
      //   });
      // });
    },
    index(ele) {
      var elems = ele.parentNode.children;
      for (var i = 0; i < elems.length; i++) {
        if (elems[i] == ele) {
          return i;
        }
      }
    },
    openFileBrowser: function () {
      var $this = this
      var fileBrowser = api.require('fileBrowser')
      fileBrowser.open(function (ret) {
        if (ret) {
          fileBrowser.close()
          // alert(JSON.stringify(ret))
          $this.uploadFile(ret)
          // $this.file = ret
        }
      })
    },
    uploadFile(file) {
      // var file = e.target.files[0];
      // if (!file) {
      //   return
      // }
      // if (!$g.checkFile(file.name)) {
      //   return
      // }
      // $g._log(file);
      // var loading = weui.loading('loading');
      $g.showLoading()
      $g.apiUpload(file.url, (res) => {
        // loading.hide();
        $g.hideLoading()
        if (res.code == 400) {
          $g.toast(res.error)
          return
        }
        this.filelist.push({
          fileName: file.name,
          fileUrl: res.data
        })
        $g.log(this.filelist)
      })
    },
    delFile(index) {
      this.filelist.splice(index, 1)
      // 清空文件里面的东西
      // this.$refs.uploadFile.files = 
    },
    handleInputChange() {
      let files = this.$refs.uploadFile.files
      if (!files.length) {
        return
      }
      $g.upload(window.HOST + window.uploadApi, files[0], (_file, res) => {
        if (res.code == 200) {
          this.filelist.push({
            fileName: _file.name,
            fileUrl: res.data
          })
        } else {
          $g.toast(res.error)
        }
      })
    },
    download(item) {
      api.download({
        url: $g.dealPicPath(this.ossPath, item.fileUrl),
        report: true,
        cache: true,
        allowResume: true
      }, function (ret, err) {
        if (ret.state == 1) {
          $g.toast('下载成功')
        } else {
          $g.toast('下载失败')
        }
      });
    },
    // 预览文件
    previewItem(item) {
      let fileUrl = ''
      if (this.ossPath) {
        fileUrl = $g.dealPicPath(this.ossPath, item.fileUrl)
      } else {
        fileUrl = $g.dealPicPath(window.HOST, item.fileUrl)
      }
      if ((/png|PNG|jpg|JPG|jpeg|JPEG|GIT|gif/).test(item.fileName)) {
        var photoBrowser = api.require('photoBrowser');
        photoBrowser.open({
          images: [fileUrl],
          placeholderImg: 'widget://res/static/200pxIcon.png',
          bgColor: '#000'
        }, function (ret, err) {
          if (ret) {
            // 用户点击图片则关闭
            if (ret.eventType == 'click') {
              photoBrowser.close()
            }
          } else {
          }
        });
      } else if ((/pdf|PDF|doc|DOC|docx|DOCX|PPT|ppt|xsl|XSL|xlsx|XLSX|txt|TXT/).test(item.fileName)) {
        api.download({
          url: fileUrl,
          report: true,
          cache: true,
          allowResume: true,
          savePath: 'fs://tmep/' + item.fileName
        }, function (ret, err) {
          if (ret.state == 1) {
            var superFile = api.require('superFile');
            superFile.open({ path: 'fs://tmep/' + item.fileName });
          } else {
            $g.toast('打开失败')
          }
        });
      }
    }
  }
  // template: $g.getTemplate('Components/upload/index.html')
}
//   })
// }
</script>

<style scoped>
#uploaderInput {
  height: 100%;
}

.upload-icon {
  width: 20px;
  margin-right: 5px;
  display: block;
}

.fileupload_title {
  color: #33b2d5;
}

.disabled {
  padding: 0.1rem 0 !important;
}

.upload-input {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
}
</style>

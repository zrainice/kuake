# uploadImg
## 组件说明
上传图片组件，主要针对表单中上传图片，版本0.1

## 属性
| 参数           | 说明                                    | 类型    | 可选值        | 默认值      |
| -------------- | --------------------------------------- | ------- | ------------- | ----------- |
| listType       | I展示类型，目前默认为照片墙 pictureCard | String  | - pictureCard | pictureCard |
| uploadFileList | 进行绑定初始化图片数组                  | Array   | -             | -           |
| uploadUrl      | 上传文件路径                            | String  | -             | -           |
| showFileList   | 是否显示文件列表                        | Boolean | -             | -   true    |

## 事件
| 名称      |           参数           | 说明             |
| --------- | :----------------------: | ---------------- |
| change    | response, file, fileList | 改变文件回调     |
| successCb | response, file, fileList | 上传文件成功回调 |
| errorCb   | response, file, fileList | 上传文件失败回调 |
| removeCb  |      file, fileList      | 移除文件回调     |

## 方法
| 名称      | 参数  | 说明                                  |
| --------- | :---: | ------------------------------------- |
| uploadImg |  无   | 通过设置ref主动调用该上传组件上传照片 |

## slots
| 名称 | 说明 |
| ---- | ---- |

## 修改记录
| 人员   |    时间    | 说明                      | 版本  |
| ------ | :--------: | ------------------------- | ----- |
| 刘海涛 | 2019-01-25 | 初步搭建上传组件          | 0.2   |
| 刘海涛 | 2019-03-14 | 修复上传组件在手机端不能上传的bug | 0.2.1 |

### 后续版本记录
```
  *: 代表当前版本
  版本0.1 【Done】
    -基本上传图片功能
    -样式类型一种：照片墙
    -初始化图片列表值
    -上传成功、失败、改变回调接口
  版本0.2 【Done】
    -删除照片 *
    -增加模式：支持场景-头像上传 *
      div  + slot
      show-file-list
  版本0.3 【Doing】
    -增加 min、max上传限制
    -
  其他【Todo】
    -增加 min、max上传限制
    -disabled
    -headers
    -removeCb等回调参数中file数据格式相同
    -process处理
    -methods clearFiles  abort  getFile
    -上传后增加多一个组件内loading，上传进度
    自定义上传行为覆盖,不一定适用formData形式上传
    before-upload
    -multiple 开启多选
    @preview="previewMethod"
    是否需要支持上传的文件格式
    压缩图片质量定义
    拖拽移动位置
    拖拽删除图片
```
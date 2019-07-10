# input
## 组件说明
单行文本输入控件，提供输入内容及删除的功能

## 属性
| 参数                | 说明                           | 类型          | 可选值                           | 默认值       |
| ------------------- | ------------------------------ | ------------- | -------------------------------- | ------------ |
| value               | 以v-model的形式进行绑定        | string,number | -                                | -            |
| type                | input类型                      | string        | text, password, textarea, number | text         |
| id,表单校验时会使用 | input的id                      | string        | -                                | ''           |
| placeholder         | 空白时的提示内容               | string        | -                                | '请输入内容' |
| label               | 标签内容                       | string        | -                                | -            |
| readonly            | 是否只读                       | boolean       | -                                | false        |
| disabled            | 是否禁用                       | boolean       | -                                | false        |
| label-width         | label的宽度                    | number        | 0~7                              | 2rem         |
| text-align          | 文字对齐方式                   | string        | left,right,center                | left         |
| show-clear          | 是否显示清除按钮，启动清除方法 | boolean       | -                                | false        |
| max                 | 最多字数限制                   | number        | -                                | 200          |
| min                 | 最少字数限制                   | number        | -                                | 0            |

## 事件
| 名称   |     参数     | 说明                                       |
| ------ | :----------: | ------------------------------------------ |
| blur   | value, event | input失焦时的事件                          |
| focus  | value, evnet | input获得焦点时的事件                      |
| enter  | value, event | 在input中按回车时的事件，同时会让input失焦 |
| change |    value     | 值改变事件                                 |

## slots
| 名称  | 说明                                              |
| ----- | ------------------------------------------------- |
| left  | input左边的内容,当使用此slot时，label属性失效     |
| right | input右边的内容,当disable属性为true时，此slot失效 |

## 修改记录
| 人员   |    时间    | 说明               |
| ------ | :--------: | ------------------ |
| 何梓铭 | 2019-01-20 | 组件基本设计及开发 |
| 何梓铭 | 2019-01-22 | 增加enter事件     |
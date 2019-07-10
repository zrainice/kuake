## APP基本框架开发说明
### 调试方式
- 下载框架 执行npm install 或者yarn install
- 设置config.xml 中的content src部分, 将其改为本机的ip地址
- 到apicloud官网生成自定义apploader, 下载安装, 进行一次同步
- 到项目中执行npm run dev 即可在手机上看到效果

## 发布注意事项
- 将config.xml中的content src部分改为index.html
- 执行npm run build
- 到目录的上一级找到dist文件夹, 将config.xml复制到该文件夹中, 打包成widget.zip文件,并上传到apicloud的代码部分
- 执行编译即可

**
todo 写一个bash命令实现打包加压缩
**
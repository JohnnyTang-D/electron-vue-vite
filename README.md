# electron_vue_vite

> 尝试使用Vite创建一个electron+vue3的模板项目

> Vue3+electron的项目写过不少,但对electron运行机制只有总体了解,而不清楚内部的运行原理

> 此项目的亮点在于,学习了electron启动原理:通过谷歌浏览器v8核心发射的启动事件中插入Node的源码启动,并通过Node的外挂C++的程序外挂了Electron一些
> 逻辑(比如托盘 菜单栏之类的)这样就形成了一个桌面应用.并且学会使用了自己写的脚本去启动一个electron进程,而且还学习electron-builder打包的原理,也尝试
> 使用自己写的脚本去打包成exe文件.

> 另外一个亮点在于,尝试使用了Vite.并学会了自己写脚本去启动Vite的热更新服务.ps:速度是真的快.垃圾Webpack

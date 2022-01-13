# content-tracing-sample

Electron没法直接打开`chrome://tracing`进行tracing，而是通过组件[contentTracing](https://xwartz.gitbooks.io/electron-gitbook/content/en/api/content-tracing.html)提供，但默认没有说明如何进行内存快照如何捕捉的方法，这是结合二者总结出来的方法。

Usage:

```sh
npm i
npm start
```

tracing 结束后会打印`dmp`文件路径，使用`chrome://tracing`加载分析该文件，点击任意`M`的小圆点，可以看到当前时刻的各模块内存开销。

内存的分析是基于MemoryInfra实现的，详细资料见 [memory-infra](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/memory-infra/README.md) 或者 [KB文档翻译版本](https://kb.cvte.com/pages/viewpage.action?pageId=119563595) 。

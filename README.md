# wechaty 结合 electron

> Give a clear and concise description of what the bug is.

- 在 electron 的主进程构建 Wechaty 会报错
- webpack 打包 wechaty 也会报错

> What is your wechaty version?

    "wechaty": "^0.60.3",

> Which puppet are you using for wechaty? (puppeteer/padlocal/service...)

    wechaty-puppet-service  # 企业微信

> What is your node version? (run `node --version`)

    v14.15.4

> What os are you using

    Windows 10

## Provide Your Network Information
1. Where is the location of your server? (i.e. City, or In/Out China)

    Shang Hhai

2. Which cloud platform(AliYun/Qcloud/DigitalOcean/etc) are you using?

    own machine

我测试了四种情况, 有三种失败了

[重现错误的实例-code](https://github.com/Codingxiaoshi/electron-wechaty)

- [成功] 单独启动 wechaty
- [失败] [启动 electron 应用, 在主进程中构建 wechaty](https://github.com/Codingxiaoshi/electron-wechaty/blob/main/electron-main.js)
- [失败] [用 webpack 打包 wechaty + electron 主进程代码](https://github.com/Codingxiaoshi/electron-wechaty/blob/main/webpack.config.electron.js)
- [失败] [webpack 打包 wechaty.js 时报错, 打包后报错. 错误中提到了需要这两个包, ("bufferutil", "utf-8-validate")
    但即便是安装了打包过程中也会有警告, 并且打包后的代码也跑步起来](https://github.com/Codingxiaoshi/electron-wechaty/blob/main/webpack.config.wechaty.js)


## Actual behavior

- 在 electron 主进程中不能构建 Wechaty, 但应该可以正常启动
- webpack 打包 electron 主进程 + Wechaty 时也会报错

## Expected behavior

- 启动开发环境 electron + wechaty 不会报错, 并且控制台可以打印二维码
- webpack 编译 electron 主进程代码 + wechaty 不会报错


## Steps to reproduce the behavior (and fixes, if any)

进入 electron-wechaty 目录

#### 启动 electron 应用, 在主进程中构建 wechaty

```
$ yarn dev:electron
```

```
λ yarn dev:electron
yarn run v1.22.10
$ electron electron-main.js

create bot
(node:12892) electron: The default of contextIsolation is deprecated and will be changing from false to true in a future release of Electron.  See https://github.com/electron/electron/issues/23506 for more information
10:16:08 ERR PuppetWeChatBridge start() exception: Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (848005).
10:16:08 ERR PuppetWeChat initBridge() exception: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (848005).
10:16:08 ERR PuppetWeChat initBridge() this.bridge.stop() rejection: Error: no page
10:16:08 ERR PuppetWeChat start() exception: Error
Error
    at PuppetWeChat.<anonymous> (C:\sxl\test\electron-wechaty\node_modules\wechaty\dist\src\wechaty.js:271:44)
    at PuppetWeChat.emit (events.js:315:20)
    at PuppetWeChat.EventEmitter.emit (domain.js:483:12)
    at PuppetWeChat.start (C:\sxl\test\electron-wechaty\node_modules\wechaty-puppet-wechat\dist\src\puppet-wechat.js:105:18)
    at async Wechaty.start (C:\sxl\test\electron-wechaty\node_modules\wechaty\dist\src\wechaty.js:478:13)
10:16:08 ERR Wechaty start() exception:
鍒濆鍖栧け璐? Error.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

#### 用 webpack 打包 wechaty + electron 主进程代码
```
$  yarn build:electron
```

```
$ yarn dev:electron
yarn run v1.22.10
$ electron electron-main.js

create bot
(node:22364) electron: The default of contextIsolation is deprecated and will be changing from false to true in a future release of Electron.  See https://github.com/electron/electron/issues/23506 for more information
10:10:54 ERR PuppetWeChatBridge start() exception: Error: Could not find expected browser (chrome) locally. Run `npm install` 
to download the correct Chromium revision (848005).
10:10:54 ERR PuppetWeChat initBridge() exception: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (848005).
10:10:54 ERR PuppetWeChat initBridge() this.bridge.stop() rejection: Error: no page
10:10:54 ERR PuppetWeChat start() exception: Error
Error
    at PuppetWeChat.<anonymous> (C:\sxl\test\electron-wechaty\node_modules\wechaty\dist\src\wechaty.js:271:44)
    at PuppetWeChat.emit (events.js:315:20)
    at PuppetWeChat.EventEmitter.emit (domain.js:483:12)
    at PuppetWeChat.start (C:\sxl\test\electron-wechaty\node_modules\wechaty-puppet-wechat\dist\src\puppet-wechat.js:105:18)  
    at async Wechaty.start (C:\sxl\test\electron-wechaty\node_modules\wechaty\dist\src\wechaty.js:478:13)
10:10:54 ERR Wechaty start() exception:
鍒濆鍖栧け璐? Error.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

#### webpack 打包 wechaty.js 时报错
```
$  yarn build:nodejs
```

```
λ yarn build:nodejs
yarn run v1.22.10
$ npx webpack --config webpack.config.wechaty.js
asset built.js 11.2 MiB [compared for emit] (name: main)
runtime modules 793 bytes 4 modules
javascript modules 9.25 MiB
  cacheable modules 9.25 MiB
    modules by path ./node_modules/ 9.25 MiB 1322 modules
    modules by path ./*.js 1.23 KiB 2 modules
  optional modules 202 bytes [optional]
    external "cluster" 42 bytes [optional] [built] [code generated]
    ./node_modules/log4js/lib/appenders/ sync 160 bytes [optional] [built] [code generated]
json modules 508 KiB 45 modules

WARNING in ./node_modules/hot-import/dist/src/hot-import.js 55:28-86
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/hot-import/dist/index.js 3:21-48 4:19-46
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/puppet.js 29:21-42
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/mod.js 40:15-34
 @ ./node_modules/wechaty/dist/src/mod.js 22:23-48
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/hot-import/dist/src/hot-import.js 254:66-86
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/hot-import/dist/index.js 3:21-48 4:19-46
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/puppet.js 29:21-42
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/mod.js 40:15-34
 @ ./node_modules/wechaty/dist/src/mod.js 22:23-48
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/hot-import/dist/src/hot-import.js 266:16-44
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/hot-import/dist/index.js 3:21-48 4:19-46
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/puppet.js 29:21-42
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/mod.js 40:15-34
 @ ./node_modules/wechaty/dist/src/mod.js 22:23-48
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/hot-import/dist/src/hot-import.js 277:16-44
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/hot-import/dist/index.js 3:21-48 4:19-46
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/puppet.js 29:21-42
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/mod.js 40:15-34
 @ ./node_modules/wechaty/dist/src/mod.js 22:23-48
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/log4js/lib/appenders/index.js 26:11-30
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/log4js/lib/log4js.js 27:18-40
 @ ./node_modules/esdk-obs-nodejs/lib/log.js 20:15-32
 @ ./node_modules/esdk-obs-nodejs/lib/obs.js 19:16-32
 @ ./node_modules/wechaty/node_modules/memory-card/dist/src/storage/obs.js 16:18-44
 @ ./node_modules/wechaty/node_modules/memory-card/dist/src/storage/backend-config.js 9:15-31
 @ ./node_modules/wechaty/node_modules/memory-card/dist/src/storage/get-storage.js 5:25-52
 @ ./node_modules/wechaty/node_modules/memory-card/dist/src/storage/mod.js 5:20-44
 @ ./node_modules/wechaty/node_modules/memory-card/dist/src/memory-card.js 38:14-38
 @ ./node_modules/wechaty/node_modules/memory-card/dist/src/mod.js 4:22-46
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/config.js 8:22-44
 @ ./node_modules/wechaty/node_modules/wechaty-puppet/dist/src/mod.js 35:15-34
 @ ./node_modules/wechaty/dist/src/mod.js 22:23-48
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/wechaty/dist/src/puppet-manager.js 120:77-96
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/wechaty/dist/src/wechaty.js 34:25-52
 @ ./node_modules/wechaty/dist/src/mod.js 35:16-36
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/wechaty/dist/src/puppet-manager.js 154:50-77
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/wechaty/dist/src/wechaty.js 34:25-52
 @ ./node_modules/wechaty/dist/src/mod.js 35:16-36
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/wechaty/dist/src/puppet-manager.js 172:12-39
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/wechaty/dist/src/wechaty.js 34:25-52
 @ ./node_modules/wechaty/dist/src/mod.js 35:16-36
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/ws/lib/buffer-util.js 105:21-42
Module not found: Error: Can't resolve 'bufferutil' in 'C:\sxl\test\electron-wechaty\node_modules\ws\lib'
 @ ./node_modules/ws/lib/websocket.js 24:21-45
 @ ./node_modules/ws/index.js 3:18-44
 @ ./node_modules/wechaty/dist/src/io.js 27:29-42
 @ ./node_modules/wechaty/dist/src/wechaty.js 33:13-28
 @ ./node_modules/wechaty/dist/src/mod.js 35:16-36
 @ ./wechaty.js 1:20-38

WARNING in ./node_modules/ws/lib/validation.js 4:22-47
Module not found: Error: Can't resolve 'utf-8-validate' in 'C:\sxl\test\electron-wechaty\node_modules\ws\lib'
 @ ./node_modules/ws/lib/receiver.js 13:43-66
 @ ./node_modules/ws/index.js 7:21-46
 @ ./node_modules/wechaty/dist/src/io.js 27:29-42
 @ ./node_modules/wechaty/dist/src/wechaty.js 33:13-28
 @ ./node_modules/wechaty/dist/src/mod.js 35:16-36
 @ ./wechaty.js 1:20-38

10 warnings have detailed information that is not shown.
Use 'stats.errorDetails: true' resp. '--stats-error-details' to show it.

webpack 5.32.0 compiled with 10 warnings in 3603 ms
Done in 5.54s.
```

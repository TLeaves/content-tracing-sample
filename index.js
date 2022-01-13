const path = require('path')
const { app, BrowserWindow } = require('electron')
const url = require('url')

const contentTracing = require('electron').contentTracing;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.show()
}

app.on('ready', createWindow)

app.whenReady().then(() => {
  (async () => {
    await contentTracing.startRecording({
      enable_systrace: true,
      excluded_categories: [
        "accessibility",
        "AccountFetcherService",
        "android_webview",
        "aogh",
        "audio",
        "base",
        "benchmark",
        "blink_gc",
        "blink_style",
        "blink.animations",
        "blink.bindings",
        "blink.console",
        "blink.net",
        "blink.resource",
        "blink.user_timing",
        "blink.worker",
        "Blob",
        "browser",
        "browsing_data",
        "CacheStorage",
        "Calculators",
        "camera",
        "CameraStream",
        "cast_app",
        "cast_perf_test",
        "cast.mdns",
        "cast.mdns.socket",
        "cast.stream",
        "cc.debug",
        "cdp.perf",
        "chromeos",
        "cma",
        "compositor",
        "content",
        "content_capture",
        "device",
        "devtools",
        "devtools.contrast",
        "devtools.timeline",
        "disk_cache",
        "download",
        "download_service",
        "drm",
        "drmcursor",
        "dwrite",
        "DXVA_Decoding",
        "evdev",
        "event",
        "exo",
        "explore_sites",
        "extensions",
        "file_system_provider",
        "FileSystem",
        "fonts",
        "GAMEPAD",
        "gpu",
        "gpu.angle",
        "gpu.capture",
        "headless",
        "hwoverlays",
        "identity",
        "ime",
        "IndexedDB",
        "input",
        "io",
        "ipc",
        "Java",
        "jni",
        "jpeg",
        "latency",
        "latencyInfo",
        "leveldb",
        "loading",
        "log",
        "login",
        "media",
        "media_router",
        "memory",
        "midi",
        "mojom",
        "mus",
        "native",
        "navigation",
        "net",
        "offline_pages",
        "omnibox",
        "oobe",
        "ozone",
        "p2p",
        "page-serialization",
        "paint_preview",
        "partition_alloc",
        "passwords",
        "pepper",
        "PlatformMalloc",
        "power",
        "ppapi",
        "ppapi_proxy",
        "print",
        "rail",
        "renderer",
        "renderer_host",
        "renderer.scheduler",
        "RLZ",
        "safe_browsing",
        "screenlock_monitor",
        "segmentation_platform",
        "service_manager",
        "ServiceWorker",
        "sharing",
        "shell",
        "shortcut_viewer",
        "shutdown",
        "SiteEngagement",
        "skia",
        "sql",
        "stadia_media",
        "stadia_rtc",
        "startup",
        "sync",
        "system_apps",
        "test_gpu",
        "thread_pool",
        "toplevel.flow",
        "ui",
        "v8.execute",
        "v8.wasm",
        "ValueStoreFrontend::Backend",
        "views",
        "views.frame",
        "viz",
        "vk",
        "wayland",
        "webaudio",
        "WebCore",
        "weblayer",
        "webrtc",
        "xr"
      ],    // 排除默认开启的选项，降低干扰，可根据需要来排除
      included_categories: [
        "disabled-by-default-memory-infra",
        "disabled-by-default-memory-infra.v8.code_stats"
      ],    // 开启默认关闭的MemoryInfra开关，捕捉内存快照
      memory_dump_config: {
        allowed_dump_modes: [
          "background",
          "light",
          "detailed"
        ],
        triggers: [{
          min_time_between_dumps_ms: 1000,     // 这里更改触发内存信息收集的周期
          mode: "detailed",
          type: "periodic_interval"
        }]
      },
      record_mode: "record-until-full"
    })
    console.log('Tracing started')
    await new Promise(resolve => setTimeout(resolve, 10000))     // 这里更改tracing的总时长
    const path = await contentTracing.stopRecording()
    console.log('Tracing finished. Path: ' + path)
  })()
})
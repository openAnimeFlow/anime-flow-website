import { repoUrl } from '@/config/site'

// Source links are pinned to the reviewed client revision, rather than a moving branch.
export const sourceRevision = '7b4a967fa987c958fc7e1f2fe5d3a146bd412406'
export const sourceUrl = (path: string) => `${repoUrl}/blob/${sourceRevision}/${path}`

export interface DiagramNode {
  id: string
  title: string
  subtitle: string
  x: number
  y: number
  kind: 'app' | 'service' | 'storage' | 'external'
  description: string
  files: string[]
}

export interface DiagramEdge {
  from: string
  to: string
  path: string
  label: string
  labelX: number
  labelY: number
  dashed?: boolean
}

export interface ArchitectureDiagram {
  id: string
  title: string
  caption: string
  height: number
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

const node = (
  id: string, title: string, subtitle: string, column: number, row: number,
  kind: DiagramNode['kind'], description: string, files: string[],
): DiagramNode => ({ id, title, subtitle, x: 32 + column * 350, y: 30 + row * 148, kind, description, files })

// Connect adjacent nodes at their card boundaries. Direction follows the source data.
function connect(nodes: DiagramNode[], from: string, to: string, label: string, dashed = false): DiagramEdge {
  const a = nodes.find(item => item.id === from)!
  const b = nodes.find(item => item.id === to)!
  if (a.y === b.y) {
    const forward = b.x > a.x
    const start = a.x + (forward ? 256 : 0)
    const end = b.x + (forward ? 0 : 256)
    return { from, to, label, dashed, path: `M ${start} ${a.y + 42} H ${end}`, labelX: (start + end) / 2, labelY: a.y + 27 }
  }
  const down = b.y > a.y
  const startY = a.y + (down ? 84 : 0)
  const endY = b.y + (down ? 0 : 84)
  const middleY = (startY + endY) / 2
  const startX = a.x + 128
  const endX = b.x + 128
  return {
    from, to, label, dashed,
    path: `M ${startX} ${startY} V ${middleY} H ${endX} V ${endY}`,
    labelX: startX === endX ? startX + 50 : (startX + endX) / 2,
    labelY: middleY - 8,
  }
}

const overviewNodes = [
  node('widgets', 'Flutter 页面与组件', 'presentation / shared/widgets', 0, 0, 'app', '首页、排行、搜索、番剧详情、播放、下载与用户页面负责展示和交互；共享组件承载番剧卡片、图片与 BBCode 内容。', ['lib/features/home/presentation/pages/home_page.dart', 'lib/shared/widgets/subject_card.dart']),
  node('riverpod', 'Riverpod 状态与会话', 'Provider · Notifier · AsyncValue', 1, 0, 'app', '页面监听 Provider 获得数据，Notifier 响应交互；播放、弹幕和 UI 状态分别管理。部分 Provider 使用代码生成，作用域和销毁回调协调资源生命周期。', ['lib/features/play/presentation/providers/play_provider.dart']),
  node('router', 'GoRouter 类型化路由', 'StatefulShellRoute · route extra', 2, 0, 'app', '推荐、排行、用户使用 StatefulShellRoute 分支。路由 extra 传递番剧、剧集及离线播放参数，避免把整个页面的数据请求塞进导航层。', ['lib/app/router/app_router.dart', 'lib/app/router/model/play_route_extra.dart']),
  node('play', '播放与弹幕业务', 'PlaySession / DanmakuSession', 0, 1, 'service', 'PlaySession 组织媒体打开、播放状态、进度和设备控制；DanmakuSession 独立负责弹幕请求、转换、过滤与画布调度。', ['lib/features/play/presentation/providers/play_provider.dart', 'lib/features/play/application/danmaku_session.dart']),
  node('download', '下载与视频源业务', 'DownloadManager / RuleEngine', 1, 1, 'service', '下载管理器控制任务队列与文件传输；规则引擎执行 XPath/API 数据源配置。视频源检索与媒体 URL 解析分为不同阶段。', ['lib/features/download/application/download_manager.dart', 'lib/core/crawler/rule_engine.dart']),
  node('sync', '账号与收藏业务', 'BgmCollectionSync / repositories', 2, 1, 'service', '客户端通过 Flow API 登录、读写收藏、触发 Bangumi 同步任务并订阅任务状态；服务端内部实现不在这份客户端源码的范围内。', ['lib/features/user/application/bgm_collection_sync_provider.dart', 'lib/features/user/data/repository/user_repository.dart']),
  node('contract', '播放器领域契约', 'PlayerEngine · Event · Snapshot', 0, 2, 'service', '领域模型约定内核能力、媒体源、事件和状态快照。PlaybackCoordinator 通过统一契约调用内核，UI 不直接绑定原生播放器 API。', ['lib/features/play/domain/player/player_engine.dart', 'lib/features/play/application/playback_coordinator.dart']),
  node('repositories', '数据仓库与共享模型', 'Source / Play / Download repositories', 1, 2, 'storage', '仓库封装本地数据读写和远端同步；shared/models 提供番剧、播放记录、下载记录及收藏任务等模型。不同功能按需要使用这些层，并非所有模块都具有相同的层级。', ['lib/features/source/data/repositories/source_repository.dart', 'lib/features/play/data/repository/play_repository.dart', 'lib/features/download/data/repositories/download_repository.dart']),
  node('network', '网络与认证基础设施', 'DioFactory · clients · interceptors', 2, 2, 'service', 'Flow、通用 API、GitHub、插件和下载使用分开的 Dio 实例，共享网络配置与日志策略；Flow 客户端接入令牌刷新拦截器。', ['lib/core/network/core/dio_factory.dart', 'lib/core/network/interceptors/flow_refresh_token_interceptor.dart']),
  node('native', '跨平台原生适配', 'media_kit / FVP / WebView', 0, 3, 'external', '播放器适配器实现同一 PlayerEngine 接口；WebView、下载目录与更新安装根据操作系统选择实现。窗口、亮度、音量等能力在客户端接入。', ['lib/features/play/infrastructure/player/player_engine_factory.dart', 'lib/core/webview/video/video_webview_controller.dart']),
  node('local', '设备上的持久化', 'Hive CE · secure storage · files', 1, 3, 'storage', 'Hive 保存设置、规则、播放记录、搜索历史和下载记录；Flow 令牌写入系统安全存储；媒体、弹幕、图片缓存和 Shader 使用文件系统。', ['lib/core/settings/storage.dart', 'lib/core/auth/repository/flow_token_storage.dart']),
  node('external', '外部服务与内容站点', 'Flow / GitHub / trace.moe / sources', 2, 3, 'external', 'Flow API 承接番剧、账号、收藏、弹幕和版本信息等客户端调用；GitHub 相关仓库提供字体等资源；trace.moe 用于截图识番；规则指定的站点提供搜索与剧集资源。', ['lib/core/network/api/flow_api.dart', 'lib/core/network/api/api.dart', 'lib/core/network/api/github_api.dart']),
]

export const overviewDiagram: ArchitectureDiagram = {
  id: 'overview', title: '客户端系统架构', height: 590,
  caption: '箭头表示主要调用或数据访问方向；网络、存储和平台能力可被多个功能共享。这里展示的是客户端边界，外部服务以接口呈现。',
  nodes: overviewNodes,
  edges: [
    connect(overviewNodes, 'widgets', 'riverpod', '监听 / 操作'),
    connect(overviewNodes, 'router', 'riverpod', '路由参数'),
    connect(overviewNodes, 'riverpod', 'play', '播放会话'),
    connect(overviewNodes, 'riverpod', 'download', '任务状态'),
    connect(overviewNodes, 'riverpod', 'sync', '收藏状态'),
    connect(overviewNodes, 'play', 'contract', '统一控制'),
    connect(overviewNodes, 'download', 'repositories', '数据读写'),
    connect(overviewNodes, 'sync', 'network', 'API / SSE'),
    connect(overviewNodes, 'contract', 'native', '内核适配'),
    connect(overviewNodes, 'repositories', 'local', '持久化'),
    connect(overviewNodes, 'network', 'external', 'HTTP 请求'),
  ],
}

const sourceNodes = [
  node('config', '数据源配置', 'CrawlConfigItem / SourceRepository', 0, 0, 'storage', '插件是声明式 JSON 规则。下载后先校验规则 API 兼容性，再以插件目录版本覆盖规则内版本，保存配置与排序到本地。', ['lib/features/source/data/repositories/source_repository.dart', 'lib/core/crawler/item/crawler_config_item.dart']),
  node('rule', '规则执行引擎', 'RuleEngine / strategies', 1, 0, 'service', '搜索与章节阶段分别选择 XPath 或 API 策略，统一执行“准备请求 → 传输 → 解析”，按阶段包装错误，验证码异常单独透传。', ['lib/core/crawler/rule_engine.dart']),
  node('request', '站点请求与验证', 'RuleRequest / Cookie / Captcha', 2, 0, 'external', '请求层应用规则头部和 Cookie 策略，并检测验证码响应；需要验证时交给平台验证码 WebView，获取 Cookie 后再尝试站点请求。', ['lib/core/crawler/rule_request.dart', 'lib/core/crawler/captcha_detector.dart', 'lib/core/webview/captcha/captcha_webview_controller.dart']),
  node('parse', '结构化资源结果', 'HtmlCrawler / ApiCrawler', 2, 1, 'service', 'HTML 通过 XPath 提取条目；API 响应按配置读取 JSONPath 字段。解析结果统一为搜索条目或剧集线路模型，隔离页面结构差异。', ['lib/core/crawler/html_crawler.dart', 'lib/core/crawler/api_crawler.dart']),
  node('rank', '标题匹配与排序', 'SearchResultRankService / Isolate', 1, 1, 'service', '主标题和别名参与评分，结合规范化标题、子串、相似度及季数/剧场版等标记进行匹配。后台 isolate 完成打分和排序；并列项保留原始顺序。', ['lib/features/play/application/search_result_rank_service.dart']),
  node('select', '选择站点、线路与剧集', 'VideoSourceNotifier', 0, 1, 'app', '默认最多并发搜索 5 个站点，每个站点最多保留 5 个候选。搜索会话 ID、站点请求令牌和自动选择 epoch 防止过期响应覆盖当前选择。', ['lib/features/play/presentation/providers/video_source_provider.dart', 'lib/features/play/application/chapter_collection_service.dart']),
  node('webview', '解析剧集播放页面', 'WebViewVideoSourceService', 0, 2, 'service', '播放解析使用共享 WebView 服务，按队列串行加载页面。新请求取消旧请求，并检查请求身份；等待 URL 事件、取消事件或超时，最后卸载页面。', ['lib/features/play/application/webview_video_source_service.dart']),
  node('media', '可播放的媒体源', 'VideoSource → PlaybackSource', 1, 2, 'service', 'VideoSource 返回媒体 URL、偏移量和类型；进入播放会话时转换为 PlaybackSource。在线链接和本地文件通过同一播放器接口打开。', ['lib/features/play/application/video_source_service.dart', 'lib/features/play/domain/player/playback_source.dart']),
  node('session', '开始播放', 'PlaySession.initPlayState()', 2, 2, 'app', '串行停止旧媒体、替换上下文、打开新媒体并播放。每次异步步骤检查播放请求 ID，确认当前请求后再加载该集弹幕。', ['lib/features/play/presentation/providers/play_provider.dart']),
]

const playbackNodes = [
  node('controls', '播放页面与操作', 'player UI / gestures / shortcuts', 0, 0, 'app', '进度条、触屏手势、桌面鼠标和快捷键发出播放命令。VideoUiNotifier 管理控件显隐及解析指示，不承担原生内核生命周期。', ['lib/features/play/presentation/widgets/player/player.dart', 'lib/features/play/presentation/providers/video_ui_provider.dart']),
  node('session', '播放会话', 'PlaySession', 1, 0, 'service', '组合播放协调器、进度管理器、弹幕会话和系统音量同步；用请求 ID 与串行媒体切换避免快速切集产生的旧回调写回。', ['lib/features/play/presentation/providers/play_provider.dart']),
  node('coordinator', '串行命令与内核切换', 'PlaybackCoordinator', 2, 0, 'service', 'PlayerOperationQueue 串行执行原生操作。切换时暂停旧内核，初始化候选内核，恢复媒体、进度、音量和倍速，再替换订阅；失败路径释放候选并尝试恢复旧播放。', ['lib/features/play/application/playback_coordinator.dart', 'lib/features/play/infrastructure/player/player_operation_queue.dart']),
  node('engine', '可替换的播放器内核', 'PlayerEngine → media_kit / FVP', 2, 1, 'external', '工厂按用户偏好创建内核。两者支持截图；media_kit 额外声明 Shader 能力，业务通过 PlayerCapabilities 决定是否应用 Anime4K。', ['lib/features/play/domain/player/player_engine.dart', 'lib/features/play/infrastructure/player/player_engine_factory.dart', 'lib/features/play/infrastructure/player/media_kit/media_kit_engine.dart', 'lib/features/play/infrastructure/player/fvp/fvp_engine.dart']),
  node('events', '统一播放事件', 'PlayerEvent', 1, 1, 'service', '内核把位置、时长、播放/暂停、缓冲、完成和错误转换为统一事件；会话消费事件并更新状态。待确认 seek 期间会过滤陈旧位置及完成事件。', ['lib/features/play/domain/player/player_event.dart', 'lib/features/play/presentation/providers/play_provider.dart']),
  node('state', '响应式播放状态', 'PlayState / PlaybackPhase', 0, 1, 'app', 'UI 订阅位置、缓冲、倍速、全屏等状态。解析、打开、播放、缓冲、暂停和完成等阶段驱动加载提示，避免只以单一 buffering 布尔值描述全过程。', ['lib/features/play/domain/player/playback_phase.dart', 'lib/features/play/presentation/providers/play_provider.dart']),
  node('progress', '观看进度与续播记录', 'PlaybackProgressManager', 0, 2, 'service', '暂停/播放和拖动后的记录使用 3 秒防抖，写入任务串行执行。登录、开启进度同步、非本地播放且时长至少 2 分钟时，达到 90% 才尝试自动标记已看。', ['lib/features/play/application/playback_progress_manager.dart']),
  node('history', '本地记录与远端同步', 'PlayRepository → Hive / Flow API', 1, 2, 'storage', '先写本地并标记未同步，再上传 Flow。失败保留记录供补同步；拉取远端记录时跳过未上传的本地记录，仅用更新的远端记录覆盖已同步数据。', ['lib/features/play/data/repository/play_repository.dart', 'lib/features/play/application/play_history_service.dart']),
  node('danmaku', '与播放时间同步的弹幕', 'DanmakuSession / Scheduler', 2, 2, 'service', '在线从 Flow 获取弹幕，离线读取本地 JSON；按播放秒数分桶，每秒把同桶弹幕均匀分发。seek、切集或销毁会使 generation/epoch 失效并取消待发计时器。', ['lib/features/play/application/danmaku_session.dart', 'lib/features/play/application/danmaku_dispatch_scheduler.dart']),
]

const downloadNodes = [
  node('ui', '选择下载剧集', 'DownloadProvider', 0, 0, 'app', '下载状态层协调资源解析、任务管理、弹幕保存与 UI 更新；暂停、续传、删除和优先任务通过管理器接口执行。', ['lib/features/download/presentation/providers/download_provider.dart']),
  node('pool', '独立视频解析池', 'VideoSourceResolverPool', 1, 0, 'service', '队列将解析请求分配给空闲 worker，每个 worker 持有自己的视频源服务。worker 数量可调整，取消或销毁时清理排队请求与服务资源。', ['lib/features/download/application/video_source_resolver_pool.dart']),
  node('manager', '剧集任务调度', 'DownloadManager', 2, 0, 'service', '下载管理器按剧集排队，默认并发 2 集；每集 HLS 默认并发 3 个分片，两项均可调整。任务身份和取消令牌控制暂停、取消及重复入队。', ['lib/features/download/application/download_manager.dart']),
  node('hls', 'HLS 播放列表解析', 'M3u8Parser', 2, 1, 'service', '选择主列表中最高带宽变体，解析媒体列表、嵌套列表、密钥、初始化段与字节范围；下载流程拒绝直播和独立音轨等不支持的情况。', ['lib/features/download/application/m3u8_parser.dart', 'lib/features/download/application/download_manager.dart']),
  node('transfer', '分片 / 直链文件传输', 'DownloadHttpClient / retries', 1, 1, 'service', 'HLS 分片使用信号量控制并发，已完成分片可复用。MP4 等直链通过 Range 续传；失败按 1、3、9 秒退避重试，并处理不支持 Range 的响应。', ['lib/features/download/application/download_manager.dart', 'lib/features/download/application/download_http_client.dart']),
  node('files', '可离线播放的文件', 'local playlist / media / danmaku', 0, 1, 'storage', '把分片、密钥和初始化段保存到下载目录，并重写本地播放列表。直链保存为媒体文件，弹幕由独立服务下载为 JSON；文件可被现有播放会话打开。', ['lib/features/download/application/m3u8_parser.dart', 'lib/features/download/application/download_danmaku_service.dart']),
  node('directory', '平台目录与权限', 'DownloadDirectoryPlatform', 0, 2, 'external', 'Android、macOS、桌面及不支持的平台采用不同目录适配；启动时恢复目录访问，iOS 额外迁移因应用容器变化而失效的历史路径。', ['lib/features/download/application/download_directory/download_directory_platform.dart', 'lib/features/download/application/download_path_migration.dart']),
  node('record', '下载状态持久化', 'DownloadRepository / Hive', 1, 2, 'storage', '高频进度先进入内存缓存，只在下载状态发生变化时写 Hive，读取时合并缓存。重启后的任务恢复由下载 Provider 检查持久化状态和文件。', ['lib/features/download/data/repositories/download_repository.dart', 'lib/features/download/presentation/providers/download_provider.dart']),
  node('offline', '离线选集与播放', 'Episodes / PlaybackSource.localFile', 2, 2, 'app', '离线模式以已完成下载构造剧集列表和选集数据；播放会话使用本地媒体路径与本地弹幕路径，复用内核控制和播放器 UI。', ['lib/features/play/presentation/providers/episodes_provider.dart', 'lib/features/play/presentation/providers/play_provider.dart']),
]

const syncNodes = [
  node('binding', '账号登录与 Bangumi 绑定', 'FlowToken / bangumiBindProvider', 0, 0, 'app', '同步状态 Provider 先等待 Flow 登录令牌，再确认 Bangumi 已绑定。应用启动或进入前台发现任务状态；触发同步是独立的显式操作。', ['lib/features/user/application/bgm_collection_sync_provider.dart', 'lib/features/user/application/collection_sync_lifecycle.dart']),
  node('trigger', '查询 / 触发 / 解决冲突', 'CollectionSyncRepository', 1, 0, 'service', '仓库封装状态查询、带请求 ID 的同步触发、分页读取冲突和提交冲突选择，全部通过 Flow API 与外部服务交互。', ['lib/features/user/data/repository/collection_sync_repository.dart']),
  node('flow', 'Flow 同步任务接口', 'HTTP status / trigger / conflicts', 2, 0, 'external', '客户端将服务端返回的任务 ID、状态版本、同步数量和冲突状态映射成模型。本图只描述客户端可见的协议，不推定服务端队列或数据库架构。', ['lib/core/network/api/flow_api.dart', 'lib/shared/models/flow/bgm_collection_sync_status_item.dart']),
  node('sse', '增量 SSE 状态流', 'UTF-8 → lines → event frames', 2, 1, 'service', '逐块解码 UTF-8 后分行，支持跨数据块和多行 data；以空行提交 status 事件，注释心跳只更新存活时间，限制单帧文本大小为 64 KiB。', ['lib/features/user/data/repository/collection_sync_repository.dart']),
  node('accept', '有序接收任务状态', 'taskId / statusVersion / generation', 1, 1, 'service', '拒绝较旧任务 ID 和同任务较旧状态版本。连接代次及 Provider 代次检查阻止已断开连接、退出账号或已重建状态的回调继续写入。', ['lib/features/user/application/bgm_collection_sync_provider.dart']),
  node('refresh', '刷新收藏与番剧页面', 'invalidate / collectionRevision', 0, 1, 'app', '同步数量或任务状态发生有效变化后，刷新当前用户与收藏缓存，并递增 collectionRevision，使相关页面感知收藏更新。', ['lib/features/user/application/collection_revision_provider.dart', 'lib/features/user/presentation/providers/user_collection_provider.dart']),
  node('scope', '前台与页面订阅范围', 'ConnectionScope.owners', 0, 2, 'app', '只有登录且绑定完成、应用处于前台、至少有一个页面订阅者时才保持 SSE。进入后台或最后一个订阅页面离开时取消连接。', ['lib/features/user/application/collection_sync_lifecycle.dart', 'lib/features/user/application/bgm_collection_sync_provider.dart']),
  node('retry', '心跳与断线重连', '60 s heartbeat / 1–30 s backoff', 1, 2, 'service', '60 秒收不到事件或心跳就判定连接失活；仍满足订阅条件时按指数退避重连，间隔上限 30 秒。主动取消先使连接代次失效，避免自动重连。', ['lib/features/user/application/bgm_collection_sync_provider.dart']),
  node('conflict', '用户处理收藏冲突', 'CollectionConflictsDialog', 2, 2, 'app', '账号设置页展示任务及冲突，读取差异后由用户选择处理方式并提交。冲突决定交给交互流程，客户端不会用普通 SSE 到达顺序替代冲突解决。', ['lib/features/settings/presentation/widgets/account/collection_conflicts_dialog.dart', 'lib/features/settings/presentation/widgets/account/bgm_collection_sync_section.dart']),
]

export const diagrams: Record<string, ArchitectureDiagram> = {
  source: {
    id: 'source', title: '从声明式规则到可播放媒体', height: 442, nodes: sourceNodes,
    caption: '按箭头从左上沿蛇形阅读。选中搜索候选后，再经 RuleEngine 获取剧集线路；WebView 将选中的剧集页面转换成媒体 URL，规则解析与媒体解析承担不同职责。',
    edges: [connect(sourceNodes, 'config', 'rule', '读取规则'), connect(sourceNodes, 'rule', 'request', '准备请求'), connect(sourceNodes, 'request', 'parse', '响应内容'), connect(sourceNodes, 'parse', 'rank', '候选条目'), connect(sourceNodes, 'rank', 'select', '匹配排序'), connect(sourceNodes, 'select', 'webview', '选集 URL'), connect(sourceNodes, 'webview', 'media', 'URL / 偏移'), connect(sourceNodes, 'media', 'session', '打开媒体')],
  },
  playback: {
    id: 'playback', title: '播放命令、内核事件与会话状态', height: 442, nodes: playbackNodes,
    caption: '上方是命令链路，中间是内核事件回流；下方是进度保存和弹幕调度。虚线表示关联的旁路业务，媒体播放不依赖弹幕请求成功。',
    edges: [connect(playbackNodes, 'controls', 'session', '操作命令'), connect(playbackNodes, 'session', 'coordinator', '统一调度'), connect(playbackNodes, 'coordinator', 'engine', '原生调用'), connect(playbackNodes, 'engine', 'events', '事件流'), connect(playbackNodes, 'events', 'state', '更新状态'), connect(playbackNodes, 'state', 'progress', '位置 / 时长'), connect(playbackNodes, 'progress', 'history', '防抖保存'), { from: 'session', to: 'danmaku', path: 'M 510 114 V 146 H 680 V 306 H 860 V 326', label: '会话调度', labelX: 770, labelY: 297, dashed: true }],
  },
  download: {
    id: 'download', title: '从下载任务到离线播放', height: 442, nodes: downloadNodes,
    caption: '主链路展示 HLS 下载；直链媒体绕过播放列表解析进入文件传输。目录权限与下载记录分别管理文件访问和任务状态。',
    edges: [connect(downloadNodes, 'ui', 'pool', '解析请求'), connect(downloadNodes, 'pool', 'manager', '媒体地址'), connect(downloadNodes, 'manager', 'hls', '检测 HLS'), connect(downloadNodes, 'hls', 'transfer', '分片 / 密钥'), connect(downloadNodes, 'transfer', 'files', '落盘 / 重写'), connect(downloadNodes, 'files', 'directory', '目录访问'), connect(downloadNodes, 'transfer', 'record', '进度 / 状态'), connect(downloadNodes, 'record', 'offline', '完成记录')],
  },
  sync: {
    id: 'sync', title: '收藏同步任务的客户端生命周期', height: 442, nodes: syncNodes,
    caption: 'HTTP 发起操作，SSE 回传任务状态；前台订阅范围决定连接是否存在，心跳和退避控制恢复过程。冲突通过单独的用户操作解决。',
    edges: [connect(syncNodes, 'binding', 'trigger', '确认绑定'), connect(syncNodes, 'trigger', 'flow', 'HTTP 操作'), connect(syncNodes, 'flow', 'sse', '推送状态'), connect(syncNodes, 'sse', 'accept', '解码模型'), connect(syncNodes, 'accept', 'refresh', '有效变化'), connect(syncNodes, 'scope', 'retry', '连接条件', true), connect(syncNodes, 'accept', 'retry', '心跳 / 断线', true), { from: 'flow', to: 'conflict', path: 'M 988 72 H 1008 V 368 H 988', label: '冲突交互', labelX: 956, labelY: 299, dashed: true }],
  },
}

export const contents = [
  { id: 'overview', title: '架构总览' },
  { id: 'bootstrap', title: '启动与目录' },
  { id: 'source', title: '数据源解析' },
  { id: 'playback', title: '播放与弹幕' },
  { id: 'download', title: '离线下载' },
  { id: 'sync', title: '收藏同步' },
  { id: 'foundation', title: '基础设施' },
  { id: 'quality', title: '设计与验证' },
]

export const featureChapters = [
  {
    id: 'source', number: '03', eyebrow: 'SOURCE PIPELINE', title: '规则驱动，多源检索与媒体解析分离。',
    description: '番剧元数据与播放站点资源是两类数据。数据源功能把可配置站点转成统一的搜索条目和剧集线路，再通过平台 WebView 提取最终媒体地址，播放器无需理解每个站点的页面结构。',
    points: [
      { title: '声明式扩展与兼容性检查', text: '搜索与章节可分别使用 XPath 或 API 规则；API 请求支持 GET/POST、变量模板和 JSONPath 提取。安装时验证 RuleApiLevel，避免把客户端无法执行的规则写入配置。' },
      { title: '检索并发与标题匹配', text: '站点搜索默认限制为 5 路并发、每站最多 5 个候选。标题与别名在 isolate 中打分，同时考虑季数、最终季、OVA 和剧场版等差异，降低错番和错季的选择概率。' },
      { title: '解析取消与验证码恢复', text: '站点验证由验证码 WebView 与 CookieManager 配合处理；播放解析服务复用共享 WebView。新请求取消旧请求，身份校验与超时约束共同阻止旧解析结果污染当前集。' },
    ],
    tests: ['test/core/crawler/rule_engine_test.dart', 'test/core/crawler/api_crawler_test.dart', 'test/core/crawler/crawler_config_compat_test.dart', 'test/features/play/application/search_result_rank_service_test.dart'],
  },
  {
    id: 'playback', number: '04', eyebrow: 'PLAYBACK SESSION', title: '一套会话，协调内核、状态与观看进度。',
    description: '播放模块的分层最完整：presentation 负责界面与状态，application 负责业务协调，domain 定义播放器契约，infrastructure 接入 media_kit 和 FVP。弹幕和播放记录与会话协作，各自管理请求与持久化逻辑。',
    points: [
      { title: '内核接口与快照恢复', text: 'PlayerEngine 统一打开、seek、音量、倍速、截图与 Shader 操作。切换时从 PlayerSnapshot 恢复媒体和进度，候选内核准备完成后替换事件订阅；能力差异通过 PlayerCapabilities 显式判断。' },
      { title: '异步竞态与资源生命周期', text: 'PlayerOperationQueue 串行化原生操作；PlaySession 用请求 ID 检查切集结果，seek 落点确认前过滤陈旧事件。退出页面时失效请求、取消订阅、保存进度，并等待原生队列排空后释放内核。' },
      { title: '进度记录与自动标记', text: '记录按 3 秒防抖并串行写入，先落 Hive 再同步 Flow。自动标记已看需满足登录、设置开启、非本地播放、有效番剧与剧集信息、时长至少 2 分钟且播放达到 90%；进行中和已完成的标记请求会去重。' },
      { title: '弹幕与 Anime4K', text: '弹幕按秒分桶并在该秒内分散发送，seek 或切集立即取消待发计时器。繁简转换有独立版本检查，屏蔽来源和颜色在分发时处理。Anime4K GLSL 从 assets 复制到应用支持目录，仅对支持 Shader 的内核启用。' },
    ],
    tests: ['test/features/play/application/playback_coordinator_test.dart', 'test/features/play/application/playback_progress_manager_test.dart', 'test/features/play/application/danmaku_dispatch_scheduler_test.dart', 'test/features/play/presentation/providers/play_session_kernel_test.dart'],
  },
  {
    id: 'download', number: '05', eyebrow: 'OFFLINE PIPELINE', title: '下载是有状态的任务系统。',
    description: '离线功能不仅保存一个 URL。它需要解析资源、调度多个剧集、控制分片并发、处理暂停与续传、维护目录权限、持久化任务状态，并让本地文件重新进入统一播放链路。',
    points: [
      { title: '分层并发与可取消任务', text: 'VideoSourceResolverPool 负责解析 worker；DownloadManager 负责剧集队列；信号量限制每集分片传输。管理器默认 2 集、每集 3 分片并发，实际配置可由设置调整。Android 另接入前台服务维护下载通知与后台任务。' },
      { title: 'HLS 的本地重建', text: '解析主列表、相对地址、嵌套列表、密钥、初始化段和字节范围，下载后重写本地 m3u8；嵌套解析深度默认最多 3 层。流程明确拒绝直播和独立音轨，避免生成不完整的离线内容。' },
      { title: '续传、状态与离线复用', text: '已完成的 HLS 分片可复用，直链文件按 Range 续传，传输失败按 1/3/9 秒退避。进度缓存在内存、状态改变时写 Hive；已完成记录构建离线剧集列表，本地媒体和弹幕复用原有播放器会话。' },
    ],
    tests: ['test/features/download/application/download_manager_test.dart', 'test/features/download/application/m3u8_parser_test.dart', 'test/features/download/application/video_source_resolver_pool_test.dart', 'test/features/download/data/repositories/download_repository_test.dart'],
  },
  {
    id: 'sync', number: '06', eyebrow: 'COLLECTION SYNC', title: '以任务版本为准，让实时同步保持有序。',
    description: '收藏同步由客户端触发 Flow 服务的任务，再以 SSE 订阅进度和冲突状态。账号变化、页面订阅和应用前后台都会影响连接生命周期；客户端只接受当前会话的有效更新。',
    points: [
      { title: '状态发现与任务触发分离', text: '登录并完成 Bangumi 绑定后读取同步状态。CollectionSyncLifecycle 负责启动与前台恢复时发现状态，启动本身不会发起同步；用户操作经仓库提交带请求 ID 的触发请求。' },
      { title: '增量解码与过期状态过滤', text: 'SSE 解析处理跨块 UTF-8、多行 data、注释心跳与空行分帧，单事件文本限制 64 KiB。任务 ID 和 statusVersion 保证新状态不会被旧状态覆盖，generation 隔离已结束的连接与登录会话。' },
      { title: '订阅范围、重连与冲突', text: '前台且存在页面订阅者时才保持连接；60 秒无事件触发断线处理，重连按指数退避、上限 30 秒。有效同步变化刷新收藏并递增 revision；收藏冲突通过对话框读出差异，由用户选择后单独提交。' },
    ],
    tests: ['test/features/user/collection_sync_sse_parser_test.dart', 'test/features/user/collection_sync_lifecycle_test.dart', 'test/features/user/collection_sync_subscription_scope_test.dart', 'test/features/user/bgm_collection_sync_provider_test.dart'],
  },
]

export const directoryLayers = [
  { path: 'lib/app/', label: '应用组装', description: '启动流程、应用根节点、类型化路由、主题与本地化。', file: 'lib/app/bootstrap.dart' },
  { path: 'lib/features/', label: '功能模块', description: '围绕 home、search、play、download、user、source 等业务组织；按复杂度采用 presentation、application、data、domain、infrastructure。', file: 'lib/features/play/presentation/providers/play_provider.dart' },
  { path: 'lib/core/', label: '跨功能基础设施', description: '网络与认证、规则引擎、平台 WebView、设置、日志、图片缓存及在线状态服务。', file: 'lib/core/network/core/dio_factory.dart' },
  { path: 'lib/shared/', label: '共享数据与组件', description: '番剧、剧集、下载和收藏模型，以及图片、卡片、BBCode 等通用界面组件。', file: 'lib/shared/models/download/download_record.dart' },
  { path: 'test/', label: '行为验证', description: '覆盖纯逻辑、仓库、Provider、内核适配与 Widget 交互，测试目录大体镜像功能结构。', file: 'test/features/play/application/playback_coordinator_test.dart' },
]

export const startupSteps = [
  { title: '初始化运行环境', text: 'main() 以 runZonedGuarded 捕获未处理异常；bootstrap 初始化 Flutter binding、错误日志、许可信息与 MediaKit。' },
  { title: '恢复本地状态', text: '初始化 Hive 与各业务 Box；iOS 重定位历史下载路径，恢复下载目录权限，接入图片缓存并初始化前台下载服务和字体。' },
  { title: '准备网络与平台能力', text: '读取包信息并初始化 DioFactory 的设备 User-Agent；异步启动 PresenceService。桌面平台初始化窗口并设置标题栏。' },
  { title: '创建状态容器并启动 UI', text: '创建 ProviderContainer，读取应用信息，异步准备 Shader 目录与内置数据源；runApp 使用 UncontrolledProviderScope 注入容器。' },
]

export const foundations = [
  { icon: 'source' as const, title: '账号认证与会话保护', text: '邮箱登录由 LoginService 写入 FlowTokenStorage，令牌保存在 FlutterSecureStorage。刷新拦截器仅在明确的 access_token_expired 情况下处理，多个请求共享刷新 Future，每个原请求最多重试一次；退出登录使旧刷新代次失效，临时网络或存储失败不会直接清空有效会话。', files: ['lib/features/auth/application/login_service.dart', 'lib/core/auth/repository/flow_token_storage.dart', 'lib/core/network/interceptors/flow_refresh_token_interceptor.dart'] },
  { icon: 'layers' as const, title: '网络隔离与图片缓存', text: 'DioFactory 为 API、Flow、GitHub、插件和下载分配客户端并统一配置。图片加载使用自定义 FileService 与缓存管理器；开启 ECH 且域名命中配置时才走 EchImageService，其余图片走普通 HTTP。缓存清理同时处理磁盘文件与 Flutter 内存图像缓存。', files: ['lib/core/network/core/dio_factory.dart', 'lib/core/network/image/image_file_service.dart', 'lib/core/network/image/image_cache_service.dart'] },
  { icon: 'desktop' as const, title: '跨平台能力与界面适配', text: 'Flutter 共享页面与业务状态；视频 WebView、验证码 WebView、下载目录和安装更新提供各平台实现。主题、字体与语言由独立 Provider 管理，桌面窗口、全屏、系统音量及移动端手势通过相应能力接入。', files: ['lib/core/webview/video/video_webview_controller.dart', 'lib/features/download/application/download_directory/download_directory_platform.dart', 'lib/app/theme/theme_provider.dart'] },
  { icon: 'sparkles' as const, title: '发现、识番与应用更新', text: '首页、排行、日历、搜索、人物和番剧详情以各自 Provider 加载业务数据；截图识番将图片文件或 URL 交给 trace.moe。更新检查经 FlowApi.getLatestRelease 获取发布信息，再由平台更新控制器处理下载后的安装或跳转。功能模块复用共享模型与网络服务。', files: ['lib/core/network/api/api.dart', 'lib/features/app_update/application/app_info_provider.dart', 'lib/features/app_update/application/apply_updates_controller.dart'] },
]

export const designDecisions = [
  { title: '按功能组织，按复杂度分层', text: '功能目录形成业务边界，播放等复杂模块再细分领域与适配层。较轻的模块直接以页面和 Provider 组织；这种渐进分层让结构与功能复杂度相匹配，减少简单业务中的层级负担。' },
  { title: '接口隔离原生与外部依赖', text: 'PlayerEngine、IVideoSourceProvider、IDownloadManager 与 IDownloadRepository 为替换内核、注入测试实现和平台适配提供边界。数据源规则把站点差异从播放器控制逻辑中移出。' },
  { title: '为异步结果定义有效期', text: '播放请求 ID、弹幕 generation/epoch、收藏任务版本和认证刷新代次处理各自的竞态；串行队列管理不能并发的原生操作，取消令牌管理可终止的网络请求。' },
  { title: '分清实时状态与持久状态', text: 'UI 与高频下载进度保留在响应式状态或内存缓存中；Hive 保存恢复所需记录，媒体保存在文件系统，认证凭证进入安全存储。播放记录先本地保存，再尝试同步。' },
]

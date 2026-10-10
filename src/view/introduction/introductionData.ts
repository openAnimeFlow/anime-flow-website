export interface AppScreenshot {
  id: string
  label: string
  description: string
  src: string
}

function screenshot(id: string, label: string, description: string): AppScreenshot {
  return {
    id, label, description,
    src: `/images/introduction/${id}.jpg`,
  }
}

export const chapters = [
  {
    id: 'discover', number: '01', label: '发现好番', icon: 'calendar',
    eyebrow: 'DISCOVER YOUR NEXT STORY',
    title: '下一部喜欢的，\n在这里遇见。',
    description: '从今日放送开始，翻一翻热门榜单，看看同好正在追什么。让找番成为一件轻松的小事。',
    features: [
      { title: '推荐与播放记录', description: '今日放送、热门动画和最近观看集中展示，发现新故事，也能接着上次的进度看。' },
      { title: '排行榜与放送日历', description: '按年份、月份浏览榜单，按星期查看新番与更新信息，用标签筛选感兴趣的内容。' },
      { title: '社区在线', description: '看看社区正在观看的番剧和在线动态，在同好的选择里发现新的灵感。' },
    ],
    screenshots: [
      screenshot('home', '推荐首页', '今日放送、播放记录与热门动画，让发现和继续观看都更顺手。'),
      screenshot('ranking', '排行榜', '热门榜单结合评分、标签与年份、月份筛选，帮助你找到感兴趣的番剧。'),
      screenshot('calendar', '每日放送', '按星期浏览新番时间表，查看剧集更新信息，并通过标签筛选。'),
      screenshot('community', '社区在线', '查看在线动态与大家正在观看的番剧，发现同好的追番选择。'),
    ],
  },
  {
    id: 'collection', number: '02', label: '记录喜欢', icon: 'layers',
    eyebrow: 'A PLACE FOR EVERY FAVORITE',
    title: '想看的、在看的，\n都有自己的位置。',
    description: '把喜欢的作品放进收藏，让追番状态与观看进度清楚可见。连接 Bangumi，把你的追番日常串在一起。',
    features: [
      { title: '收藏与追番状态', description: '按想看、看过、在看、搁置和抛弃管理作品，查看已经看过的集数。' },
      { title: '完整的番剧信息', description: '简介、评分、标签、角色与评论，帮助你在开播前多了解一点，也能留下自己的评价。' },
      { title: '从详情找到播放资源', description: '在番剧详情中搜索数据源，查看匹配结果，让了解作品与开始观看自然衔接。' },
    ],
    screenshots: [
      screenshot('collection', '我的收藏', '收藏按追番状态分类，封面、评分与剧集进度一起呈现。'),
      screenshot('anime-details', '番剧详情', '在同一页面了解简介、评分、标签和作品信息，管理收藏与评价。'),
      screenshot('source-search', '剧集详情', '从番剧详情搜索可用数据源，浏览匹配的作品与播放资源。'),
      screenshot('account', '账号管理', '在账户设置中绑定 Bangumi，并同步 AnimeFlow 与 Bangumi 的收藏。'),
    ],
  },
  {
    id: 'playback', number: '03', label: '沉浸观看', icon: 'play',
    eyebrow: 'STAY IN THE MOMENT',
    title: '进入故事，\n也遇见共鸣。',
    description: '画面、弹幕、选集与讨论在一处展开。按自己的节奏播放，在喜欢的情节里多停留一会儿。',
    features: [
      { title: '多数据源与线路切换', description: '在播放中搜索其他数据源，切换线路或剧集，选择适合当前观看的资源。' },
      { title: '弹幕与剧集讨论', description: '接入 Bilibili、Gamer 与弹弹Play 弹幕，在播放侧栏查看剧集评论，精彩时刻有人共鸣。' },
      { title: '按习惯调整播放', description: '倍速、自动下一集、片头片尾跳过时长与进度保存，让每次观看更顺手。' },
    ],
    screenshots: [
      screenshot('player', '播放界面', '播放画面、弹幕、选集和作品信息在大屏上一起展开。'),
      screenshot('player-sources', '切换数据源', '在播放侧栏搜索数据源、筛选线路，查看当前集与全集匹配结果。'),
      screenshot('episode-comments', '剧集讨论', '观看时在侧栏浏览当前剧集的评论，也能参与讨论。'),
      screenshot('playback-settings', '播放设置', '自定义自动下一集、跳过时长、进度保存、播放器内核与长按快进速度。'),
    ],
  },
  {
    id: 'customize', number: '04', label: '随心设置', icon: 'source',
    eyebrow: 'MAKE IT YOUR OWN',
    title: '你的习惯，\n就是最好的设置。',
    description: '从界面配色到弹幕样式，从数据源管理到播放偏好，把 AnimeFlow 调整成你喜欢的样子。',
    features: [
      { title: '主题与外观', description: '选择明暗主题和喜欢的主题色，让每次打开都更合眼缘。' },
      { title: '自定义数据源', description: '管理、添加与编辑数据源，支持 XPath 爬虫配置，让播放资源的选择更灵活。' },
      { title: '弹幕细节由你掌控', description: '分别选择滚动、顶部、底部弹幕和弹幕来源，调节字号、透明度、速度与显示区域。' },
    ],
    screenshots: [
      screenshot('appearance', '主题样式', '选择明暗模式与主题配色，让界面贴合自己的喜好。'),
      screenshot('source-management', '数据源管理', '集中管理数据源，调整启用状态，并添加、编辑自己的配置。'),
      screenshot('danmaku-settings', '弹幕设置', '按类型与来源选择弹幕，自定义描边、颜色、密集模式及显示样式。'),
    ],
  },
] as const

export const screenshots = chapters.flatMap(chapter => [...chapter.screenshots])

export const moreFeatures = [
  { icon: 'sparkles', title: 'Anime4K 实时超分', description: '在支持 GLSL 的播放器内核上，按设备性能选择效率档或质量档，实时提升画面清晰度。MDK 内核不支持此功能。' },
  { icon: 'expand', title: '用一张截图找番', description: '接入 trace.moe，选择本地图片或输入图片链接，识别画面对应的番剧与片段。' },
  { icon: 'download', title: '把剧集留在本地', description: '创建剧集下载任务，查看下载进度与已完成的剧集，为之后的观看做好准备。' },
] as const

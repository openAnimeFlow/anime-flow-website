export const repoUrl = 'https://github.com/openAnimeFlow/AnimeFlow'
export const releasesUrl = `${repoUrl}/releases`
export const platforms = ['Windows', 'Android', 'macOS', 'Linux', 'iOS'] as const
export const devices = [
  { id: 'desktop', name: '桌面端', icon: 'desktop', heading: '在大屏上，尽情进入故事。', description: '宽阔的内容视野，清楚的侧栏导航。发现好番、查看播放记录，在桌面上从容安排你的追番日常。', platforms: 'Windows · macOS · Linux', image: '/images/app-wide.jpg' },
  { id: 'tablet', name: 'iPad', icon: 'tablet', heading: '刚刚好的屏幕，刚刚好的自在。', description: '在平板上展开熟悉的番剧与播放记录。窝进沙发，或者换个角落，把喜欢的故事带在身边。', platforms: 'iPad · iOS', image: '/images/app-wide.jpg' },
  { id: 'phone', name: '手机', icon: 'phone', heading: '让喜欢，陪你走得更远。', description: '为竖屏保留清晰的内容层次。推荐、播放记录与追番收藏，把碎片时间留给喜欢的故事。', platforms: 'Android · iOS', image: '/images/app-mobile.jpg' },
] as const
export const features = [
  { icon: 'calendar', subtitle: '发现与每日放送', title: '好番，及时发现。', description: '热门推荐、排行榜和每周放送日历，把想看的故事放进你的追番计划。' },
  { icon: 'sparkles', subtitle: 'Anime4K 实时超分', title: '让每一帧更动人。', description: '在播放中提升画面清晰度，按设备性能选择效率档或质量档。' },
  { icon: 'message', subtitle: '多来源弹幕', title: '精彩，有人共鸣。', description: '接入 Bilibili、Gamer 与弹弹Play，字号、速度和显示区域由你掌控。' },
  { icon: 'layers', subtitle: 'Bangumi 收藏同步', title: '喜欢的，都有位置。', description: '连接 Bangumi 账号，管理收藏与追番状态，让下一次打开更有方向。' },
] as const

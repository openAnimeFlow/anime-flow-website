export { repoUrl, releasesUrl } from '@/config/site'
export const platforms = ['Windows', 'Android', 'macOS', 'Linux', 'iOS'] as const
export const devices = [
  { id: 'desktop', name: '桌面端', icon: 'desktop', heading: '在大屏上，尽情进入故事。', description: '宽阔的播放视野，选集与数据源信息清楚呈现。让弹幕与画面一起展开，在桌面上从容进入喜欢的故事。', platforms: 'Windows · macOS · Linux', image: '/images/app-player-wide.jpg', imageWidth: 1942, imageHeight: 1059 },
  { id: 'tablet', name: 'iPad', icon: 'tablet', heading: '刚刚好的屏幕，刚刚好的自在。', description: '在平板上展开播放画面、弹幕与选集。窝进沙发，或者换个角落，把喜欢的故事带在身边。', platforms: 'iPad · iOS', image: '/images/app-player-tablet.jpg', imageWidth: 2732, imageHeight: 1986 },
  { id: 'phone', name: '手机', icon: 'phone', heading: '让喜欢，陪你走得更远。', description: '为竖屏保留清晰的播放层次。画面、弹幕、选集与数据源上下展开，把碎片时间留给喜欢的故事。', platforms: 'Android · iOS', image: '/images/app-player-mobile.jpg', imageWidth: 1080, imageHeight: 2400 },
] as const
export const features = [
  { icon: 'calendar', subtitle: '发现与每日放送', title: '好番，及时发现。', description: '热门推荐、排行榜和每周放送日历，把想看的故事放进你的追番计划。' },
  { icon: 'sparkles', subtitle: 'Anime4K 实时超分', title: '让每一帧更动人。', description: '在播放中提升画面清晰度，按设备性能选择效率档或质量档。' },
  { icon: 'message', subtitle: '多来源弹幕', title: '精彩，有人共鸣。', description: '接入 Bilibili、Gamer 与弹弹Play，字号、速度和显示区域由你掌控。' },
  { icon: 'layers', subtitle: 'Bangumi 收藏同步', title: '喜欢的，都有位置。', description: '连接 Bangumi 账号，管理收藏与追番状态，让下一次打开更有方向。' },
] as const

const LANG_KEY = 'ai-mastery-lang';

export function getLang() {
  return localStorage.getItem(LANG_KEY) === 'zh' ? 'zh' : 'en';
}

export function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang === 'zh' ? 'zh' : 'en');
}

export function otherLang() {
  return getLang() === 'zh' ? 'en' : 'zh';
}

const STRINGS = {
  en: {
    'meta.title': 'AI Mastery Course',
    'header.logo': 'AI Mastery',
    'header.searchPlaceholder': 'Search lessons… (press /)',
    'header.toggleSidebar': 'Toggle sidebar',
    'header.toggleTheme': 'Toggle theme',
    'header.toggleLang': 'Switch to Chinese',
    'header.langLabel': '中文',
    'theme.label': 'Theme',
    'hero.title.pre': 'Master ',
    'hero.title.highlight': 'AI Tools',
    'hero.title.post': ' From Zero',
    'hero.subtitle': '{parts} parts · {lessons} lessons · hands-on workshops that leave you with real skills, real tools, real results.',
    'stat.lessonsDone': 'Lessons Done',
    'stat.complete': 'Complete',
    'stat.totalLessons': 'Total Lessons',
    'stat.parts': 'Parts',
    'action.resume': 'Resume',
    'action.startLearning': 'Start Learning',
    'action.browseCurriculum': 'Browse Curriculum',
    'progress.overall': 'Overall Progress',
    'progress.lessonsComplete': '{done} of {total} lessons complete',
    'section.courseParts': 'Course Parts',
    'part.label': 'Part {number}',
    'part.lessonsCount': '{count} lessons',
    'lesson.notFound': 'Lesson not found.',
    'breadcrumb.home': 'Home',
    'badge.complete': 'Complete',
    'nav.previous': 'Previous',
    'nav.next': 'Next',
    'complete.done': "You've completed this lesson.",
    'complete.todo': "When you're done with the workshop, mark this lesson complete.",
    'button.markComplete': 'Mark Complete',
    'button.completed': 'Completed',
    'workshop.label': 'Workshop',
    'copy.button': 'Copy',
    'copy.copied': 'Copied!',
    'diagram.myth': 'Myth',
    'diagram.reality': 'Reality',
    'comingSoon.title': 'Content coming soon',
    'comingSoon.body': "This lesson's content is being written. Check back soon, or continue to the next lesson.",
    'search.noResults': 'No results found',
    'lessonStatus.complete': 'Complete',
    'lessonStatus.inProgress': 'In progress',
    'lessonStatus.notStarted': 'Not started',
  },
  zh: {
    'meta.title': 'AI 精通课程',
    'header.logo': 'AI 精通课程',
    'header.searchPlaceholder': '搜索课程…（按 / 键）',
    'header.toggleSidebar': '切换侧边栏',
    'header.toggleTheme': '切换主题',
    'header.toggleLang': '切换到英文',
    'header.langLabel': 'EN',
    'theme.label': '主题',
    'hero.title.pre': '从零开始',
    'hero.title.highlight': '精通 AI 工具',
    'hero.title.post': '',
    'hero.subtitle': '{parts} 个部分 · {lessons} 节课程 · 实战工作坊，让你真正掌握技能、工具和成果。',
    'stat.lessonsDone': '已完成课程',
    'stat.complete': '完成度',
    'stat.totalLessons': '课程总数',
    'stat.parts': '部分数',
    'action.resume': '继续学习',
    'action.startLearning': '开始学习',
    'action.browseCurriculum': '浏览课程大纲',
    'progress.overall': '总体进度',
    'progress.lessonsComplete': '已完成 {done} / {total} 节课程',
    'section.courseParts': '课程部分',
    'part.label': '第 {number} 部分',
    'part.lessonsCount': '{count} 节课程',
    'lesson.notFound': '未找到该课程。',
    'breadcrumb.home': '首页',
    'badge.complete': '已完成',
    'nav.previous': '上一课',
    'nav.next': '下一课',
    'complete.done': '你已完成本课程。',
    'complete.todo': '完成工作坊练习后，将本课程标记为已完成。',
    'button.markComplete': '标记为已完成',
    'button.completed': '已完成',
    'workshop.label': '工作坊',
    'copy.button': '复制',
    'copy.copied': '已复制！',
    'diagram.myth': '误区',
    'diagram.reality': '事实',
    'comingSoon.title': '内容即将上线',
    'comingSoon.body': '本课程内容正在编写中，请稍后再来查看，或继续学习下一课。',
    'search.noResults': '未找到相关结果',
    'lessonStatus.complete': '已完成',
    'lessonStatus.inProgress': '进行中',
    'lessonStatus.notStarted': '未开始',
  },
};

export function t(key, vars) {
  const lang = getLang();
  let str = (STRINGS[lang] && STRINGS[lang][key]) ?? STRINGS.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
  }
  return str;
}

export function curriculumPath() {
  return getLang() === 'zh' ? 'data/curriculum.zh.json' : 'data/curriculum.json';
}

export function lessonPath(partId, lessonId) {
  const dir = `data/lessons/part-${String(partId).padStart(2, '0')}`;
  return getLang() === 'zh' ? `${dir}/${lessonId}.zh.json` : `${dir}/${lessonId}.json`;
}

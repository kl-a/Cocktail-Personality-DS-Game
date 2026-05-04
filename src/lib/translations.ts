export const UI = {
  en: {
    bootTitle:    'COCKTAIL BAR STORIES',
    bootUnit:     'COCKTAIL UNIT  v2.4',
    bootChecking: 'CHECKING VIBES........',
    bootReady:    'READY.',

    topHeader:    '✦ Cocktail Bar Stories ✦',
    titleLine1:   'A Night That',
    titleLine2:   'Escalated Way',
    titleLine3:   'Too Quickly',
    subtitle:     'A cocktail personality quiz',
    questionCount: (n: number) => `${n} questions`,
    oneCocktail:  '1 cocktail',
    tagline:      'Make choices. Regret nothing. Get a cocktail.',
    answerLine1:  'Answer honestly.',
    answerLine2:  "Or don't. We'll figure",
    answerLine3:  'you out anyway.',
    start:        '▶  START',
    touchToBegin: 'TOUCH TO BEGIN',

    questionOf:   (cur: number, tot: number) => `Question ${cur} of ${tot}`,
    questionLabel:(n: number) => `Q${n}`,

    yourResult:   'Your result',
    again:        '↺ AGAIN',
    share:        '◈ SHARE',
    copied:       '✓ COPIED!',
    tabCleared:   '✦ tab cleared ✦',
    flavourProfile: 'Flavour profile',
    loading:      'Loading…',
    mixing:       'Mixing your drink…',

    shareTitle: 'My Cocktail Personality',
    shareText:  (name: string, mbti: string) =>
      `✦ I got ${name} (${mbti}) on "A Night That Escalated Way Too Quickly" ✦\n\nTake the cocktail personality quiz!`,

    dimensionLabels: {
      movement:       'Energy',
      speech:         'Expression',
      expressiveness: 'Presence',
      attitude:       'Vibe',
    } as Record<string, string>,

    flavorLabels: {
      sweet:  'sweet',
      sour:   'sour',
      bitter: 'bitter',
      salty:  'salty',
      umami:  'umami',
    } as Record<string, string>,

    aaQuestion: {
      text: 'Have you heard of Alcoholics Anonymous?',
      answers: [
        { text: "I've been to a few meetings. For a friend.",  score: 2, water: true  },
        { text: "No. Why would I? I'm completely fine.",       score: 5, water: false },
        { text: 'I sponsor three people there.',               score: 3, water: true  },
        { text: 'I FOUNDED the local chapter. And named it.',  score: 1, water: true  },
        { text: 'They meet Tuesdays. I avoid Tuesdays now.',   score: 4, water: false },
      ],
    },
  },

  zh: {
    bootTitle:    '鸡尾酒酒吧故事',
    bootUnit:     '酒水系统  v2.4',
    bootChecking: '正在检测氛围........',
    bootReady:    '准备就绪。',

    topHeader:    '✦ 鸡尾酒酒吧故事 ✦',
    titleLine1:   '一个',
    titleLine2:   '越来越离谱',
    titleLine3:   '的夜晚',
    subtitle:     '鸡尾酒性格测验',
    questionCount: (n: number) => `${n} 道问题`,
    oneCocktail:  '1 杯鸡尾酒',
    tagline:      '做出选择。无怨无悔。领取鸡尾酒。',
    answerLine1:  '诚实作答。',
    answerLine2:  '当然，不答也行。',
    answerLine3:  '我们自有判断。',
    start:        '▶  开始',
    touchToBegin: '触碰开始',

    questionOf:   (cur: number, tot: number) => `第 ${cur} 题，共 ${tot} 题`,
    questionLabel:(n: number) => `Q${n}`,

    yourResult:   '你的结果',
    again:        '↺ 再来一次',
    share:        '◈ 分享',
    copied:       '✓ 已复制！',
    tabCleared:   '✦ 记录已清除 ✦',
    flavourProfile: '风味档案',
    loading:      '加载中…',
    mixing:       '正在调制你的酒…',

    shareTitle: '我的鸡尾酒性格',
    shareText:  (name: string, mbti: string) =>
      `✦ 我在「一个越来越离谱的夜晚」测出了 ${name} (${mbti}) ✦\n\n来测测你的鸡尾酒性格！`,

    dimensionLabels: {
      movement:       '活力',
      speech:         '表达',
      expressiveness: '存在感',
      attitude:       '氛围',
    } as Record<string, string>,

    flavorLabels: {
      sweet:  '甜',
      sour:   '酸',
      bitter: '苦',
      salty:  '咸',
      umami:  '鲜',
    } as Record<string, string>,

    aaQuestion: {
      text: '你听说过戒酒互助会吗？',
      answers: [
        { text: '我去过几次会议，替朋友的。',             score: 2, water: true  },
        { text: '没有，为什么？我完全没问题。',            score: 5, water: false },
        { text: '我在那里赞助了三个人。',                 score: 3, water: true  },
        { text: '我创立了本地分会，还给它起了名字。',      score: 1, water: true  },
        { text: '他们周二开会，我现在避开周二。',          score: 4, water: false },
      ],
    },
  },
} as const

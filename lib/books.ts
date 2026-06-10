/**
 * The bookshelf data source.
 *
 * This is the single place to edit your library — add, remove, or reorder books
 * here and the shelf updates everywhere. No database, no API.
 *
 * To add a real cover: drop the image into `public/books/` and set
 *   cover: '/books/your-file.jpg'
 * Leave `cover` undefined to use the generated gradient placeholder cover
 * (dark background, large title, small author, category tag).
 */

export type BookStatus = 'read' | 'reading' | 'want-to-read'

export type BookCategory = 'Novel' | 'Philosophy' | 'Tech' | 'Literature' | 'Other'

/** Accent hues, drawn from the site palette, used to tint placeholder covers. */
export type BookAccent = 'warm' | 'iris' | 'sage' | 'clay' | 'gold'

export interface Book {
  /** stable id, used as React key */
  id: string
  title: string
  author: string
  /** path under /public (e.g. '/books/dune.jpg'); falls back to a gradient cover */
  cover?: string
  status: BookStatus
  /** 1–5, optional */
  rating?: number
  category: BookCategory
  /** a single-line impression — the one sentence that stayed with you */
  note: string
  /** when you finished it, e.g. '2025' or 'Mar 2025'; optional */
  finishedDate?: string
  /** override the placeholder cover hue; defaults to the category's hue */
  accent?: BookAccent
}

/** Each category maps to a default accent hue so the shelf stays cohesive. */
const categoryAccent: Record<BookCategory, BookAccent> = {
  Novel: 'clay',
  Philosophy: 'iris',
  Tech: 'sage',
  Literature: 'gold',
  Other: 'warm',
}

/** Resolved hex for each accent — used to paint placeholder covers precisely. */
export const accentHex: Record<BookAccent, string> = {
  warm: '#e3a86f',
  iris: '#8c7bd6',
  sage: '#8aa394',
  clay: '#c97c5d',
  gold: '#d8b878',
}

export function bookAccent(book: Book): BookAccent {
  return book.accent ?? categoryAccent[book.category]
}

export const statusLabel: Record<BookStatus, string> = {
  read: 'Read',
  reading: 'Reading',
  'want-to-read': 'Want to read',
}

/**
 * My shelf. Most-front-of-mind first. Edit freely.
 */
export const books: Book[] = [
  {
    id: 'educated',
    title: '你当像鸟飞往你的山',
    author: '塔拉·韦斯特弗',
    status: 'reading',
    category: 'Other',
    note: '教育不是为了逃离那座山，而是终于有力气回头，看清它的样子。',
    accent: 'warm',
  },
  {
    id: 'old-man-and-the-sea',
    title: '老人与海',
    author: '海明威',
    status: 'read',
    category: 'Novel',
    rating: 5,
    finishedDate: '2023',
    note: '一个人可以被毁灭，但不能被打败——这句话我一直记到现在。',
    accent: 'sage',
  },
  {
    id: 'hundred-years-of-solitude',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    status: 'read',
    category: 'Literature',
    rating: 5,
    finishedDate: '2024',
    note: '马孔多的雨下了四年多，合上书才明白，孤独原来是会遗传的。',
    accent: 'gold',
  },
  {
    id: 'to-kill-a-mockingbird',
    title: '杀死一只知更鸟',
    author: '哈珀·李',
    status: 'read',
    category: 'Novel',
    rating: 5,
    finishedDate: '2022',
    note: '真正的勇敢，是还没开始就知道会输，却依然温柔地坚持。',
    accent: 'warm',
  },
  {
    id: 'the-little-prince',
    title: '小王子',
    author: '圣埃克苏佩里',
    status: 'read',
    category: 'Literature',
    rating: 5,
    finishedDate: '2021',
    note: '长大以后才真正读懂：重要的东西，用眼睛是看不见的。',
    accent: 'iris',
  },
  {
    id: 'the-holy-mother',
    title: '圣母',
    author: '秋吉理香子',
    status: 'read',
    category: 'Novel',
    rating: 4,
    finishedDate: '2024',
    note: '以母爱之名的悬疑，最后一页那个反转让我愣了很久。',
    accent: 'clay',
  },
  {
    id: 'malice',
    title: '恶意',
    author: '东野圭吾',
    status: 'read',
    category: 'Novel',
    rating: 4,
    finishedDate: '2023',
    note: '比起凶手是谁，那份毫无来由的恶意，才真正让人脊背发凉。',
    accent: 'iris',
  },
  {
    id: 'journey-under-midnight-sun',
    title: '白夜行',
    author: '东野圭吾',
    status: 'read',
    category: 'Novel',
    rating: 5,
    finishedDate: '2023',
    note: '“我只希望能手牵手在阳光下散步”——一句话，写尽了一生的暗。',
    accent: 'iris',
  },
  {
    id: 'strait-is-the-gate',
    title: '窄门',
    author: '安德烈·纪德',
    status: 'read',
    category: 'Literature',
    rating: 4,
    finishedDate: '2022',
    note: '“你们要努力进窄门”——她把爱，活成了一场温柔的自我献祭。',
    accent: 'sage',
  },
  {
    id: 'moon-and-sixpence',
    title: '月亮与六便士',
    author: '毛姆',
    status: 'read',
    category: 'Novel',
    rating: 4,
    finishedDate: '2023',
    note: '满地都是六便士，而他偏偏抬起头，看见了月亮。',
    accent: 'gold',
  },
]

export const currentlyReading: Book[] = books.filter((b) => b.status === 'reading')

/** Preferred display order for the filter row. */
const CATEGORY_ORDER: BookCategory[] = ['Novel', 'Literature', 'Philosophy', 'Tech', 'Other']
const STATUS_ORDER: BookStatus[] = ['reading', 'read', 'want-to-read']

/** Only the statuses / categories actually present, so filters never show empty. */
export const presentStatuses: BookStatus[] = STATUS_ORDER.filter((s) =>
  books.some((b) => b.status === s),
)
export const presentCategories: BookCategory[] = CATEGORY_ORDER.filter((c) =>
  books.some((b) => b.category === c),
)

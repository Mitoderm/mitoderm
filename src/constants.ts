import {
  NavItem,
  HowToUseItem,
  LanguageSwitchItem,
  SolutionItem,
  ScrollItems,
  EventBulletItem,
  WorkshopVariant,
  InviteBulletItem,
  StatItem,
} from './types';

export const navMainList: NavItem[] = [
  { text: 'navigation.results', scrollId: ScrollItems.gallery },
  { text: 'navigation.about', scrollId: ScrollItems.mission },
  { text: 'navigation.info', scrollId: ScrollItems.moreInfo },
  { text: 'navigation.contact', scrollId: ScrollItems.contactUs },
  { text: 'navigation.event', url: '/event' },
  { text: 'navigation.clinic', 
    // url: '/doctors'
    scrollId: ScrollItems.clinic
   },
];

export const navEventList: NavItem[] = [
  { text: 'navigation.info', scrollId: ScrollItems.about },
  { text: 'navigation.agenda', scrollId: ScrollItems.agenda },
  { text: 'navigation.contact', scrollId: ScrollItems.contactUs },
  { text: 'navigation.results', scrollId: ScrollItems.gallery },
  { text: 'navigation.about', scrollId: ScrollItems.mission },
];

export const navFormList: NavItem[] = [
  { text: 'navigation.event', url: '/event' },
];

export const navDoctorList: NavItem[] = [
  { text: 'navigation.event', url: '/event' },
]

export const howToUseItemList: HowToUseItem[] = [
  { imagePath: '/images/howToUse/skin.png', text: 'howToUse.main.item1' },
  { imagePath: '/images/howToUse/acne.png', text: 'howToUse.main.item2' },
  { imagePath: '/images/howToUse/butt.png', text: 'howToUse.main.item3' },
  { imagePath: '/images/howToUse/acne2.png', text: 'howToUse.main.item4' },
  { imagePath: '/images/howToUse/surgery.png', text: 'howToUse.main.item5' },
  { imagePath: '/images/howToUse/blood.png', text: 'howToUse.main.item6' },
];

export const howToUseHairItemList: HowToUseItem[] = [
  { imagePath: '/images/howToUse/hair1.png', text: 'howToUse.hair.item1' },
  { imagePath: '/images/howToUse/hair2.png', text: 'howToUse.hair.item2' },
  { imagePath: '/images/howToUse/hair3.png', text: 'howToUse.hair.item3' },
  { imagePath: '/images/howToUse/hair4.png', text: 'howToUse.hair.item4' },
  { imagePath: '/images/howToUse/hair5.png', text: 'howToUse.hair.item5' },
  { imagePath: '/images/howToUse/hair6.png', text: 'howToUse.hair.item6' },
];

export const howToUseGelItemList: HowToUseItem[] = [
  { imagePath: '/images/howToUse/skin.png', text: 'howToUse.gel.item1' },
  { imagePath: '/images/howToUse/gel2.png', text: 'howToUse.gel.item2' },
  { imagePath: '/images/howToUse/gel3.png', text: 'howToUse.gel.item3' },
  { imagePath: '/images/howToUse/gel4.png', text: 'howToUse.gel.item4' },
  { imagePath: '/images/howToUse/gel5.png', text: 'howToUse.gel.item5' },
];

export const eventBulletsItemList: EventBulletItem[] = [
  {
    imagePath: '/images/event-bullets/bulb.svg',
    text: 'eventBullets.item1',
  },
  {
    imagePath: '/images/event-bullets/stairs.svg',
    text: 'eventBullets.item2',
  },
  {
    imagePath: '/images/event-bullets/messages.svg',
    text: 'eventBullets.item3',
  },
  {
    imagePath: '/images/event-bullets/distributor.svg',
    text: 'eventBullets.item4',
  },
];

export const languageSwitchItemList: LanguageSwitchItem[] = [
  { imageUrl: '/languageSwitch/en.svg', url: '/en/' },
  { imageUrl: '/languageSwitch/en.svg', url: '/ru/' },
  { imageUrl: '/languageSwitch/en.svg', url: '/he/' },
];

export const solutionItems: SolutionItem[] = [
  {
    imageUrl: '/images/solution/item1.png',
    title: 'solution.main.item1title',
    text: [
      'solution.main.item1textP1',
      'solution.main.item1textP2',
      'solution.main.item1textP3',
      'solution.main.item1textP4',
      'solution.main.item1textP5',
      'solution.main.item1textP6',
    ],
  },
  {
    imageUrl: '/images/solution/item2.png',
    title: 'solution.main.item2title',
    column: true,
    text: [
      'solution.main.item2textP1',
      'solution.main.item2textP2',
      'solution.main.item2textP3',
      'solution.main.item2textP4',
      'solution.main.item2textP5',
    ],
  },
  {
    imageUrl: '/images/solution/item1.png',
    title: 'solution.main.item1title',
    text: [
      'solution.main.item1textP1',
      'solution.main.item1textP2',
      'solution.main.item1textP3',
      'solution.main.item1textP4',
      'solution.main.item1textP5',
      'solution.main.item1textP6',
    ],
  },
  {
    imageUrl: '/images/solution/item2.png',
    title: 'solution.main.item2title',
    column: true,
    text: [
      'solution.main.item2textP1',
      'solution.main.item2textP2',
      'solution.main.item2textP3',
      'solution.main.item2textP4',
      'solution.main.item2textP5',
    ],
  },
];

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const courses = [
  {
    id: 0,
    key: 'course1',
    colorKey: 'from-[#c4a764] to-[#a68a4d]',
    image: '/images/courses/card1.png',
  },
  {
    id: 1,
    key: 'course2',
    colorKey: 'from-[#dfba74] to-[#be800c]',
    image: '/images/courses/card2.png',
  },
  {
    id: 2,
    key: 'course3',
    colorKey: 'from-[#be800c] to-[#9a6600]',
    image: '/images/courses/card3.png',
  },
];

export  const variantToIndex: Record<WorkshopVariant, number> = {
  '990': 0,
  '180': 1,
  '480': 2,
};

export const inviteBulletsItemList: InviteBulletItem[] = [
  {
    imagePath: '/images/icons/award.svg',
    alt: 'award icon on yellow background',
    title: 'inviteEventSection.item1.title',
    text: 'inviteEventSection.item1.text',
  },
  {
    imagePath: '/images/icons/users.svg',
    alt: 'users icon on yellow background',
    title: 'inviteEventSection.item2.title',
    text: 'inviteEventSection.item2.text',
  },
  {
    imagePath: '/images/icons/bookOpened.svg',
    alt: 'opened book icon on yellow background',
    title: 'inviteEventSection.item3.title',
    text: 'inviteEventSection.item3.text',
  },
  {
    imagePath: '/images/icons/micro.svg',
    alt: 'microscope icon on yellow background',
    title: 'inviteEventSection.item4.title',
    text: 'inviteEventSection.item4.text',
  }
]

export const indexToVariant: WorkshopVariant[] = ['990', '180', '480'];

export const stats: StatItem[] = [
  { icon: 'award.svg', value: 15, suffix: '+', labelKey: 'years' },
  { icon: 'briefcase.svg', value: 50, suffix: '+', labelKey: 'workshops' },
  {
    icon: 'trendingup.svg',
    value: 98,
    suffix: '%',
    labelKey: 'satisfaction',
  },
];
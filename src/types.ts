export type LanguageType = 'en-US' | 'he-IL' | 'ru-RU';
export type LocaleType = 'en' | 'he' | 'ru';

export interface NavItem {
  text: string;
  scrollId?: ScrollItems;
  url?: string;
  form?: 'main' | 'event';
}

export interface HowToUseItem {
  imagePath: string;
  text: string;
}

export interface AboutBulletItem {
  data: string;
  text: string;
}

export interface LanguageSwitchItem {
  imageUrl: string;
  url: string;
}

export interface SolutionItem {
  imageUrl: string;
  title: string;
  text: string[];
}

export interface FormDataType {
  name: { value: string; isValid: boolean };
  email: { value: string; isValid: boolean };
  phone: { value: string; isValid: boolean };
  profession: { value: string; isValid: boolean };
  gender?: { value: 1 | 2 };
}

export enum ScrollItems {
  gallery = 'gallery',
  solution = 'solution',
  mission = 'mission',
  about = 'about',
  agenda = 'agenda',
}

export type ModalType = 'form' | 'privatePolicy' | 'accessibility';

export interface ReviewType {
  name: string;
  rating: number;
  text: string;
}

export interface EventBulletItem {
  imagePath: string;
  text: string;
}

export type FormType = 'event' | 'main';

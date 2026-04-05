import { create } from 'zustand';
import { ModalType, DiscountModifier, WorkshopVariant, Event } from '@/types';

interface RootState {
  modalIsOpen: boolean;
  toggleModal: (value: boolean) => void;
  isScrolled: boolean;
  setIsScrolled: (value: boolean) => void;
  galleryPage: number;
  setGalleryPage: (page: number) => void;
  introPage: number;
  setIntroPage: (page: number) => void;
  modalContent: ModalType;
  setModalContent: (arg: ModalType) => void;
  numberOfTickets: number;
  setNumberOfTickets: (arg: number) => void;
  discountModifier: DiscountModifier;
  setDiscountModifier: (arg: DiscountModifier) => void;
  courseVariant: WorkshopVariant;
  setCourseVariant: (arg: WorkshopVariant) => void;
  showStickyBar: boolean;
  setShowStickyBar: (value: boolean) => void;
  selectedEvent: Event | null;
  setSelectedEvent: (arg: Event | null) => void;
}

const useAppStore = create<RootState>((set) => ({
  modalIsOpen: false,
  toggleModal: () =>
    set((state) => ({ modalIsOpen: (state.modalIsOpen = !state.modalIsOpen) })),
  isScrolled: false,
  setIsScrolled: (value) =>
    set((state) => ({ isScrolled: (state.isScrolled = value) })),
  galleryPage: 0,
  setGalleryPage: (page: number) =>
    set((state) => ({ galleryPage: (state.galleryPage = page) })),
  introPage: 0,
  setIntroPage: (page: number) =>
    set((state) => ({ introPage: (state.introPage = page) })),
  modalContent: 'privatePolicy',
  setModalContent: (arg: ModalType) =>
    set((state) => ({ modalContent: (state.modalContent = arg) })),
  numberOfTickets: 1,
  setNumberOfTickets: (arg: number) =>
    set((state) => ({ numberOfTickets: (state.numberOfTickets = arg) })),
  discountModifier: 1,
  setDiscountModifier: (arg: DiscountModifier) =>
    set((state) => ({ discountModifier: (state.discountModifier = arg) })),
  courseVariant: '990',
  setCourseVariant: (arg: WorkshopVariant) =>
    set((state) => ({ courseVariant: (state.courseVariant = arg) })),
  showStickyBar: false,
  setShowStickyBar: (value: boolean) =>
    set((state) => ({ showStickyBar: (state.showStickyBar = value) })),
  selectedEvent: null,
  setSelectedEvent: (arg: Event | null) =>
    set((state) => ({ selectedEvent: (state.selectedEvent = arg) })),
}));

export default useAppStore;

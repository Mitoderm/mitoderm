import { create } from 'zustand';
import { FormType, ModalType } from '@/types';

interface RootState {
  isFirstRender: boolean;
  setIsFirstRender: (value: boolean) => void;
  modalIsOpen: boolean;
  toggleModal: (value: boolean) => void;
  galleryPage: number;
  setGalleryPage: (page: number) => void;
  reviewPage: number;
  setReviewPage: (page: number) => void;
  modalContent: ModalType;
  setModalContent: (arg: ModalType) => void;
  formCategory: FormType;
  setFormCategory: (arg: FormType) => void;
  numberOfTickets: number;
  setNumberOfTickets: (arg: number) => void;
  isDiscounted: boolean;
  setIsDiscounted: (arg: boolean) => void;
}

const useAppStore = create<RootState>((set) => ({
  isFirstRender: true,
  setIsFirstRender: (value) =>
    set((state) => ({ isFirstRender: (state.isFirstRender = value) })),
  modalIsOpen: false,
  toggleModal: () =>
    set((state) => ({ modalIsOpen: (state.modalIsOpen = !state.modalIsOpen) })),
  galleryPage: 0,
  setGalleryPage: (page: number) =>
    set((state) => ({ galleryPage: (state.galleryPage = page) })),
  reviewPage: 0,
  setReviewPage: (page: number) =>
    set((state) => ({ reviewPage: (state.reviewPage = page) })),
  modalContent: 'form',
  setModalContent: (arg: ModalType) =>
    set((state) => ({ modalContent: (state.modalContent = arg) })),
  formCategory: 'main',
  setFormCategory: (arg) =>
    set((state) => ({ formCategory: (state.formCategory = arg) })),
  numberOfTickets: 1,
  setNumberOfTickets: (arg: number) =>
    set((state) => ({ numberOfTickets: (state.numberOfTickets = arg) })),
  isDiscounted: false,
  setIsDiscounted: (arg: boolean) =>
    set((state) => ({ isDiscounted: (state.isDiscounted = arg) })),
}));

export default useAppStore;

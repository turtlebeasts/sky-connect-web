import { create } from "zustand";

const useModalStore = create((set) => ({
  modal: null,

  openModal: (type, data = null) =>
    set({
      modal: {
        type,
        data,
      },
    }),

  closeModal: () =>
    set({
      modal: null,
    }),
}));

export default useModalStore;

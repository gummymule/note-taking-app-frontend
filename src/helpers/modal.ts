export class ModalSuccessUtil {
  static modalRef: React.RefObject<{
    show: (message: string, onConfirm: () => void, title?: string) => void;
    hide: () => void;
  }> | null = null;

  static setModalRef(
    ref: React.RefObject<{
      show: (message: string, onConfirm: () => void, title?: string) => void;
      hide: () => void;
    }>
  ) {
    this.modalRef = ref;
  }

  static showModal(message = "", onConfirm: () => void = () => {}, title = "Yeay!") {
    this.modalRef?.current?.show(message, onConfirm, title);
  }

  static hideModal() {
    this.modalRef?.current?.hide();
  }
}

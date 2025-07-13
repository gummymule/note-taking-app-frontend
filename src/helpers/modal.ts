export class ModalLoadingUtil {
  static modalRef: React.RefObject<{ show: () => void; hide: () => void }> | null = null;

  static setModalRef(ref: React.RefObject<{ show: () => void; hide: () => void }>) {
    this.modalRef = ref;
  }

  static showModal() {
    this.modalRef?.current?.show();
  }

  static hideModal() {
    this.modalRef?.current?.hide();
  }
}

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

export class ModalErrorUtil {
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

  static showModal(message = "", onConfirm: () => void = () => {}, title = "Oops!") {
    this.modalRef?.current?.show(message, onConfirm, title);
  }

  static hideModal() {
    this.modalRef?.current?.hide();
  }
}

export class ModalConfirmationUtil {
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

  static showModal(message = "", onConfirm: () => void = () => {}, title = "Attention!") {
    this.modalRef?.current?.show(message, onConfirm, title);
  }

  static hideModal() {
    this.modalRef?.current?.hide();
  }
}
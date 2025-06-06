import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { ModalSuccess } from "./success";
import { ModalSuccessUtil } from "@/helpers/modal";

interface ModalSuccessProps {
  open: boolean;
  description: string;
  onConfirm: () => void;
  title?: string;
}

const useRegisterModal = (
  ModalUtil: typeof ModalSuccessUtil,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalRef: React.RefObject<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { onShow, onHide }: { onShow: (...args: any[]) => void; onHide: () => void }
) => {
  useEffect(() => {
    ModalUtil.setModalRef(modalRef);
  }, [ModalUtil, modalRef]);

  useImperativeHandle(
    modalRef,
    () => ({
      show: onShow,
      hide: onHide,
    }),
    [onHide, onShow]
  );
};

export const ModalGlobal: React.FC = () => {
  const [modalSuccessProps, setModalSuccessProps] = useState<ModalSuccessProps>({
    open: false,
    description: "",
    onConfirm: () => {},
    title: "Yeay!",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modalSuccessRef = useRef<{ show: (...args: any[]) => void; hide: () => void }>(null);

  const _closeModalSuccess = () => setModalSuccessProps((prev) => ({ ...prev, open: false }));

  useRegisterModal(ModalSuccessUtil, modalSuccessRef, {
    onShow: (message: string, onConfirm: () => void, title?: string) =>
      setModalSuccessProps({
        open: true,
        description: message,
        onConfirm,
        title: title || "Yeay!",
      }),
    onHide: _closeModalSuccess,
  });

  return <ModalSuccess onClose={_closeModalSuccess} {...modalSuccessProps} />;
};

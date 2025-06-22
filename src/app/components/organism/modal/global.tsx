/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { ModalSuccess } from "./success";
import { ModalLoading } from "./loading"; // make sure this exists
import { ModalSuccessUtil, ModalLoadingUtil, ModalErrorUtil } from "@/helpers/modal";
import { ModalError } from "./error";

interface ModalLoadingProps {
  open: boolean;
  onClose?: () => void;
  description?: string;
}

interface ModalSuccessProps {
  open: boolean;
  description: string;
  onConfirm: () => void;
  title?: string;
}

interface ModalErrorProps {
  open: boolean;
  description: string;
  onConfirm: () => void;
  title?: string;
}

const useRegisterModal = (
  ModalUtil: any,
  modalRef: React.RefObject<any>,
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
    [onShow, onHide]
  );
};

export const ModalGlobal: React.FC = () => {
  // Loading Modal
  const [modalLoadingProps, setModalLoadingProps] = useState<ModalLoadingProps>({
    open: false,
    description: "Please wait...",
  });
  const modalLoadingRef = useRef<{ show: () => void; hide: () => void }>(null);
  const _closeModalLoading = () => setModalLoadingProps((prev) => ({ ...prev, open: false }));

  useRegisterModal(ModalLoadingUtil, modalLoadingRef, {
    onShow: () => setModalLoadingProps((prev) => ({ ...prev, open: true })),
    onHide: _closeModalLoading,
  });

  // Success Modal
  const [modalSuccessProps, setModalSuccessProps] = useState<ModalSuccessProps>({
    open: false,
    description: "",
    onConfirm: () => {},
    title: "Yeay!",
  });
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

  // Error Modal
  const [modalErrorProps, setModalErrorProps] = useState<ModalErrorProps>({
    open: false,
    description: "",
    onConfirm: () => {},
    title: "Yeay!",
  });
  const modalErrorRef = useRef<{ show: (...args: any[]) => void; hide: () => void }>(null);
  const _closeModalError = () => setModalErrorProps((prev) => ({ ...prev, open: false }));

  useRegisterModal(ModalErrorUtil, modalErrorRef, {
    onShow: (message: string, onConfirm: () => void, title?: string) =>
      setModalErrorProps({
        open: true,
        description: message,
        onConfirm,
        title: title || "Yeay!",
      }),
    onHide: _closeModalError,
  });

  return (
    <>
      <ModalLoading onClose={_closeModalLoading} {...modalLoadingProps} />
      <ModalSuccess onClose={_closeModalSuccess} {...modalSuccessProps} />
      <ModalError onClose={_closeModalError} {...modalErrorProps} />
    </>
  );
};

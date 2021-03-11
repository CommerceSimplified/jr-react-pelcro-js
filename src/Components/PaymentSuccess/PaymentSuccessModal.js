import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter
} from "../../SubComponents/Modal";
import Authorship from "../common/Authorship";
import { PaymentSuccessView } from "./PaymentSuccessView";

export function PaymentSuccessModal({ onDisplay, onClose, product }) {
  useEffect(() => {
    window.Pelcro.insight.track("Modal Displayed", {
      name: "success"
    });

    onDisplay?.();
  });

  return (
    <Modal
      id="pelcro-payment-success-modal"
      className="plc-border-t-8 plc-border-green-500 "
    >
      <ModalBody>
        <PaymentSuccessView onClose={onClose} product={product} />
      </ModalBody>
      <ModalFooter>
        <Authorship></Authorship>
      </ModalFooter>
    </Modal>
  );
}

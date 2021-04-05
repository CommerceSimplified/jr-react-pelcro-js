import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "../../SubComponents/Link";
import {
  Modal,
  ModalBody,
  ModalFooter
} from "../../SubComponents/Modal";
import Authorship from "../common/Authorship";
import { RegisterView } from "./RegisterView";

export function RegisterModal({ setView, onClose, ...otherProps }) {
  const { t } = useTranslation("register");

  const displayLoginView = () => {
    setView("login");
  };

  const displaySelectView = () => {
    setView("select");
  };

  return (
    <Modal
      hideCloseButton={!window.Pelcro.paywall.displayCloseButton()}
      onClose={onClose}
      id="pelcro-register-modal"
    >
      <ModalBody>
        <RegisterView {...otherProps} />
      </ModalBody>
      <ModalFooter>
        <div>
          {t("messages.alreadyHaveAccount") + " "}
          <Link onClick={displayLoginView}>
            {t("messages.loginHere")}
          </Link>
        </div>
        <div>
          {" " + t("messages.selectPlan")}
          <Link onClick={displaySelectView}>
            {t("messages.here")}
          </Link>
        </div>
        <Authorship />
      </ModalFooter>
    </Modal>
  );
}

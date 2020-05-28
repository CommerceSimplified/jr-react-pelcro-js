import React from "react";
import { useTranslation } from "react-i18next";

import Header from "../common/Header";
import Authorship from "../common/Authorship";

import { SubscriptionRenewView } from "./SubscriptionRenewView";

export function SubscriptionRenewModal({
  logout,
  plan,
  subscriptionIdToRenew,
  giftRecipient,
  product,
  isGift,
  onFailure,
  onSuccess,
  setView
}) {
  const { t } = useTranslation("messages");

  return (
    <div className="pelcro-prefix-view">
      <div
        className="pelcro-prefix-modal modal pelcro-prefix-fade pelcro-prefix-show"
        id="pelcro-view-payment"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="pelcro-prefix-modal-dialog pelcro-prefix-modal-dialog-centered"
          role="document"
        >
          <div className="pelcro-prefix-modal-content">
            <Header
              closeButton={window.Pelcro.paywall.displayCloseButton()}
              resetView={() => setView("")}
              site={window.Pelcro.site.read()}
            ></Header>

            <div className="pelcro-prefix-modal-body">
              <SubscriptionRenewView
                plan={plan}
                subscriptionIdToRenew={subscriptionIdToRenew}
                giftRecipient={giftRecipient}
                product={product}
                isGift={isGift}
                onFailure={onFailure}
                onSuccess={onSuccess}
              />
            </div>
            <div className="pelcro-prefix-modal-footer">
              <small>
                {t("haveQuestion")} {t("visitOurFaq.visitOur")}{" "}
                <a
                  className="pelcro-prefix-link"
                  target="new"
                  href="https://www.pelcro.com/faq/user"
                >
                  {t("visitOurFaq.faq")}
                </a>
                . {t("cancel")}
                {" " + t("logout.logout")}{" "}
                <button
                  className="pelcro-prefix-link"
                  onClick={logout}
                >
                  {t("logout.here")}
                </button>
              </small>
              <Authorship></Authorship>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
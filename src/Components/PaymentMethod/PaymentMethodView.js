import React from "react";
import {
  PelcroCardNumber,
  PelcroCardExpiry,
  PelcroCardCVC
} from "../../components";
import { useTranslation } from "react-i18next";
import { DiscountedPrice } from "./DiscountedPrice";
import { PaymentMethodContainer } from "./PaymentMethodContainer";
import { SubmitPaymentMethod } from "./SubmitPaymentMethod";
import { CouponCode } from "./CouponCode";

export function PaymentMethodView({
  couponCode,
  successMessage,
  ReactGA,
  showCoupon,
  type,
  subscriptionIdToRenew,
  giftRecipient = null,
  plan,
  product,
  onSuccess,
  onFailure,
  order = {}
}) {
  const { t } = useTranslation("checkoutForm");

  return (
    <PaymentMethodContainer
      type={type}
      successMessage={successMessage}
      ReactGA={ReactGA}
      subscriptionIdToRenew={subscriptionIdToRenew}
      giftRecipient={giftRecipient}
      plan={plan}
      product={product}
      couponCode={couponCode}
      onSuccess={onSuccess}
      onFailure={onFailure}
      order={order}
    >
      <div className="pelcro-prefix-form">
        <div className="pelcro-prefix-row">
          <div className="col-md-12">
            <label className="pelcro-prefix-label">
              {t("labels.card")} *
            </label>
            <PelcroCardNumber />
            <img
              alt="credit_cards"
              className={`pelcro-prefix-payment-icons`}
              src="https://js.pelcro.com/ui/plugin/main/images/credit_cards.png"
            />
          </div>

          <div className="col-md-6">
            <label className="pelcro-prefix-label">
              {t("labels.date")} *
            </label>
            <PelcroCardExpiry />
          </div>

          <div className="col-md-6">
            <label className="pelcro-prefix-label">
              {t("labels.CVC")} *
            </label>
            <PelcroCardCVC />
          </div>

          <div className="col-md-12">
            <small className="pelcro-footnote form-text">
              * {t("labels.required")}
            </small>

            <CouponCode showCoupon={showCoupon} />
            <DiscountedPrice />

            <SubmitPaymentMethod name={t("labels.submit")} />
          </div>
        </div>
      </div>
    </PaymentMethodContainer>
  );
}

import React from "react";
import { useTranslation } from "react-i18next";
import { GiftCreateContainer } from "./GiftCreateContainer";
import { GiftCreateSubmitButton } from "./GiftCreateSubmitButton";
import { GiftCreateEmail } from "./GiftCreateEmail";
import { GiftCreateFirstName } from "./GiftCreateFirstName";
import { GiftCreateLastName } from "./GiftCreateLastName";
import { AlertWithContext } from "../../SubComponents/AlertWithContext";

export const GiftCreateView = (props) => {
  const { t } = useTranslation("register");
  return (
    <div id="pelcro-gift-create-view">
      <div className="flex flex-col items-center text-lg font-semibold pelcro-title-wrapper">
        <h4>{t("gift.titles.firstTitle")}</h4>
      </div>
      <div className="mt-2 pelcro-form">
        <GiftCreateContainer {...props}>
          <AlertWithContext />
          <div className="flex gap-3">
            <GiftCreateFirstName
              autoComplete="first-name"
              id="pelcro-input-first-name"
              errorId="pelcro-input-first-name-error"
              placeholder={t("gift.labels.firstNamePlaceholder")}
              label={t("gift.labels.firstName")}
            />
            <GiftCreateLastName
              autoComplete="last-name"
              id="pelcro-input-last-name"
              errorId="pelcro-input-last-name-error"
              placeholder={t("gift.labels.lastNamePlaceholder")}
              label={t("gift.labels.lastName")}
            />
          </div>
          <div className="flex gap-3">
            <GiftCreateEmail
              id="pelcro-input-email"
              errorId="pelcro-input-email-error"
              placeholder={t("gift.labels.emailPlaceholder")}
              autoComplete="off"
              label={t("gift.labels.email")}
              required
            />
          </div>
          <p className="pelcro-footnote">
            * {t("gift.labels.required")}
          </p>
          <GiftCreateSubmitButton
            className="mt-2"
            name={t("gift.buttons.gift")}
            id="pelcro-submit"
          />
        </GiftCreateContainer>
      </div>
    </div>
  );
};

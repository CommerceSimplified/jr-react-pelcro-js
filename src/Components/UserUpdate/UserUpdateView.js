import React from "react";
import { useTranslation } from "react-i18next";
import { UserUpdateEmail } from "./UserUpdateEmail";
import { UserUpdateFirstName } from "./UserUpdateFirstName";
import { UserUpdateLastName } from "./UserUpdateLastName";
import { UserUpdatePhone } from "./UserUpdatePhone";
import { UserUpdateButton } from "./UserUpdateButton";
import { UserUpdateContainer } from "./UserUpdateContainer";
import { AlertWithContext } from "../../SubComponents/AlertWithContext";

export const UserUpdateView = (props) => {
  const { t } = useTranslation("userEdit");

  return (
    <div id="pelcro-user-update-view">
      <div className="flex flex-col items-center text-lg font-semibold pelcro-title-wrapper">
        <h4>{t("labels.title")}</h4>
        <p>{t("labels.subtitle")}</p>
      </div>
      <div className="mt-2 pelcro-form">
        <UserUpdateContainer {...props}>
          <AlertWithContext />
          <div className="flex gap-3">
            <UserUpdateEmail
              placeholder={t("labels.email")}
              label={t("labels.email")}
            />
          </div>
          <div className="flex gap-3">
            <UserUpdateFirstName
              autoComplete="first-name"
              id="pelcro-input-first-name"
              errorId="pelcro-input-first-name-error"
              placeholder={t("labels.firstName")}
              label={t("labels.firstName")}
            />
            <UserUpdateLastName
              autoComplete="last-name"
              id="pelcro-input-last-name"
              errorId="pelcro-input-last-name-error"
              placeholder={t("labels.lastName")}
              label={t("labels.lastName")}
            />
          </div>
          <div className="flex gap-3">
            <UserUpdatePhone
              id="pelcro-input-phone"
              errorId="pelcro-input-phone-error"
              placeholder={t("labels.phone")}
              label={t("labels.phone")}
            />
          </div>
          <p className="pelcro-footnote">* {t("labels.required")}</p>
          <UserUpdateButton
            className="mt-2"
            name={t("labels.submit")}
            id="pelcro-submit"
          />
        </UserUpdateContainer>
      </div>
    </div>
  );
};

import React, { useContext, useCallback } from "react";
import { store } from "./SubscriptionManageMembersContainer";
import { useTranslation } from "react-i18next";
import {
  UPDATE_REMOVE_MEMBER_ID,
  HANDLE_REMOVE_MEMBER
} from "../../utils/action-types";
import { ReactComponent as CheckMarkIcon } from "../../assets/check-mark.svg";
import { ReactComponent as ExclamationIcon } from "../../assets/exclamation.svg";
import { ReactComponent as XCircleIcon } from "../../assets/x-icon-solid.svg";
import { Button, Tooltip } from "../../components";

export function SubscriptionManageMembersList(props) {
  const { t } = useTranslation("subscriptionManageMembers");

  const {
    dispatch,
    state: { members, removeMemberId, loading }
  } = useContext(store);

  const getMemberStatus = useCallback((sub) => {
    if (sub.status === "pending") {
      return {
        title: sub.status,
        content: sub.status,
        textColor: "plc-text-yellow-500",
        bgColor: "plc-bg-yellow-100",
        icon: <ExclamationIcon />
      };
    }

    return {
      title: sub.status,
      content: sub.status,
      textColor: "plc-text-green-700",
      bgColor: "plc-bg-green-100",
      icon: <CheckMarkIcon />
    };
  }, []);

  const showMemberData = useCallback((member) => {
    let data;
    if (member?.status !== "active") {
      data = member?.invitation_email;
      return data;
    }
    data =
      member?.customer?.email ||
      member?.customer?.first_name +
        " " +
        member?.customer?.last_name ||
      member?.customer?.username ||
      "-----";
    return data;
  }, []);

  if (loading) {
    return (
      <>
        <tr>
          <td>
            <div className="plc-animate-pulse">
              <div className="plc-bg-gray-200 plc-h-6 plc-m-0.5 plc-rounded"></div>
            </div>
          </td>
          <td>
            <div className="plc-animate-pulse">
              <div className="plc-bg-gray-200 plc-h-6 plc-m-0.5 plc-rounded"></div>
            </div>
          </td>
          <td>
            <div className="plc-animate-pulse">
              <div className="plc-bg-gray-200 plc-h-6 plc-m-0.5 plc-rounded"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="plc-animate-pulse">
              <div className="plc-bg-gray-200 plc-h-6 plc-m-0.5 plc-rounded"></div>
            </div>
          </td>
          <td>
            <div className="plc-animate-pulse">
              <div className="plc-bg-gray-200 plc-h-6 plc-m-0.5 plc-rounded"></div>
            </div>
          </td>
          <td>
            <div className="plc-animate-pulse">
              <div className="plc-bg-gray-200 plc-h-6 plc-m-0.5 plc-rounded"></div>
            </div>
          </td>
        </tr>
      </>
    );
  }

  const onRemoveClick = (id) => {
    dispatch({ type: UPDATE_REMOVE_MEMBER_ID, payload: id });
    dispatch({ type: HANDLE_REMOVE_MEMBER });
  };

  return (
    <>
      {members?.map((member) => (
        <tr
          key={member.id}
          className={`plc-w-full plc-align-middle plc-cursor-pointer accordion-header hover:plc-bg-gray-50 plc-text-center`}
        >
          <td
            className="plc-truncate plc-text-left"
            title={showMemberData(member)}
          >
            <span className="plc-font-semibold plc-text-gray-500">
              {showMemberData(member)}
            </span>
          </td>
          <td className="plc-py-2">
            {/* Pill */}
            <span
              className={`plc-inline-flex plc-p-1 plc-text-xs plc-font-semibold ${
                getMemberStatus(member).bgColor
              } plc-uppercase ${
                getMemberStatus(member).textColor
              } plc-rounded-lg`}
            >
              {getMemberStatus(member).icon}
              {getMemberStatus(member).title}
            </span>
          </td>
          <td>
            <Button
              variant="ghost"
              className="plc-text-red-500 focus:plc-ring-red-500 pelcro-dashboard-sub-cancel-button"
              icon={<XCircleIcon />}
              onClick={() => onRemoveClick(member.id)}
              disabled={member.id === removeMemberId}
              isLoading={member.id === removeMemberId}
              data-key={member.id}
            >
              {t("labels.remove")}
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}

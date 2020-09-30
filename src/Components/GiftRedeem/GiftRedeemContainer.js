import React, { createContext, useEffect } from "react";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update
} from "use-reducer-with-side-effects";
import {
  SET_GIFT_CODE,
  HANDLE_SUBMIT,
  DISABLE_SUBMIT
} from "../../utils/action-types";
import { showError } from "../../utils/showing-error";

const initialState = {
  giftCode: "",
  buttonDisabled: true
};
const store = createContext(initialState);
const { Provider } = store;

const GiftRedeemContainer = ({
  style,
  className,
  onSuccess = () => {},
  onFailure = () => {},
  onDisplay = () => {},
  children
}) => {
  useEffect(() => {
    onDisplay();
  }, []);

  const handleRedeem = ({ giftCode }, dispatch) => {
    if (!giftCode) {
      onFailure();
      return showError(
        "Please enter a gift code.",
        "pelcro-error-redeem"
      );
    }

    return onSuccess(giftCode);
  };

  const [state, dispatch] = useReducerWithSideEffects(
    (state, action) => {
      switch (action.type) {
        case SET_GIFT_CODE:
          return Update({
            ...state,
            giftCode: action.payload
          });

        case DISABLE_SUBMIT:
          return Update({ ...state, buttonDisabled: action.payload });
        case HANDLE_SUBMIT:
          return UpdateWithSideEffect(
            { ...state, buttonDisabled: true },
            (state, dispatch) => handleRedeem(state, dispatch)
          );
        default:
          return state;
      }
    },
    initialState
  );

  return (
    <div style={{ ...style }} className={className}>
      <Provider value={{ state, dispatch }}>
        {children.length
          ? children.map((child, i) =>
              React.cloneElement(child, { store, key: i })
            )
          : React.cloneElement(children, { store })}
      </Provider>
    </div>
  );
};

export { GiftRedeemContainer, store };

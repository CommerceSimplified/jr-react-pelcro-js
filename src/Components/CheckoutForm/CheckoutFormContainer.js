import React, { createContext, useReducer } from "react";
import { injectStripe } from "react-stripe-elements";
import {
  DISABLE_SUBMIT,
  CREATE_PAYMENT,
  SUBMIT_PAYMENT,
  SET_TOKEN
} from "../../utils/action-types";
import { getErrorMessages } from "../common/Helpers";
import { showError, showSuccess } from "../../utils/showing-error";

const initialState = {
  disableSubmit: false,
  token: null
};
const store = createContext(initialState);
const { Provider } = store;

const displayError = message => {
  showError(message, "pelcro-error-payment-create");
};

const displaySuccess = message => {
  console.log("will show success message: ", message);
  showSuccess(message, "pelcro-success-payment-create");
};

const CheckoutFormContainerWithoutStripe = ({
  style,
  className,
  children,
  ReactGA,
  successMessage,
  stripe
}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case DISABLE_SUBMIT:
        return { ...state, disableSubmit: action.payload };

      case CREATE_PAYMENT:
        window.Pelcro.source.create(
          {
            auth_token: window.Pelcro.user.read().auth_token,
            token: action.payload.id
          },
          err => {
            if (err) return displayError(getErrorMessages(err));

            console.log("will display success message");

            ReactGA.event({
              category: "ACTIONS",
              action: "Updated Payment",
              nonInteraction: true
            });
            displaySuccess(successMessage);
            return { ...state, disableSubmit: true };
          }
        );
        return { ...state, disableSubmit: true };

      case SUBMIT_PAYMENT:
        stripe.createToken().then(({ token, error }) => {
          if (error) {
            showError(error.message);
            return { ...state, disableSubmit: false };
          } else if (token) {
            return { ...state, token, disableSubmit: false };
          }
        });
        return { ...state, disableSubmit: true };

      default:
        throw new Error();
    }
  }, initialState);

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

const CheckoutFormContainer = injectStripe(CheckoutFormContainerWithoutStripe);

export { CheckoutFormContainer, store };

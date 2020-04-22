import React, { createContext, useEffect } from "react";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";
import {
  SET_COUNTRY,
  DISABLE_SUBMIT,
  HANDLE_SUBMIT,
  SET_COUNTRIES,
  SET_STATES,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_TEXT_FIELD,
  SET_STATE,
} from "../../utils/action-types";
import { getErrorMessages } from "../common/Helpers";
import { showError } from "../../utils/showing-error";

const initialState = {
  disableSubmit: false,
  firstName: "",
  lastName: "",
  line1: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  states: [],
  countries: [],
};
const store = createContext(initialState);
const { Provider } = store;

const AddressUpdateContainer = ({
  style,
  className,
  setView,
  type = "shipping",
  giftCode = false,
  product = null,
  onSuccess = () => {},
  children,
  addressId,
}) => {
  useEffect(() => {
    window.Pelcro.insight.track("Modal Displayed", {
      name: "address",
    });

    getAddressData();

    // document.addEventListener("keydown", submitAddress);

    return () => {
      //   document.removeEventListener("keydown", submitAddress);
    };
  }, []);

  const getAddressData = () => {
    const addresses = window.Pelcro.address.list();

    for (const address in addresses) {
      const thisAddress = addresses[address];

      if (+thisAddress.id === +addressId) {
        initialState["firstName"] = thisAddress.first_name;
        initialState["lastName"] = thisAddress.last_name;
        initialState["line1"] = thisAddress.line1;
        initialState["line2"] = thisAddress.line2;
        initialState["city"] = thisAddress.city;
        initialState["state"] = thisAddress.state;
        initialState["country"] = thisAddress.country;
        initialState["postalCode"] = thisAddress.postal_code;
      }
    }
  };

  const submitAddress = (
    { firstName, lastName, line1, line2, city, state, country, postalCode },
    dispatch
  ) => {
    dispatch({ type: DISABLE_SUBMIT, payload: true });

    window.Pelcro.address.update(
      {
        address_id: addressId,
        auth_token: window.Pelcro.user.read().auth_token,
        type: type,
        first_name: firstName,
        last_name: lastName,
        line1: line1,
        city: city,
        state: state,
        country: country,
        postal_code: postalCode,
      },
      (err, res) => {
        if (err) {
          dispatch({ type: DISABLE_SUBMIT, payload: false });
          return showError(getErrorMessages(err), "pelcro-error-address");
        }

        if (giftCode) {
          let addressId = null;

          if (window.Pelcro.user.read().addresses) {
            addressId = window.Pelcro.user.read().addresses[0].id;
          }

          window.Pelcro.subscription.redeemGift(
            {
              auth_token: window.Pelcro.user.read().auth_token,
              gift_code: giftCode,
              address_id: addressId,
            },
            (err, res) => {
              dispatch({ type: DISABLE_SUBMIT, payload: false });

              if (err) {
                return showError(getErrorMessages(err), "pelcro-error-address");
              }

              alert("You've subscription has been redeeemed.");
              return setView("");
            }
          );
        } else {
          dispatch({ type: DISABLE_SUBMIT, payload: false });
          onSuccess();
        }
      }
    );
  };

  const [state, dispatch] = useReducerWithSideEffects((state, action) => {
    switch (action.type) {
      case SET_COUNTRY:
        return Update({ ...state, country: action.payload });

      case SET_STATE:
        return Update({ ...state, state: action.payload });

      case DISABLE_SUBMIT:
        return Update({ ...state, DISABLE_SUBMIT: action.payload });

      case SET_COUNTRIES:
        return Update({ ...state, countries: action.payload });

      case SET_FIRST_NAME:
        return Update({ ...state, firstName: action.payload });

      case SET_LAST_NAME:
        return Update({ ...state, lastName: action.payload });

      case SET_STATES:
        return Update({ ...state, states: action.payload });

      case SET_TEXT_FIELD:
        return Update({
          ...state,
          ...action.payload,
        });

      case HANDLE_SUBMIT:
        return UpdateWithSideEffect(
          { ...state, disableSubmit: true },
          (state, dispatch) => submitAddress(state, dispatch)
        );
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

export { AddressUpdateContainer, store };
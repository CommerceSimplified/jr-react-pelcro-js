import React, { createContext } from "react";
import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_EMAIL_ERROR,
  SET_PASSWORD_ERROR,
  RESET_LOGIN_FORM,
  SET_CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_USED,
  SET_CONFIRM_PASSWORD_ERROR,
  HANDLE_REGISTRATION,
  DISABLE_REGISTRATION_BUTTON,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_TEXT_FIELD
} from "../../utils/action-types";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update
} from "use-reducer-with-side-effects";
import { showError } from "../../utils/showing-error";
import { getErrorMessages } from "../common/Helpers";

const initialState = {
  email: "",
  password: "",
  emailError: null,
  passwordError: null,
  confirmPassword: "",
  confirmPasswordError: null,
  confirmPasswordUsed: false,
  buttonDisabled: true,
  firstName: null,
  lastName: null
};
const store = createContext(initialState);
const { Provider } = store;

const RegisterContainer = ({
  style,
  className,
  onSuccess = () => {},
  onFailure = () => {},
  children
}) => {
  const handleRegister = (
    {
      email,
      password,
      firstName,
      lastName,
      organization = "",
      jobTitle = ""
    },
    dispatch
  ) => {
    window.Pelcro.user.register(
      {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        metadata: { organization, jobTitle }
      },
      (err, res) => {
        dispatch({
          type: DISABLE_REGISTRATION_BUTTON,
          payload: false
        });

        if (err) {
          onFailure(err);
          return showError(
            getErrorMessages(err),
            "pelcro-error-register"
          );
        } else {
          onSuccess();
        }
      }
    );
  };

  const [state, dispatch] = useReducerWithSideEffects(
    (state, action) => {
      switch (action.type) {
        case SET_EMAIL:
          return Update({
            ...state,
            email: action.payload,
            emailError: null
          });
        case SET_PASSWORD:
          return Update({
            ...state,
            password: action.payload,
            passwordError: null
          });

        case SET_FIRST_NAME:
          return Update({
            ...state,
            firstName: action.payload
          });

        case SET_LAST_NAME:
          return Update({
            ...state,
            lastName: action.payload
          });

        case SET_TEXT_FIELD:
          return Update({
            ...state,
            ...action.payload
          });

        case SET_CONFIRM_PASSWORD:
          return Update({
            ...state,
            confirmPassword: action.payload,
            confirmPasswordError: null
          });
        case SET_EMAIL_ERROR:
          return Update({
            ...state,
            emailError: action.payload,
            email: ""
          });
        case SET_PASSWORD_ERROR:
          return Update({
            ...state,
            passwordError: action.payload,
            password: ""
          });
        case SET_CONFIRM_PASSWORD_ERROR:
          return Update({
            ...state,
            confirmPasswordError: action.payload,
            confirmPassword: ""
          });
        case CONFIRM_PASSWORD_USED:
          return Update({
            ...state,
            confirmPasswordUsed: action.payload
          });
        case RESET_LOGIN_FORM:
          return initialState;

        case DISABLE_REGISTRATION_BUTTON:
          return Update({ ...state, buttonDisabled: action.payload });

        case HANDLE_REGISTRATION:
          return UpdateWithSideEffect(
            { ...state, buttonDisabled: true },
            (state, dispatch) => handleRegister(state, dispatch)
          );

        default:
          throw new Error();
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

export { RegisterContainer, store };

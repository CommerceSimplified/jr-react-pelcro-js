import React, { useContext } from "react";
import { Input } from "../../SubComponents/Input";
import {
  RESET_FIELD_ERROR,
  SET_TEXT_FIELD
} from "../../utils/action-types";
import { store } from "./AddressCreateContainer";

export function AddressCreatePostalCode(props) {
  const {
    dispatch,
    state: { postalCode, postalCodeError }
  } = useContext(store);

  const handleInputChange = (value) => {
    dispatch({
      type: SET_TEXT_FIELD,
      payload: { postalCode: value }
    });
  };

  const handleFocus = () => {
    dispatch({ type: RESET_FIELD_ERROR, payload: "postalCodeError" });
  };

  return (
    <Input
      type="text"
      autoComplete="postal-code"
      value={postalCode}
      error={postalCodeError}
      onChange={(e) => handleInputChange(e.target.value)}
      onFocus={handleFocus}
      {...props}
    />
  );
}

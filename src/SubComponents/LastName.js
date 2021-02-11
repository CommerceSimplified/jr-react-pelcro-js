import React, { useContext } from "react";
import { Loader } from "../SubComponents/Loader";
import { SET_LAST_NAME } from "../utils/action-types";
import { Input } from "./Input";

export function LastName({ store, ...otherProps }) {
  const { dispatch, state } = useContext(store);

  const handleInputChange = (value) => {
    dispatch({ type: SET_LAST_NAME, payload: value });
  };

  if (state.loading) {
    return (
      <div className="state-select-loader">
        <Loader />
      </div>
    );
  }

  return (
    <Input
      type="text"
      value={state.lastName}
      onChange={(e) => handleInputChange(e.target.value)}
      {...otherProps}
    />
  );
}

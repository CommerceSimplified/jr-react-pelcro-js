import React from "react";

export const getPaymentCardIcon = (name) => {
  const icons = {
    visa: (
      <svg
        className="plc-w-12"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <path d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 29.6875 19.40625 C 26.585938 19.40625 25 20.933594 25 22.875 C 25 26.386719 29.0625 25.914063 29.0625 27.71875 C 29.0625 28.023438 28.828125 28.75 27.125 28.75 C 25.417969 28.75 24.3125 28.09375 24.3125 28.09375 L 23.78125 30.46875 C 23.78125 30.46875 24.886719 31.09375 27 31.09375 C 29.113281 31.09375 32.03125 29.476563 32.03125 27.125 C 32.03125 24.296875 27.96875 24.074219 27.96875 22.8125 C 27.96875 22.167969 28.46875 21.6875 29.9375 21.6875 C 30.890625 21.6875 31.96875 22.40625 31.96875 22.40625 L 32.46875 19.96875 C 32.46875 19.96875 31.050781 19.40625 29.6875 19.40625 Z M 16.46875 19.625 L 13.78125 27.5625 C 13.78125 27.5625 13.597656 26.886719 13.53125 26.46875 C 11.996094 23.023438 9.5 21.75 9.5 21.75 L 11.875 30.75 L 15.125 30.75 L 19.625 19.625 Z M 20.78125 19.625 L 19.03125 30.75 L 22 30.75 L 23.78125 19.625 Z M 36.8125 19.625 L 31.96875 30.75 L 34.90625 30.75 L 35.5 29.15625 L 39.1875 29.15625 L 39.5 30.75 L 42.1875 30.75 L 39.90625 19.625 Z M 6.25 19.65625 C 6.25 19.65625 12.054688 21.453125 13.40625 25.8125 L 12.40625 20.75 C 12.40625 20.75 11.976563 19.65625 10.8125 19.65625 Z M 37.9375 22.84375 L 38.75 27.03125 L 36.3125 27.03125 Z" />
      </svg>
    ),
    mastercard: (
      <svg
        className="plc-w-12"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <path d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 17 13 C 10.382812 13 5 18.382812 5 25 C 5 31.617188 10.382812 37 17 37 C 20.078125 37 22.875 35.816406 25 33.90625 C 27.125 35.816406 29.925781 37 33 37 C 39.617188 37 45 31.617188 45 25 C 45 18.382812 39.617188 13 33 13 C 29.925781 13 27.125 14.183594 25 16.09375 C 22.875 14.183594 20.078125 13 17 13 Z M 33 15 C 38.535156 15 43 19.464844 43 25 C 43 30.535156 38.535156 35 33 35 C 30.449219 35 28.109375 34.066406 26.34375 32.5 C 27.996094 30.441406 29 27.839844 29 25 C 29 22.160156 27.996094 19.558594 26.34375 17.5 C 28.109375 15.933594 30.449219 15 33 15 Z M 33 15 " />
      </svg>
    ),
    "american express": (
      <svg
        className="plc-w-12"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <path d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 8.5625 19.90625 L 4.84375 28.40625 L 7.0625 28.40625 L 7.875 26.5 L 12.0625 26.5 L 12.875 28.40625 L 17.09375 28.40625 L 17.09375 22.09375 L 19.90625 28.40625 L 21.8125 28.40625 L 24.65625 22.1875 L 24.65625 28.40625 L 26.75 28.40625 L 26.75 19.90625 L 23.40625 19.90625 L 20.84375 25.625 L 18.28125 19.90625 L 15 19.90625 L 15 28.09375 L 11.34375 19.90625 Z M 29.5 19.90625 L 29.5 28.4375 L 37.5 28.4375 L 40 25.59375 L 42.46875 28.4375 L 45.125 28.4375 L 41.375 24.0625 L 45.125 19.90625 L 42.46875 19.90625 L 40.0625 22.5625 L 37.75 19.90625 Z M 9.90625 21.6875 L 11.21875 24.6875 L 8.65625 24.6875 Z M 31.5625 21.71875 L 36.65625 21.75 L 38.6875 24.0625 L 36.40625 26.625 L 31.5625 26.625 L 31.5625 24.9375 L 36.1875 24.9375 L 36.1875 23.3125 L 31.5625 23.3125 Z" />
      </svg>
    )
  };

  return (
    icons[name.toLowerCase()] ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="plc-w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    )
  );
};

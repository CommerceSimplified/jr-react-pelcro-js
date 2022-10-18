import React, { useState, useEffect } from "react";
import "./ToggleSwitch.css";

export const ToggleSwitch = ({ label, isActive, handleChange }) => {
  const [isToggled, setIsToggled] = useState(isActive ?? false);
  const onToggle = () => {
    setIsToggled(!isToggled);
    handleChange?.();
  };

  
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={onToggle}
      />
      <span className={`switch ${isToggled ? 'plc-bg-primary-200' : ''}`} />
    </label>
  );
};

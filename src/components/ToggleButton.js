import * as React from 'react';

const ToggleButton = (props) => {
  const { handleToggle, isChecked, type } = props;

  return (
    <>
      <input
        type={`checkbox`}
        id={`${type}`}
        checked={isChecked}
        onChange={handleToggle}
      />
      <label htmlFor={`${type}`}>BUTTON</label>
    </>
  );
};

export default ToggleButton;

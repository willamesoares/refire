import React from 'react';

import '../styles/Button.css';

const Button = ({
  className = '',
  text = '',
  onClickHandler = () => {},
  ...props
}) => {
  return (
    <button
      className={ `Button ${className}` }
      onClick={ onClickHandler }
      { ...props }
    >
      { text }
      { props.children }
    </button>
  );
}

export default Button;

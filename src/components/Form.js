import React from 'react';

import '../styles/Form.css';

const Form = ({
  buttons = [],
  className,
  error,
  inputs = [],
  onSubmitHandler,
  children
}) => {
  return (
    <form className={`Form ${className}`} onSubmit={ onSubmitHandler }>
      { inputs.length ? (
        <div className='Form-inputs'>
          {[ ...inputs ]}
        </div>
      ) : null }
      { buttons.length ? (
        <div className='Form-buttons'>
          {[ ...buttons ]}
        </div>
      ) : null }
      { children || null }
      { error ? <p className='Form-error'>{ error }</p> : null }
    </form>
  );
};

export default Form;

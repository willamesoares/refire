import React from 'react';

import '../styles/Form.css';

const Form = ({
  buttons = [],
  className,
  error,
  inputs = [],
  onSubmitHandler,
  ...props
}) => {
  return (
    <form className={`Form ${className}`} onSubmit={ onSubmitHandler }>
      <div className='Form-inputs'>
        {[ ...inputs ]}
      </div>
      <div className='Form-buttons'>
        {[ ...buttons ]}
      </div>
      { props.children || null }
      { error ? <p className='Form-error'>{ error }</p> : null }
    </form>
  );
};

export default Form;

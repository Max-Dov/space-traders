import React, { HTMLAttributes, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './input.styles.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  containerClassname?: string;
  label?: ReactNode;
  // radio input props below
  /**
   * For some reason HTMLInputElement does not have props for `type="radio"`, so listing them below.
   */
  name?: string;
  type?: 'text' | 'number' | 'radio';
  checked?: boolean;
}

export const Input = ({ label, onChange, id, containerClassname, name, type, ...inputProps }: InputProps) => {
  return <div className={classNames(
    'input-container',
    containerClassname,
    { 'radio-input-container': type === 'radio' }
  )}>
    {type !== 'radio'
      ? (<>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          {...inputProps}
          id={id}
          name={name}
          type={type}
          onChange={(e) => onChange?.(e.currentTarget.value)}
        />
      </>)
      : (<>
        {label && <label htmlFor={id}>{label}</label>}
        <div className="radio-input">
          <input
            {...inputProps}
            id={id}
            name={name}
            type={type}
            onChange={(e) => onChange?.(e.currentTarget.value)}
          />
        </div>
      </>)}
  </div>;
};
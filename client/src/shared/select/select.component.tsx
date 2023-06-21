import React, { ReactNode, useState } from 'react';
import './select.styles.scss';
import { Icon } from '@shared/icon/icon.component';

interface Option {
  label: ReactNode;
  key: string;
}

interface SelectProps {
  option: Option['key'] | null;
  options: Array<Option>;
  onOptionSelect: (optionKey: string | null) => void;
  placeholder: ReactNode;
}

export const Select = ({ options, onOptionSelect, option, placeholder }: SelectProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const selectedOption = options.find(existingOption => existingOption.key === option);

  return <div className="select-container">
    <button className="select-button" onClick={() => setIsExpanded(!isExpanded)}>
      {selectedOption
        ? <div>{selectedOption.label}</div>
        : <div className="placeholder">{placeholder}</div>}
      {selectedOption !== null &&
          <div aria-label="button" className="inline-button clean-input" onClick={(e) => {
            e.stopPropagation();
            onOptionSelect(null);
          }}>
              <Icon name="Backspace" />
          </div>}
      <Icon name="CaretDown" />
    </button>
    {isExpanded && <div className="options">
      {options.map(option => <button className="option" key={option.key} onClick={() => {
        onOptionSelect(option.key);
        setIsExpanded(false);
      }}>
        {option.label}
      </button>)}
    </div>}
  </div>;
};
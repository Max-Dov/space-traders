import React, { ReactNode, useEffect, useState } from 'react';
import './select.styles.scss';
import { Icon } from '@shared/icon/icon.component';

interface Option {
  label: ReactNode;
  key: string;
}

interface SelectProps {
  options: Array<Option>;
  onOptionSelect: (optionKey: string | null) => void;
  placeholder: ReactNode;
  defaultOptionIndex?: number;
}

export const Select = ({ options, onOptionSelect, defaultOptionIndex, placeholder }: SelectProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultOptionIndex
      ? options[defaultOptionIndex]
      : null,
  );

  useEffect(() => {
    if (defaultOptionIndex) {
      onOptionSelect(options[defaultOptionIndex].key);
    }
  }, []);

  return <div className="select-container">
    <button className="select-button" onClick={() => setIsExpanded(!isExpanded)}>
      {selectedOption
        ? <div>{selectedOption.label}</div>
        : <div className="placeholder">{placeholder}</div>}
      {selectedOption !== null && <button className="inline-button clean-input" onClick={(e) => {
        e.stopPropagation();
        setSelectedOption(null);
        onOptionSelect(null);
      }}>
          <Icon name="Backspace" />
      </button>}
      <Icon name="CaretDown" />
    </button>
    {isExpanded && <div className="options">
      {options.map(option => <button className="option" key={option.key} onClick={() => {
        onOptionSelect(option.key);
        setSelectedOption(option);
        setIsExpanded(false);
      }}>
        {option.label}
      </button>)}
    </div>}
  </div>;
};
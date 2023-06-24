import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import './tabs.styles.scss';

interface Tab {
  header: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Array<Tab>;
  /**
   * Tab index.
   */
  defaultTabIndex?: number;
  /**
   * If true, then no padding and border around content would be done.
   */
  omitContentWrap?: boolean;
}

export const Tabs = ({
  tabs,
  defaultTabIndex,
  omitContentWrap,
}: TabsProps) => {
  const [currentTab, setCurrentTab] = useState<number>(defaultTabIndex || 0);
  const headers = tabs.map(tab => tab.header);

  return <div className="tabs">
    <div className="headers">
      {headers.map((header, index) => {
        return <div
          className={classNames('header-wrapper', {
            'active-tab': index === currentTab,
          })}
          key={index}
        >
          <button
            key={index}
            className="header-button"
            onClick={() => setCurrentTab(index)}
          >
            {header}
          </button>
        </div>;
      })}
    </div>
    <div className={classNames({ 'tab-content': !omitContentWrap })}>
      {tabs[currentTab].content}
    </div>
  </div>;
};
import React, { useState } from 'react';
import { Panel } from '@shared';
import { useNetworkStore } from '@zustand';
import './network-panel.styles.scss';
import classNames from 'classnames';

interface RequestProps {
  id: string;
  url: string;
  method: string;
  response: number | 'no internet' | null;
  errorMessage?: string;
}

const Request = ({ url, method, response, errorMessage }: RequestProps) => {
  const [shouldShowError, setShouldShowError] = useState(false);
  const responseExists = response !== null;
  let isResponseGood;
  let isResponseBad;
  if (response !== null) {
    isResponseGood = response !== 'no internet' && (response >= 200 && response < 300);
    isResponseBad = response === 'no internet' || response >= 400;
  }

  return <>
    <div className="request">
      <b className="method">{method.toUpperCase()} </b>
      <i className="url">{url} </i>
      {!responseExists && <b className="no-response-placeholder">...</b>}
      <b className={classNames('response', {
        'bad-response': responseExists && isResponseBad,
        'good-response': responseExists && isResponseGood,
      })}>
        {response}
        {' '}
      </b>
      {isResponseBad &&
          <button onClick={() => setShouldShowError(!shouldShowError)}>
            {shouldShowError ? 'hide error' : 'show error'}
          </button>
      }
    </div>
    {shouldShowError &&
        <div className="error-message">
          {errorMessage || 'Can not extract error message.'}
        </div>
    }
  </>;
};

export const NetworkPanel = () => {
  const { requests } = useNetworkStore();

  return (<Panel header="NETWORK" className="network-panel">
    {requests.map(request => <Request key={request.id} {...request} />)}
  </Panel>);
};
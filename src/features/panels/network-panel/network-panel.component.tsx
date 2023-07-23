import React, { useState } from 'react';
import { Icon, Panel, Tooltip } from '@shared';
import { closePanel, useNetworkStore } from '@zustand';
import './network-panel.styles.scss';
import classNames from 'classnames';
import { CommonFeaturePanelProps } from '@types';

const cropLongUrl = (url: string) => {
  let arr = url.split('/');

  if (arr.length > 4) {
    const temp: string[] = arr.slice(-3);
    const newUrl = '.../' + temp.join('/');
    return newUrl;
  } else {
    return url;
  }
};

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

  const croppedUrl = cropLongUrl(url);

  return <>
    <div className="request">
      <span className="no-wrap">
        <b className="method">{method.toUpperCase()} </b>
        <i className="url">
          {url !== croppedUrl ? (
            <Tooltip omitTextUnderline tooltipText={url}>
              {croppedUrl}
            </Tooltip>
          ) : (
            url
          )}
        </i>
        {' '}
        {!responseExists && <b className='no-response-placeholder'>...</b>}
        <b
          className={classNames('response', {
            'bad-response': responseExists && isResponseBad,
            'good-response': responseExists && isResponseGood,
          })}>
          {response}
            {' '}
        </b>
      </span>
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

interface NetworkPanelProps extends CommonFeaturePanelProps {
}

export const NetworkPanel = ({ panelId, panelIndex }: NetworkPanelProps) => {
  const { requests } = useNetworkStore();

  return (<Panel
    panelTitle={
      <>
        NETWORK
        {' '}
        <Tooltip
          isFancyTooltip
          isIconTooltip
          tooltipText={<>
            Network panel <strong>displays all requests</strong> made by an application.<br />
            This may be useful when trying latest features as these often break,<br />
            but panel would keep response error messages displayed for easier<br />
            debugging.
          </>}
          tooltipImgName="network-panel-tooltip"
        />
      </>
    }
    className="network-panel"
    panelButtons={
      <button className="inline-button" onClick={() => closePanel(panelId)}>
        <Icon name="Close" />
      </button>
    }
    draggableProps={{ index: panelIndex, draggableIdAndKey: panelId }}
  >
    {requests.map(request => <Request key={request.id} {...request} />)}
  </Panel>);
};
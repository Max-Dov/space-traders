import { makeApiRequest } from '@utils';
import { ApiUrls } from '@constants';
import { Ship } from '@types';

export const buyCargo = (shipSymbol: Ship["symbol"], symbol: string, units: number) =>
  makeApiRequest<void>({
    method: 'POST',
    url: ApiUrls.BUY_CARGO,
    urlParams: { shipSymbol },
    data: { symbol, units }
  });
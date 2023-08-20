import BigNumber from 'bignumber.js';
import {
  ROUND_ETH_VALUE_BY,
  TRANSACTION_PAGE_SIZE,
  WEI_PER_ETH,
} from '../constants/common';

export const convertWeiToEth = weiValue => {
  const wei = new BigNumber(weiValue);
  const ethValue = wei.dividedBy(WEI_PER_ETH);
  return ethValue.toFixed(ROUND_ETH_VALUE_BY).toString();
};

export const increaseTotalBy = transactions =>
  transactions?.length === TRANSACTION_PAGE_SIZE ? 1 : 0;

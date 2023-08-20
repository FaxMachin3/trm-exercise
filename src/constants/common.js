import BigNumber from 'bignumber.js';

export const TRANSACTION_PAGE_SIZE = 10;
export const WEI_PER_ETH = new BigNumber('1000000000000000000');
export const ROUND_ETH_VALUE_BY = 6;
export const ETH = 'eth';
export const MESSAGE = {
  INVALID_ADDRESS: 'Sorry, this address is not valid or already in the list.',
  BALANCE_ERROR:
    'Sorry, we are not able to retrieve the balance of that address. You may have entered an invalid address.',
  TRANSACTIONS_ERROR:
    'Sorry, we are not able to retrieve the transactions for that address. Please try again later.',
};

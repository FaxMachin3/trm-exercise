import axios from 'axios';
import { TRANSACTION_PAGE_SIZE } from '../constants/common';

const etherscanApiUrl = 'https://api.etherscan.io/api';

export const getAddressBalance = ({ address }) =>
  axios.get(etherscanApiUrl, {
    params: {
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apikey: process.env.ETHERSCAN_API_KEY,
    },
  });

export const getAddressTransactions = ({ address, page = 1 }) =>
  axios.get(etherscanApiUrl, {
    params: {
      module: 'account',
      action: 'txlist',
      address,
      startblock: 0,
      endblock: 99999999,
      page,
      offset: TRANSACTION_PAGE_SIZE,
      sort: 'asc',
      apikey: process.env.ETHERSCAN_API_KEY,
    },
  });

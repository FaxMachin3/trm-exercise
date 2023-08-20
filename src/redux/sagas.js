import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ADDRESS_BALANCE, ADDRESS_TRANSACTIONS } from './actions';

import * as Api from './api';

function* commonAddressSaga({ payload, type, apiFunction }) {
  try {
    yield put({
      type: `${type}_REQUEST`,
    });

    // request our balance from Etherscan
    const response = yield call(apiFunction, payload);

    yield put({
      type: `${type}_SUCCESS`,
      payload,
      response: response?.data,
    });
  } catch (e) {
    yield put({
      type: `${type}_ERROR`,
    });
  }
}

function* loadAddressBalance(action) {
  yield* commonAddressSaga({
    ...action,
    apiFunction: Api.getAddressBalance,
  });
}

function* loadAddressTransactions(action) {
  yield* commonAddressSaga({
    ...action,
    apiFunction: Api.getAddressTransactions,
  });
}

export default function* sagas() {
  yield all([
    takeLatest(ADDRESS_BALANCE, loadAddressBalance),
    takeLatest(ADDRESS_TRANSACTIONS, loadAddressTransactions),
  ]);
}

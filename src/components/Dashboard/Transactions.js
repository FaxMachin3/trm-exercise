import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, message, Row, Table } from 'antd';
import WAValidator from 'multicoin-address-validator';
import {
  ADDRESS_TRANSACTIONS,
  requestAddressTransactions,
} from '../../redux/actions';
import { STATUS_ERROR, STATUS_LOADING } from '../../constants/redux';
import { ETH, MESSAGE, TRANSACTION_PAGE_SIZE } from '../../constants/common';
import { increaseTotalBy } from '../../utils/common';

const columns = [
  {
    title: 'Tx Hash',
    dataIndex: 'hash',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timeStamp',
  },
  {
    title: 'From',
    dataIndex: 'from',
  },
  {
    title: 'To',
    dataIndex: 'to',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
];

const DashboardTransactions = memo(({ selectedAddress }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const transactions = useSelector(state => state.transactions);
  const requestStatus = useSelector(
    state => state.status[ADDRESS_TRANSACTIONS]
  );

  // request Transactions whenever an Address changes
  useEffect(() => {
    /**
     * if we wanna prevent fetching for same address or page
     * then we should add a caching layer rather than checking for multiple conditions
     *
     * Also, memo would not re-render this component until the address changes
     */
    if (selectedAddress) {
      dispatch(
        requestAddressTransactions({
          address: selectedAddress,
          page: currentPage,
        })
      );
    }
  }, [dispatch, selectedAddress, currentPage]);

  // display a message if our request errors
  useEffect(() => {
    if (
      !WAValidator.validate(selectedAddress, ETH) &&
      requestStatus === STATUS_ERROR
    ) {
      message.error(MESSAGE.TRANSACTIONS_ERROR);
    }
  }, [requestStatus, selectedAddress]);

  const onPageChange = (page, _pageSize) => setCurrentPage(page);

  return (
    <Row>
      <Col flex={1}>
        {selectedAddress ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>Viewing transactions for {selectedAddress}:</Col>
            <Table
              loading={requestStatus === STATUS_LOADING}
              columns={columns}
              dataSource={transactions || []}
              size="large"
              pagination={{
                onChange: onPageChange,
                current: currentPage,
                pageSize: TRANSACTION_PAGE_SIZE,
                showSizeChanger: false,
                total:
                  TRANSACTION_PAGE_SIZE *
                  (currentPage + increaseTotalBy(transactions)),
              }}
              rowKey="hash"
            />
          </Row>
        ) : (
          `Select an address to view it's latest transactions`
        )}
      </Col>
    </Row>
  );
});

export default DashboardTransactions;

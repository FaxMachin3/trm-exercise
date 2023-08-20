import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Col, Table } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'ETH Balance',
    dataIndex: 'balance',
  },
];

const DashboardAddresses = memo(({ setSelectedAddress }) => {
  const { address: addressFromUrl } = useParams();
  const navigate = useNavigate();
  const addresses = useSelector(state => state.addresses);

  const onAddressClick = useCallback(
    ({ address }) => {
      setSelectedAddress(address);
      navigate(`/address/${address}`);
    },
    [setSelectedAddress, navigate]
  );

  useEffect(() => {
    !!addressFromUrl && onAddressClick({ address: addressFromUrl });
  }, [addressFromUrl, setSelectedAddress, onAddressClick]);

  return (
    <Col span={24}>
      <Table
        columns={columns}
        dataSource={addresses || []}
        rowKey="address"
        onRow={record => ({
          onClick: () => onAddressClick(record),
        })}
      />
    </Col>
  );
});

export default DashboardAddresses;

import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Form, Input, message } from 'antd';

import WAValidator from 'multicoin-address-validator';
import { useParams } from 'react-router-dom';
import { ADDRESS_BALANCE, requestAddressBalance } from '../../redux/actions';
import { STATUS_ERROR, STATUS_LOADING } from '../../constants/redux';

import { ETH, MESSAGE } from '../../constants/common';

const { useForm } = Form;

const DashboardSearch = memo(() => {
  const { address: addressFromUrl } = useParams();
  const addresses = useSelector(state => state.addresses);
  const dispatch = useDispatch();
  const [form] = useForm();

  const requestStatus = useSelector(state => state.status[ADDRESS_BALANCE]);

  // AntDesign's Form automatically manages our validation,
  // so we can just request our Address' balance
  // which adds the address to our Addresses list upon success
  const onSubmit = useCallback(
    ({ address }, notify = true) => {
      if (
        !WAValidator.validate(address, ETH) ||
        addresses?.some(addressData => addressData.address === address)
      ) {
        notify && message.warn(MESSAGE.INVALID_ADDRESS);
      } else {
        dispatch(requestAddressBalance({ address }));
      }

      form.resetFields();
    },
    [dispatch, form, addresses]
  );

  useEffect(() => {
    !!addressFromUrl && onSubmit({ address: addressFromUrl }, false);
  }, [addressFromUrl, onSubmit]);

  // display a message if our request errors
  useEffect(() => {
    if (requestStatus === STATUS_ERROR) {
      message.error(MESSAGE.BALANCE_ERROR);
    }
  }, [requestStatus]);

  return (
    <Col span={24}>
      <Form form={form} layout="inline" onFinish={onSubmit}>
        <Form.Item
          className="input-address"
          name="address"
          rules={[{ required: true, message: 'Please enter an address' }]}
        >
          <Input placeholder="ETH Address" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={requestStatus === STATUS_LOADING}
        >
          Add Address
        </Button>
      </Form>
    </Col>
  );
});

export default DashboardSearch;

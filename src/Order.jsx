import { React, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import { setPage } from './redux/ui/actions';
import { placeOrder, getRoute, setRoute } from './redux/order/actions';
import { hasCard } from './redux/payment/selector';
import { addressList, orderPlaced } from './redux/order/selector';
import './styles/Popup.css';

export const Order = () => {
  const dispatch = useDispatch();
  const userHasCard = useSelector(hasCard);
  const addresses = useSelector(addressList);
  const isOrderPlaced = useSelector(orderPlaced);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [addressList1, setAddressList1] = useState(addresses);
  const [addressList2, setAddressList2] = useState(addresses);

  useEffect(() => {
    setAddressList1(addresses);
    setAddressList2(addresses);
  }, [addresses]);

  const submitAddress1 = useCallback(
    (event) => {
      setAddress1(event.target.value);
      setAddressList2(
        addresses.filter((value) => value !== event.target.value)
      );
    },
    [addresses]
  );

  const submitAddress2 = useCallback(
    (event) => {
      setAddress2(event.target.value);
      setAddressList1(
        addresses.filter((value) => value !== event.target.value)
      );
    },
    [addresses]
  );

  const submitOrder = useCallback(
    (event) => {
      event.preventDefault();
      if (address1 && address2) {
        dispatch(placeOrder(true));
        dispatch(getRoute({ address1, address2 }));
      } else {
        alert('Выберите начальную и конечную точки');
      }
    },
    [dispatch, address1, address2]
  );

  const refresh = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(placeOrder(false));
      dispatch(setRoute([]));
    },
    [dispatch]
  );

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  const AddressList1 = () => (
    <Select
      variant='standard'
      value={address1}
      onChange={submitAddress1}
      displayEmpty
      className='popupInput'
    >
      <MenuItem value='' disabled selected>
        Откуда
      </MenuItem>
      {addressList1.map((address, index) => (
        <MenuItem key={index} data-index={index} value={address}>
          {address}
        </MenuItem>
      ))}
    </Select>
  );

  const AddressList2 = () => (
    <Select
      variant='standard'
      value={address2}
      onChange={submitAddress2}
      displayEmpty
      className='popupInput'
    >
      <MenuItem value='' disabled selected>
        Куда
      </MenuItem>
      {addressList2.map((address, index) => (
        <MenuItem key={index} data-index={index} value={address}>
          {address}
        </MenuItem>
      ))}
    </Select>
  );

  if (!userHasCard) {
    return (
      <div className='popup'>
        <div className='formHeader'>
          <p>Не заполнены платежные данные</p>
        </div>
        <Link to='/profile'>
          <button
            type='button'
            className='formSubmit'
            onClick={() => changeState('profile')}
          >
            Перейти в профиль
          </button>
        </Link>
      </div>
    );
  } else {
    if (!isOrderPlaced) {
      return (
        <div className='popup'>
          <form onSubmit={submitOrder}>
            <div className='popupBlock'>
              <AddressList1 />
              <AddressList2 />
            </div>
            <button type='submit' className='formSubmit'>
              Заказать
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className='popup'>
          <div className='popupHeader'>
            <h2 className='formName'>Заказ размещен</h2>
            <p>Ваше такси уже едет к вам.</p>
          </div>
          <button type='button' className='formSubmit' onClick={refresh}>
            Сделать новый заказ
          </button>
        </div>
      );
    }
  }
};

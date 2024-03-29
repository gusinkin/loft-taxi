import { React, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import { setPage } from '../redux/store/ui/actions';
import { placeOrder, getRoute, setRoute } from '../redux/store/order/actions';
import { hasCard } from '../redux/store/payment/selector';
import { addressList, orderPlaced } from '../redux/store/order/selector';
import car1 from '../images/car1.png';
import car2 from '../images/car2.png';
import car3 from '../images/car3.png';
import styled from 'styled-components';
import * as S from './FormStyles';

export const Order = () => {
  const userHasCard = useSelector(hasCard);
  const dispatch = useDispatch();

  const addresses = useSelector(addressList);
  const isOrderPlaced = useSelector(orderPlaced);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [addressList1, setAddressList1] = useState(addresses);
  const [addressList2, setAddressList2] = useState(addresses);

  const options = [
    { name: 'Стандарт', price: '150 ₽', car: car1 },
    { name: 'Премиум', price: '250 ₽', car: car2 },
    { name: 'Бизнес', price: '300 ₽', car: car3 },
  ];
  const [active, setActive] = useState(options[0].name);

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
    <MySelect
      variant='standard'
      value={address1}
      onChange={submitAddress1}
      displayEmpty
    >
      <MenuItem value='' disabled selected>
        Откуда
      </MenuItem>
      {addressList1.map((address, index) => (
        <MenuItem key={index} data-index={index} value={address}>
          {address}
        </MenuItem>
      ))}
    </MySelect>
  );

  const AddressList2 = () => (
    <MySelect
      variant='standard'
      value={address2}
      onChange={submitAddress2}
      displayEmpty
    >
      <MenuItem value='' disabled selected>
        Куда
      </MenuItem>
      {addressList2.map((address, index) => (
        <MenuItem key={index} data-index={index} value={address}>
          {address}
        </MenuItem>
      ))}
    </MySelect>
  );

  if (!userHasCard) {
    return (
      <PopupContainer>
        <Popup>
          <S.FormHeader>
            <p>Не заполнены платежные данные</p>
          </S.FormHeader>
          <Link to='/main/profile'>
            <S.FormSubmit type='button' onClick={() => changeState('profile')}>
              Перейти в профиль
            </S.FormSubmit>
          </Link>
        </Popup>
      </PopupContainer>
    );
  } else {
    if (!isOrderPlaced) {
      return (
        <PopupContainer>
          <Popup>
            <SelectBlock>
              <AddressList1 />
              <AddressList2 />
            </SelectBlock>
          </Popup>
          <Popup>
            <OptionsBlock>
              {options.map((option, index) => (
                <OptionCard
                  key={index}
                  optionName={option.name}
                  nowActive={active}
                  onClick={() => setActive(option.name)}
                >
                  <OptionName>{option.name}</OptionName>
                  <OptionText>Стоимость</OptionText>
                  <OptionPrice>{option.price}</OptionPrice>
                  <OptionImage>
                    <OptionPic src={option.car} alt='' />
                  </OptionImage>
                </OptionCard>
              ))}
            </OptionsBlock>
            <S.FormSubmit type='button' onClick={submitOrder}>
              Заказать
            </S.FormSubmit>
          </Popup>
        </PopupContainer>
      );
    } else {
      return (
        <PopupContainer>
          <Popup>
            <S.FormHeader>
              <S.FormName>Заказ размещен</S.FormName>
              <p>Ваше такси уже едет к вам.</p>
            </S.FormHeader>
            <S.FormSubmit type='button' onClick={refresh}>
              Сделать новый заказ
            </S.FormSubmit>
          </Popup>
        </PopupContainer>
      );
    }
  }
};

const PopupContainer = styled.div`
  position: absolute;
  top: 15%;
  left: min(calc(((100vw - 800px) / 10) + 8px), 5vh);
  z-index: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    top: 10%;
    left: 0;
    width: 100%;
    height: 90%;
    justify-content: space-between;
  }
`;

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  border-radius: 20px;
  z-index: 10;
  padding: min(calc(((100vw - 800px) / 20) + 20px), 30px);
  box-shadow: 0px 0px 20px -5px #00000060;

  &:nth-child(2) {
    margin-top: -35px;
  }
  &:last-child {
    @media (max-width: 800px) {
      margin-top: auto;
    }
  }
  @media (max-width: 800px) {
    margin: 10px min(calc(((100vw - 400px) / 5) + 10px), 10px);
    padding: min(calc(((100vw - 400px) / 5) + 10px), 10px);
    border-radius: 10px;
  }
`;

const SelectBlock = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 800px) {
    margin-bottom: 0;
  }
`;

const OptionsBlock = styled.div`
  border-radius: 10px;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  @media (max-width: 800px) {
    margin-bottom: 10px;
    width: 100%;
    justify-content: space-evenly;
    gap: 0;
  }
`;

const OptionCard = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 118px;
  background: #fff;
  box-shadow: 0px 3px 20px 0px #00000033;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  opacity: ${({ optionName, nowActive }) =>
    optionName === nowActive ? 1 : 0.5};
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
    transition: opacity 0.3s;
  }
`;

const OptionName = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 8px;
`;

const OptionText = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #828282;
`;

const OptionPrice = styled.span`
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`;

const OptionImage = styled.div`
  width: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;

const OptionPic = styled.img`
  width: 100%;
  object-fit: none;
`;

const MySelect = styled(Select)`
  margin-bottom: 10px;
  width: 100%;
`;

import { React, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setPage } from '../redux/ui/actions';
import { updateCard } from '../redux/payment/actions';
import { logged, token } from '../redux/user/selector';
import { cardData } from '../redux/payment/selector';
import mastercard from '../svg/mastercard.svg';
import styled from 'styled-components';
import * as S from '../pages/styles';

export const Profile = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  const currentCardData = useSelector(cardData);
  // const userHasCard = useSelector(hasCard);
  const authToken = useSelector(token);

  const [submited, setSubmited] = useState(false);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    if (loggedIn) {
      setCardName(currentCardData.cardName);
      setCardNumber(currentCardData.cardNumber);
      setExpiryDate(currentCardData.expiryDate);
      setCvc(currentCardData.cvc);
    } else {
      setCardName('');
      setCardNumber('');
      setExpiryDate('');
      setCvc('');
    }
  }, [currentCardData, loggedIn]);

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  const submitCard = useCallback(
    (event) => {
      event.preventDefault();

      setSubmited(true);

      const { cardName, cardNumber, expiryDate, cvc } = event.target;

      const payload = {
        cardName: cardName.value,
        cardNumber: cardNumber.value,
        expiryDate: expiryDate.value,
        cvc: cvc.value,
        token: authToken,
      };

      dispatch(updateCard(payload));
    },
    [dispatch, authToken]
  );

  if (submited) {
    return (
      // Платёжные данные обновлены. Перейти на карту
      <MainPageContent>
        <S.Form>
          <S.FormHeader>
            <S.FormName>Профиль</S.FormName>
            <p>
              Платёжные данные обновлены. Теперь вы можете заказывать такcи.
            </p>
          </S.FormHeader>
          <Link to='/main/order'>
            <S.FormSubmit type='button' onClick={() => changeState('order')}>
              Перейти на карту
            </S.FormSubmit>
          </Link>
        </S.Form>
      </MainPageContent>
    );
  } else {
    return (
      // форма ввода данных карты
      <MainPageContent>
        <S.Form onSubmit={submitCard}>
          <S.FormHeader>
            <S.FormName>Профиль</S.FormName>
            <p>Введите платежные данные</p>
          </S.FormHeader>
          <S.FormInner>
            <S.FormColumn>
              <S.FormRow>
                <S.FormItem>
                  <S.FormLabel htmlFor='cardName'>Имя владельца</S.FormLabel>
                  <S.FormInput
                    name='cardName'
                    id='cardName'
                    type='text'
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </S.FormItem>
              </S.FormRow>
              <S.FormRow>
                <S.FormItem>
                  <S.FormLabel htmlFor='cardNumber'>Номер карты</S.FormLabel>
                  <S.FormInput
                    name='cardNumber'
                    id='cardNumber'
                    type='text'
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </S.FormItem>
              </S.FormRow>
              <S.FormRow>
                <S.FormItem>
                  <S.FormLabel htmlFor='expiryDate'>MM/YY</S.FormLabel>
                  <S.FormInput
                    name='expiryDate'
                    id='expiryDate'
                    type='text'
                    value={expiryDate}
                    onChange={(e) => {
                      setExpiryDate(e.target.value);
                    }}
                  />
                </S.FormItem>
                <S.FormItem>
                  <S.FormLabel htmlFor='cvc'>CVC</S.FormLabel>
                  <S.FormInput
                    name='cvc'
                    id='cvc'
                    type='text'
                    value={cvc}
                    onChange={(e) => {
                      setCvc(e.target.value);
                    }}
                  />
                </S.FormItem>
              </S.FormRow>
            </S.FormColumn>
            <S.FormColumn>
              <PictureContainer>
                <img src={mastercard} alt='mastercard' />
              </PictureContainer>
            </S.FormColumn>
          </S.FormInner>
          <S.FormSubmit type='submit'>Сохранить</S.FormSubmit>
        </S.Form>
      </MainPageContent>
    );
  }
};

Profile.propTypes = {
  logOut: PropTypes.func,
  setPage: PropTypes.func,
};

const MainPageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  position: absolute;
  top: 10%;
  width: 100%;
  height: 90%;
`;

const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

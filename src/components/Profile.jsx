import { React, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setPage } from '../redux/store/ui/actions';
import { updateCard } from '../redux/store/payment/actions';
import { logged, token } from '../redux/store/user/selector';
import { cardData } from '../redux/store/payment/selector';
import mastercard from '../svg/mastercard.svg';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as S from './FormStyles';

export const Profile = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  const currentCardData = useSelector(cardData);
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
      <ProfilePageContent>
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
      </ProfilePageContent>
    );
  } else {
    return (
      <ProfilePageContent>
        <ProfileForm onSubmit={submitCard}>
          <S.FormHeader>
            <S.FormName>Профиль</S.FormName>
            <p>Введите платежные данные</p>
          </S.FormHeader>
          <S.FormInner>
            <S.FormColumn>
              <S.FormRow>
                <TextField
                  fullWidth
                  variant='standard'
                  label='Имя владельца'
                  id='cardName'
                  type='text'
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                ></TextField>
              </S.FormRow>
              <S.FormRow>
                <TextField
                  fullWidth
                  variant='standard'
                  label='Номер карты'
                  id='cardNumber'
                  type='text'
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                ></TextField>
              </S.FormRow>
              <S.FormRow>
                <TextField
                  fullWidth
                  variant='standard'
                  label='MM/YY'
                  id='expiryDate'
                  type='text'
                  value={expiryDate}
                  onChange={(e) => {
                    setExpiryDate(e.target.value);
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  variant='standard'
                  label='CVC'
                  id='cvc'
                  type='text'
                  value={cvc}
                  onChange={(e) => {
                    setCvc(e.target.value);
                  }}
                ></TextField>
              </S.FormRow>
            </S.FormColumn>
            <S.FormColumn>
              <PictureContainer>
                <img src={mastercard} alt='mastercard' />
              </PictureContainer>
            </S.FormColumn>
          </S.FormInner>
          <S.FormSubmit type='submit'>Сохранить</S.FormSubmit>
        </ProfileForm>
      </ProfilePageContent>
    );
  }
};

Profile.propTypes = {
  logOut: PropTypes.func,
  setPage: PropTypes.func,
};

const ProfilePageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: absolute;
  top: 10%;
  width: 100%;
  height: 90%;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 20px -5px #00000060;
  padding: min(calc(((100vw - 800px) / 20) + 10px), 40px)
    min(calc(((100vw - 800px) / 10) + 10px), 80px);
  @media (max-width: 800px) {
    padding: 20px;
  }
`;

const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 800px) {
    @media (max-height: 800px) {
      display: none;
    }
  }
`;

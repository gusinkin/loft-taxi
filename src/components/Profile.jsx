import { React, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loggedIn) {
      setValue('cardName', currentCardData.cardName);
      setValue('cardNumber', currentCardData.cardNumber);
      setValue('expiryDate', currentCardData.expiryDate);
      setValue('cvc', currentCardData.cvc);
    } else {
      setValue('cardName', '');
      setValue('cardNumber', '');
      setValue('expiryDate', '');
      setValue('cvc', '');
    }
  }, [currentCardData, loggedIn, setValue]);

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  const submitCard = useCallback(
    (data) => {
      setSubmited(true);

      const payload = {
        cardName: data.cardName,
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvc: data.cvc,
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
        <ProfileForm onSubmit={handleSubmit(submitCard)}>
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
                  error={errors.cardName ? true : false}
                  helperText={errors.cardName ? errors.cardName.message : ' '}
                  {...register('cardName', {
                    required: 'Введите имя',
                  })}
                ></TextField>
              </S.FormRow>
              <S.FormRow>
                <TextField
                  fullWidth
                  variant='standard'
                  label='Номер карты'
                  id='cardNumber'
                  type='text'
                  error={errors.cardNumber ? true : false}
                  helperText={
                    errors.cardNumber ? errors.cardNumber.message : ' '
                  }
                  {...register('cardNumber', {
                    required: 'Введите номер карты',
                  })}
                ></TextField>
              </S.FormRow>
              <S.FormRow>
                <TextField
                  fullWidth
                  variant='standard'
                  label='MM/YY'
                  id='expiryDate'
                  type='text'
                  error={errors.expiryDate ? true : false}
                  helperText={
                    errors.expiryDate ? errors.expiryDate.message : ' '
                  }
                  {...register('expiryDate', {
                    required: 'Введите срок действия',
                  })}
                ></TextField>
                <TextField
                  fullWidth
                  variant='standard'
                  label='CVC'
                  id='cvc'
                  type='text'
                  error={errors.cvc ? true : false}
                  helperText={errors.cvc ? errors.cvc.message : ' '}
                  {...register('cvc', {
                    required: 'Введите CVC',
                  })}
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

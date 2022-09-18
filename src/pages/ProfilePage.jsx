import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setPage } from '../redux/ui/actions';
import { updateCard } from '../redux/payment/actions';
import { logged, token } from '../redux/user/selector';
import { Header } from '../Header';
import mastercard from '../svg/mastercard.svg';
import '../styles/Form.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  // const authToken = useSelector(token);

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  useEffect(() => {
    if (loggedIn) {
      navigate('/profile');
      changeState('profile');
    } else {
      navigate('/');
      changeState('login');
    }
  }, [loggedIn, navigate, changeState]);

  const submitCard = useCallback(
    (event) => {
      event.preventDefault();

      const { cardName, cardNumber, expiryDate, cvc } = event.target;

      const payload = {
        cardName: cardName.value,
        cardNumber: cardNumber.value,
        expiryDate: expiryDate.value,
        cvc: cvc.value,
        // token: authToken,
      };

      // console.log(payload);
      dispatch(updateCard(payload));
    },
    [dispatch]
  );

  return (
    <div>
      <Header />
      <div className='pageContent' data-testid='profile-page'>
        <div className='formWrapper'>
          <div className='formHeader'>
            <h2 className='formName'>Профиль</h2>
            <p>Введите платежные данные</p>
          </div>
          <form onSubmit={submitCard}>
            <div className='formInner'>
              <div className='formColumn'>
                <div className='formRow'>
                  <div className='formItem'>
                    <label htmlFor='cardName'>Имя владельца</label>
                    <input
                      className='formInput'
                      name='cardName'
                      id='cardName'
                      type='text'
                    />
                  </div>
                </div>
                <div className='formRow'>
                  <div className='formItem'>
                    <label htmlFor='cardNumber'>Номер карты</label>
                    <input
                      className='formInput'
                      name='cardNumber'
                      id='cardNumber'
                      type='text'
                    />
                  </div>
                </div>
                <div className='formRow'>
                  <div className='formItem'>
                    <label htmlFor='expiryDate'>MM/YY</label>
                    <input
                      className='formInput'
                      name='expiryDate'
                      id='expiryDate'
                      type='text'
                    />
                  </div>
                  <div className='formItem'>
                    <label htmlFor='cvc'>CVC</label>
                    <input
                      className='formInput'
                      name='cvc'
                      id='cvc'
                      type='text'
                    />
                  </div>
                </div>
              </div>
              <div className='formColumn'>
                <div className='pictureContainer'>
                  <img
                    src={mastercard}
                    className='cardPicture'
                    alt='mastercard'
                  />
                </div>{' '}
              </div>
            </div>
            <button className='formSubmit' type='submit'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
      {/* <MCIcon />
      <Logo /> */}
    </div>
  );
};

ProfilePage.propTypes = {
  logOut: PropTypes.func,
  setPage: PropTypes.func,
};

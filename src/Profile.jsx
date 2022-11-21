import { React, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setPage } from './redux/ui/actions';
import { updateCard } from './redux/payment/actions';
import { logged, token } from './redux/user/selector';
import { cardData } from './redux/payment/selector';
import mastercard from './svg/mastercard.svg';
import './styles/Form.css';

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
      <div className='formWrapper popup'>
        <div className='formHeader'>
          <h2 className='formName'>Профиль</h2>
          <p>Платёжные данные обновлены. Теперь вы можете заказывать такcи.</p>
        </div>
        <Link to='/main/order'>
          <button
            type='button'
            className='formSubmit'
            onClick={() => changeState('order')}
          >
            Перейти на карту
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      // форма ввода данных карты
      <div className='formWrapper popup'>
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
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
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
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
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
                    value={expiryDate}
                    onChange={(e) => {
                      setExpiryDate(e.target.value);
                    }}
                  />
                </div>
                <div className='formItem'>
                  <label htmlFor='cvc'>CVC</label>
                  <input
                    className='formInput'
                    name='cvc'
                    id='cvc'
                    type='text'
                    value={cvc}
                    onChange={(e) => {
                      setCvc(e.target.value);
                    }}
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
    );
  }
};

Profile.propTypes = {
  logOut: PropTypes.func,
  setPage: PropTypes.func,
};

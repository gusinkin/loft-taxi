import { React, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPage } from './redux/ui/actions';
import { hasCard } from './redux/payment/selector';

export const Order = () => {
  const userHasCard = useSelector(hasCard);
  const dispatch = useDispatch();

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );
  const orderPlaced = false;
  if (userHasCard) {
    return (
      <div className='popUp'>
        <div className=''>Не заполнены платежные данные</div>
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
    if (!orderPlaced) {
      return (
        <div className='popUp'>
          <div className=''>основная форма заказа</div>
        </div>
      );
    } else {
      return (
        <div className='popUp'>
          <div className=''> такси прибудет через 10 минут</div>
          <button
            type='button'
            className='formSubmit'
            // onClick={() => changeState('profile')}
            // тут orderPlaced должен меняться на false
          >
            Сделать новый заказ{' '}
          </button>
        </div>
      );
    }
  }
};

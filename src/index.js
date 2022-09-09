import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
// import { PrivateRoute } from './PrivateRoute';
// import { LoginPageWithAuth } from './pages/LoginPage';
// import { MapPage } from './pages/MapPage';
// import { ProfilePageWithAuth } from './pages/ProfilePage';
// import { RegPage } from './pages/RegPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<LoginPageWithAuth />} />
            <Route path='/reg' element={<RegPage />} />
            <Route path='/map' element={<MapPage />} />
            <Route path='/profile' element={<ProfilePageWithAuth />} />
          </Route>
        </Routes> */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

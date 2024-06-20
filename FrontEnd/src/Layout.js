// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import FloatingButton from './Components/FloatingButton';

const Layout = ({ children }) => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && <FloatingButton />}
      {children}
    </div>
  );
};

export default Layout;
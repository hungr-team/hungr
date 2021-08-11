import React from 'react';
import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const [cookie, setCookieState] = useState('');

  useEffect(() => {
    if (document.cookie) {
      let splitCookie = document.cookie.split('=')[1];
      //capitalize first letter
      splitCookie = splitCookie[0].toUpperCase() + splitCookie.substring(1);
      setCookieState(splitCookie);
    }
  }, []);

  return (
    <div>
      {console.log(cookie)}
      <NavBar userName={cookie} />
      <Dashboard />
    </div>
  );
};

export default MainPage;

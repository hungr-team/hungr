import React from 'react';
import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const [cookie, setCookieState] = useState('');
  const [updatedRadius, setUpDatedRadius] = useState(5000);

  const sliderUpdate = (val) => {
    setUpDatedRadius(val * 1609);
    return;
  };

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
      <NavBar username={cookie} sliderUpdate={setUpDatedRadius} />
      <Dashboard updatedRadius={updatedRadius} />
    </div>
  );
};

export default MainPage;

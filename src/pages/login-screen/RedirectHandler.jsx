import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accounts = [];

    for (let i = 1; ; i++) {
      const account = params.get(`acct${i}`);
      const token = params.get(`token${i}`);
      const currency = params.get(`cur${i}`);
      if (!account || !token) break;
      accounts.push({ account, token, currency });
    }

    if (accounts.length > 0) {
      sessionStorage.setItem('deriv_token', accounts[0].token);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div style={{ textAlign: 'center' }}>Logging in...</div>;
};

export default RedirectHandler;

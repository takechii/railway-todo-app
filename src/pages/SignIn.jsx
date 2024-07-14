import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../authSlice';
import { Header } from '../components/Header';
import { url } from '../const';
import './signin.scss';

export const SignIn = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignIn = () => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie('token', token);
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。 ${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            onChange={handleEmailChange}
            className="email-input"
          />
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            onChange={handlePasswordChange}
            className="password-input"
          />
          <br />
          <button type="button" onClick={onSignIn} className="signin-button">
            サインイン
          </button>
        </form>
      </main>
    </div>
  );
};

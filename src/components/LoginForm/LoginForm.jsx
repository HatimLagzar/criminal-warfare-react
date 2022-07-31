import Button from '../buttons/Button/Button';
import InputGroup from '../forms/InputGroup/InputGroup';
import './LoginForm.scss';
import authService from '../../services/auth/AuthService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    authService.login(username, password).then((response) => {
      navigate('/');
    });
  }

  return (
    <form className='login-form' method='POST' onSubmit={handleSubmit}>
      <InputGroup
        label={'Username'}
        id={'username-input'}
        placeholder={'Username'}
        type={'text'}
        handleInputChange={(e) => setUsername(e.currentTarget.value)}
      />

      <InputGroup
        label={'Password'}
        id={'password-input'}
        placeholder={'Password'}
        type={'password'}
        handleInputChange={(e) => setPassword(e.currentTarget.value)}
      />

      <Button text='Login' classes={'btn-login btn-red'} />
    </form>
  );
}

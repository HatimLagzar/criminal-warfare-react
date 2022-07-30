import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import './LoginForm.scss';
import authService from '../../app/services/auth/AuthService';
import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    authService.login(username, password);
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

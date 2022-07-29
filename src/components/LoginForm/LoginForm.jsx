import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import './LoginForm.scss';

export default function LoginForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className='login-form' method='POST' onSubmit={handleSubmit}>
      <InputGroup
        label={'Login'}
        id={'login-input'}
        placeholder={'Login'}
        type={'text'}
      />

      <InputGroup
        label={'Password'}
        id={'password-input'}
        placeholder={'Password'}
        type={'password'}
      />

      <Button text='Login' classes={'btn-login btn-red'} />
    </form>
  );
}

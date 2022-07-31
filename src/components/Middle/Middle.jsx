import authService from '../../services/auth/AuthService';
import './Middle.scss';
import Menu from './../Menu/Menu';
import useAuthenticationStatus from '../../hooks/auth/useAuthenticationStatus';

const Middle = (props) => {
  const isLoggedIn = useAuthenticationStatus();

  let topClasses = isLoggedIn
    ? 'middle-top'
    : `${'middle-top'} ${'logged-out-spacer'}`;

  return (
    <div className={'middle'}>
      <div className={topClasses}></div>
      <div className={'middle-mid'}>
        <Menu />
        <div className={'content-right'}>{props.children}</div>
      </div>
      <div className={'middle-btm'}></div>
    </div>
  );
};

export default Middle;

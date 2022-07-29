import authService from '../../app/services/auth/AuthService';
import './Middle.scss';
import Menu from './../Menu/Menu';

const Middle = (props) => {
  const isLoggedIn = authService.hasBeenAuthenticated();

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

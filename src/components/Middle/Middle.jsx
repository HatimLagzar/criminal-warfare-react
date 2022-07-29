import authService from '../../app/services/auth/AuthService';
import './Middle.scss';
import Menu from './../Menu/Menu';

const Middle = (props) => {
  const isLoggedIn = authService.hasBeenAuthenticated();

  let top_classes = isLoggedIn
    ? 'middle-top'
    : `${'middle-top'} ${'logged-out-spacer'}`;

  return (
    <div className={'middle'}>
      <div className={top_classes}></div>
      <div className={'middle-mid'}>
        <Menu />
        <div class={'content-right'}>{props.children}</div>
      </div>
      <div className={'middle-btm'}></div>
    </div>
  );
};

export default Middle;

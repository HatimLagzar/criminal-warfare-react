import HeaderBar from './HeaderBar/HeaderBar';
import StatsRow from './StatsRow/StatsRow';
import authService from '../../app/services/auth/AuthService';

const Header = () => {
  const isLoggedIn = authService.hasBeenAuthenticated();

  return (
    <div className='header'>
      <HeaderBar />
      {isLoggedIn && <StatsRow />}
    </div>
  );
};
export default Header;

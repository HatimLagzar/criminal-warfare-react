import HeaderBar from './HeaderBar/HeaderBar';
import StatsRow from './StatsRow/StatsRow';
import { useSelector } from 'react-redux';
import useAuthenticationStatus from '../../../hooks/auth/useAuthenticationStatus';

const Header = () => {
  const isLoggedIn = useAuthenticationStatus();

  return (
    <div className='header'>
      <HeaderBar />
      {isLoggedIn && <StatsRow />}
    </div>
  );
};
export default Header;

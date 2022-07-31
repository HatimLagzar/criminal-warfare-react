import FlexWrap from '../../FlexWrap/FlexWrap';
import HeaderBarContainer from './HeaderBarContainer';
import Logo from './../Logo/Logo';
import './HeaderBar.scss';
import HeaderBarBackground from './HeaderBarBackground';
import authService from '../../../../services/auth/AuthService';
import useAuthenticationStatus from '../../../../hooks/auth/useAuthenticationStatus';

const HeaderBar = () => {
  const isLoggedIn = useAuthenticationStatus();

  let left, right, left_class_name, right_class_name;
  if (isLoggedIn) {
    left = [
      { fa: 'fa', icon: 'comments', link: '/forum', name: 'Forum', count: 3 },
      {
        fa: 'fa fa-fw',
        icon: 'newspaper',
        link: '/news',
        name: 'News',
        count: 0,
      },
      {
        fa: 'fa fa-fw',
        icon: 'comment',
        link: '/chat',
        name: 'Chat',
        count: 0,
      },
      { fa: 'fas', icon: 'code', link: '/updates', name: 'Updates', count: 0 },
    ];
    right = [
      { fa: 'fas', icon: 'vote-yea', link: '/vote', name: 'Vote' },
      { fa: 'fas', icon: 'retweet', link: '/referrals', name: 'Referrals' },
      { fa: 'fas', icon: 'question', link: '/support', name: 'Support' },
      { fa: 'fas', icon: 'star', link: '/upgrade', name: 'Upgrade' },
    ];
    left_class_name = 'text-center';
    right_class_name = 'text-center';
  } else {
    left = [
      {
        fa: 'fa fa-solid',
        icon: 'right-to-bracket',
        link: '/login',
        name: 'Login',
        count: 0,
      },
      {
        fa: 'fa fa-solid',
        icon: 'user-plus',
        link: '/sign_up',
        name: 'Sign Up',
        count: 0,
      },
    ];
    right = [
      { fa: 'fa', icon: 'comments', link: '/forum', name: 'Forum' },
      {
        fa: 'fa fa-brands',
        icon: 'discord',
        link: '/discord',
        name: 'Discord',
      },
    ];
    left_class_name = 'text-left';
    right_class_name = 'text-right';
  }

  return (
    <HeaderBarBackground>
      <FlexWrap className={'wrapper header-bar'}>
        <HeaderBarContainer links={left} className={left_class_name} />
        <Logo />
        <HeaderBarContainer links={right} className={right_class_name} />
      </FlexWrap>
    </HeaderBarBackground>
  );
};
export default HeaderBar;

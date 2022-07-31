import './Menu.scss';
import MenuGroup from './../MenuGroup/MenuGroup';
import MenuLink from './../MenuLink/MenuLink';
import authService from '../../services/auth/AuthService';
import useAuthenticationStatus from '../../hooks/auth/useAuthenticationStatus';

const Menu = () => {
  const isLoggedIn = useAuthenticationStatus();

  let menu = [
    { group: 'Navigation' },
    { link: '/login', title: 'Login' },
    { link: '/sign_up', title: 'Register' },
    { link: '/forgot_password', title: 'Forgot Password' },
  ];

  if (isLoggedIn) {
    menu = [
      { group: 'Useful' },
      { link: '/criminal_pass', title: 'Criminal Pass' },
      { link: '/jobs', title: 'Job Clockin', highlight: true },
      { link: '/usersonline', title: 'Users Online' },
      { link: '/home', title: 'Home' },
      { link: '/city', title: 'Sydney' },
      { link: '/travel', title: 'Travel' },
      { link: '/bank', title: 'Bank' },
      { link: '/inventory', title: 'Inventory' },
      { link: '/chat', title: 'Chat', badge: 1 },
      { link: '/mailbox', title: 'Mailbox', badge: 0 },
      { link: '/events', title: 'Events', badge: 0 },
      { link: '/forum', title: 'Forum', badge: 3 },
      { link: '/account', title: 'Account' },
      { link: '/search', title: 'Search' },
      { link: '/personal_logs', title: 'Personal Logs' },
      { group: 'Not So Useful' },
      { link: '/gang_home', title: 'Your Gang' },
      { link: '/gang_mail', title: 'Gang Mail', badge: 0 },
      { link: '/crime', title: 'Crime' },
      { link: '/gym', title: 'Gym' },
      { link: '/missions', title: 'Missions' },
      { link: '/operations', title: 'Operations' },
      { link: '/achievements', title: 'Achievements' },
      { link: '/weekly_arena', title: 'Weekly Arena' },
      { link: '/skills', title: 'Skills' },
      { link: '/dailies', title: 'Dailies' },
      { link: '/hospital', title: 'Hospital', badge: 240 },
      { link: '/prison', title: 'Prison', badge: 3 },
      { link: '/pets', title: 'Pets' },
      { link: '/notepad', title: 'Notepad' },
      { link: '/logout', title: 'Logout' },
    ];
  }

  let menuItems = [];
  menu.forEach((val) => {
    if (val.group) {
      let key = 'group' + val.group;
      menuItems.push(
        <MenuGroup className={'group'} key={key}>
          {val.group}
        </MenuGroup>
      );
    } else {
      menuItems.push(
        <MenuLink link={val.link} key={val.link} badge={val.badge}>
          {val.title}
        </MenuLink>
      );
    }
  });

  return <div className={'menu-left'}>{menuItems}</div>;
};

export default Menu;

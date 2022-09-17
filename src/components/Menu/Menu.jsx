import './Menu.scss';
import MenuGroup from './../MenuGroup/MenuGroup';
import MenuLink from './../MenuLink/MenuLink';
import useAuthenticationStatus from '../../hooks/auth/useAuthenticationStatus';
import {checkIsInJob} from '../../api/jobs-api';
import toastr from 'toastr';
import {useDispatch, useSelector} from 'react-redux';
import {setIsInJob} from '../../store/features/pages/jobSlice';

const Menu = () => {
  const isLoggedIn = useAuthenticationStatus();
  const dispatch = useDispatch();
  const isInJob = useSelector((state) => state.jobs.isInJob);

  if (isLoggedIn) {
    checkIsInJob()
      .then((response) => {
        dispatch(setIsInJob(response.data.isInJob));
      })
      .catch((error) => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      });
  }

  let menu = [
    { group: 'Navigation' },
    { link: '/login', title: 'Login' },
    { link: '/sign_up', title: 'Register' },
    { link: '/forgot_password', title: 'Forgot Password' },
  ];

  if (isLoggedIn) {
    menu = [
      { group: 'MAIN STREET' },
      { link: '/', title: 'Home' },
      { link: '/travel', title: 'Travel' },
      { link: '/bank', title: 'Bank' },
      { link: '/inventory', title: 'Inventory' },
      { group: 'Activities' },
      { link: '/crime', title: 'Crime' },
      { link: '/gym', title: 'Gym' },
      { link: '/missions', title: 'Missions' },
      { link: '/operations', title: 'Operations' },
      { link: '/jobs', title: 'Job Clockin', highlight: !isInJob },
      { link: '/achievements', title: 'Achievements' },
      { link: '/arena', title: 'Arena' },
      { link: '/skills', title: 'Skills' },
      { link: '/dailies', title: 'Dailies' },
      {group: 'Communication'},
      { link: '/chat', title: 'Chat', badge: 1 },
      { link: '/events', title: 'Events', badge: 0 },
      { link: '/mailbox', title: 'Mailbox', badge: 0 },
      {group: 'Services'},
      { link: '/hospital', title: 'Hospital', badge: 240 },
      { link: '/prison', title: 'Prison', badge: 3 },
      { link: '/search', title: 'Search Player' },
      { link: '/criminal_pass', title: 'Criminal Pass' },
      { link: '/usersonline', title: 'Users Online' },
      { link: '/city', title: 'Sydney' },
      { link: '/forum', title: 'Forum', badge: 3 },
      { link: '/account', title: 'Account' },
      { link: '/personal_logs', title: 'Personal Logs' },
      { group: 'Not So Useful' },
      { link: '/gang_home', title: 'Your Gang' },
      { link: '/gang_mail', title: 'Gang Mail', badge: 0 },
      { link: '/weekly_arena', title: 'Weekly Arena' },
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
        <MenuLink
          link={val.link}
          key={val.link}
          badge={val.badge}
          highlighted={val.highlight}
        >
          {val.title}
        </MenuLink>
      );
    }
  });

  return <div className={'menu-left'}>{menuItems}</div>;
};

export default Menu;

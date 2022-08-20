import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import './Username.scss'

const Username = ({ generalInfo }) => {
  const isInPrison = useSelector((state) => state.auth.isInPrison);

  return (
    <div className={'user-info-name'}>
      <div className={'user-info-text'}>
        {generalInfo.hasOwnProperty('gangId') ? (
          <Link to={'/gang/' + generalInfo.gangId}>[{generalInfo.gangTag}]</Link>
        ) : (
          ''
        )}{' '}
        <Link to={'/profile.php?id=' + generalInfo.id}>{generalInfo.name}</Link>{' '}
        <span className={'user-info-id'}>[{generalInfo.id}]</span>
      </div>
      <div className={'in-prison-status'}>{
        isInPrison
          ? <i className={'fa fa-bars fa-rotate-90'} title={'You are in prison!'}></i>
          : ''
      }</div>
    </div>
  );
};
export default Username;

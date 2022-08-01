import { Link } from 'react-router-dom';

const Username = ({ generalInfo }) => {
  return (
    <div className={'user-info-name'}>
      {generalInfo.hasOwnProperty('gangId') ? (
        <Link to={'/gang/' + generalInfo.gangId}>[{generalInfo.gangTag}]</Link>
      ) : (
        ''
      )}{' '}
      <Link to={'/profile.php?id=' + generalInfo.id}>{generalInfo.name}</Link>{' '}
      <span className={'user-info-id'}>[{generalInfo.id}]</span>
    </div>
  );
};
export default Username;

import noAvatar from '../../../../assets/img/avatars/no-avatar.png';

const Avatar = ({ generalInfo }) => {
  return (
    <div className='user-info-avatar'>
      <img className='avatar' src={generalInfo.avatar || noAvatar} />
    </div>
  );
};

export default Avatar;

import avatar from '../../../../assets/img/avatars/2.png';

const Avatar = () => {
  return (
    <div className='user-info-avatar'>
      <img className='avatar' src={avatar} />
    </div>
  );
};

export default Avatar;

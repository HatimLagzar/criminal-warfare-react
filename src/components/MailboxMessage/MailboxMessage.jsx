import './MailboxMessage.scss'
import {useSelector} from "react-redux";
import noAvatar from '../../assets/img/avatars/no-avatar.png'

export default ({message}) => {
  const user = useSelector(state => state.auth.generalInfo);

  if (!user) {
    return '';
  }

  const isFromMe = message.userId === user.id;
  const position = message.userId !== user.id ? 'left' : 'right';

  return <div className={'mailbox-message ' + position}>
    <img src={isFromMe ? user.avatar || noAvatar : message.user.avatar || noAvatar} alt="Avatar"/>
    <div className={'mailbox-message-text'}>
      <div className={'mailbox-message-info'}>
        <span dangerouslySetInnerHTML={{__html: message.user.username}}></span>
        <span style={{marginLeft: 5}}>{message.timeAgo}</span>
      </div>
      <p className={'mailbox-message-reply'}
         dangerouslySetInnerHTML={{__html: message.reply}}></p>
    </div>
  </div>
}
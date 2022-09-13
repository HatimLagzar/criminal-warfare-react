import './MailboxMessage.scss';
import { useSelector } from 'react-redux';
import noAvatar from '../../assets/img/avatars/no-avatar.png';
import { reportMessageInMailbox } from '../../api/mailbox-api';
import { useState } from 'react';
import toastr from 'toastr';

export default ({ message }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.generalInfo);

  if (!user) {
    return '';
  }

  function handleReportMessage() {
    setIsLoading(true);

    reportMessageInMailbox(message.id)
      .then((response) => {
        setIsLoading(false);
        toastr.success(response.data.message);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      });
  }

  const isFromMe = message.userId === user.id;
  const position = message.userId !== user.id ? 'left' : 'right';

  return (
    <div className={'mailbox-message ' + position}>
      <img
        src={
          isFromMe ? user.avatar || noAvatar : message.user.avatar || noAvatar
        }
        alt='Avatar'
      />
      <div className={'mailbox-message-text'}>
        <div className={'mailbox-message-info'}>
          <span
            dangerouslySetInnerHTML={{ __html: message.user.username }}
          ></span>
          <span style={{ marginLeft: 5 }}>{message.timeAgo}</span>
        </div>
        <p
          className={'mailbox-message-reply'}
          dangerouslySetInnerHTML={{ __html: message.reply }}
        ></p>
      </div>
      {!isFromMe ? (
        <button
          className='mailbox-message-report-btn'
          onClick={handleReportMessage}
          disabled={isLoading}
        >
          {!isLoading ? (
            <i className='fa fa-flag'></i>
          ) : (
            <i className='fa fa-spinner fa-spin'></i>
          )}
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

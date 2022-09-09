import './ChatDisplay.scss'
import noAvatar from '../../assets/img/avatars/no-avatar.png';
import {reportChat} from "../../api/chats-api";
import toastr from "toastr";
import {useState} from "react";
import {useSelector} from "react-redux";

export default ({chat, quill}) => {
  const user = useSelector(state => state.auth.user);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  function handleReportChat() {
    setIsLoadingReport(true);

    reportChat(chat.id)
      .then(response => {
        setIsLoadingReport(false);
        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsLoadingReport(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return (
    <div className={'chat-display'}>
      <header className={'chat-display-header'}>
        <img src={chat.avatar ? chat.avatar : noAvatar} alt={'Avatar'}/>
        <div className="chat-display-info">
          <span dangerouslySetInnerHTML={{__html: chat.username}}></span>
          <span className={'chat-display-time'}>{chat.timestamp}</span>
        </div>
        <div className={'chat-display-actions'}>
          {
            chat.uid !== user.id
              ? <button disabled={isLoadingReport} title={'Report Message'} onClick={() => handleReportChat()}>
                {!isLoadingReport ? <i className={'fa fa-flag'}></i> : <i className={'fa fa-spinner fa-spin'}></i>}
              </button>
              : ''
          }
          <button title={'Quote'} onClick={() => {
            quill.setContents(quill.clipboard.convert('<blockquote>' + chat.message + '</blockquote>'));
          }}>
            <i className={'fa fa-quote-left'}></i>
          </button>
        </div>
      </header>
      <div className={'chat-display-body'} dangerouslySetInnerHTML={{__html: chat.message}}/>
    </div>
  );
}
import './ConversationsList.scss'
import noAvatar from '../../assets/img/avatars/no-avatar.png'
import {useDispatch, useSelector} from "react-redux";
import {setSearchingForUser, setSelectedConversation} from "../../store/features/pages/mailboxSlice";

export default () => {
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.mailbox.conversations);
  const searchingForUser = useSelector(state => state.mailbox.searchingForUser);

  if (conversations === null) {
    return '';
  }

  function handleCreateNewConversation(conversation) {
    dispatch(setSelectedConversation(conversation.id));
  }

  function showSearch() {
    dispatch(setSearchingForUser(!searchingForUser));
  }

  return <div id={'conversations-list'}>
    <header>
      <span>New Conversation</span>
      <button className={'new-mailbox'} onClick={showSearch}>
        <i className={'fa fa-edit'}></i>
      </button>
    </header>
    <div id="conversations">
      <ul>
        {
          conversations.length > 0
            ? conversations.map(conversation => {
              return <li key={conversation.id + '-conversation'}
                         onClick={() => handleCreateNewConversation(conversation)}>
                <img src={conversation.receiver.avatar || noAvatar} alt={'Avatar'}/>
                <div className="text">
                  <p dangerouslySetInnerHTML={{__html: conversation.receiver.username}}></p>
                  <p dangerouslySetInnerHTML={{__html: conversation.lastMessage ? conversation.lastMessage.reply : ''}}></p>
                </div>
              </li>
            })
            : 'No conversation found!'
        }
      </ul>
    </div>
  </div>
}
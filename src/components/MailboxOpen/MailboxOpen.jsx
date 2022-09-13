import noAvatar from '../../assets/img/avatars/no-avatar.png';
import ButtonForm from "../forms/ButtonForm/ButtonForm";
import './MailboxOpen.scss'
import {useQuill} from "react-quilljs";
import {useEffect, useState} from "react";
import * as Emoji from "quill-emoji";
import {getMailboxMessages, sendMessage} from "../../api/mailbox-api";
import {useDispatch} from "react-redux";
import toastr from "toastr";
import {setMailboxMessages} from "../../store/features/pages/mailboxSlice";
import MailboxMessagesList from "../MailboxMessagesList/MailboxMessagesList";

export default ({mailbox}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const {quill, quillRef, Quill} = useQuill({
    formats: ['image', 'emoji'],
    modules: {
      toolbar: '#toolbar',
      "emoji-toolbar": true,
      "emoji-textarea": true,
      "emoji-shortname": true,
    },
    theme: 'snow',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setNewMessage(quill.root.innerHTML);
      });
    }

    if (Quill) {
      Quill.register("modules/emoji", Emoji);
    }
  }, [quill])

  useEffect(() => {
    if (mailbox.messages === null) {
      getMessage()
    }
  }, [mailbox]);

  function getMessage() {
    getMailboxMessages(mailbox.id)
      .then(response => {
        dispatch(setMailboxMessages({messages: response.data.messages, mailboxId: mailbox.id}))

        setTimeout(getMessage, 2000);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  function handleSendMessage() {
    setIsLoading(true);

    sendMessage(mailbox.id, newMessage)
      .then(response => {
        quill.clipboard.dangerouslyPasteHTML('');
        setNewMessage('');
        setIsLoading(false);
        dispatch(setMailboxMessages({messages: response.data.messages, mailboxId: mailbox.id}))
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <div className={'mailbox-open'}>
    <header>
      <div className="mailbox-open-info">
        <img src={mailbox.receiver.avatar || noAvatar} alt="Avatar"/>
        <div className="mailbox-open-text">
          <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: mailbox.receiver.username}}></p>
          <p style={{marginBottom: 0, marginTop: 7}} dangerouslySetInnerHTML={{__html: mailbox.receiver.status}}></p>
        </div>
      </div>
      <div className="mailbox-open-actions">
        <ButtonForm text={'Delete Chat'}/>
        <ButtonForm text={'Ignore User'}/>
      </div>
    </header>
    <section className="mailbox-open-body">
      {
        mailbox.messages === null
          ? <p>Loading Messages...</p>
          : <MailboxMessagesList mailbox={mailbox}/>
      }
    </section>
    <section className={'mailbox-open-compose-message'}>
      <div id="toolbar">
        <button className="ql-image"></button>
        <button className="ql-emoji"></button>
        <button className="mention-user">
          <i className={'fa fa-user'}></i>
        </button>
      </div>
      <div ref={quillRef}/>
      <ButtonForm
        isLoading={isLoading}
        showLoadingIcon={isLoading}
        text={'Send Message'}
        styles={{marginTop: 5}}
        onSubmitHandler={handleSendMessage}/>
    </section>
  </div>
}
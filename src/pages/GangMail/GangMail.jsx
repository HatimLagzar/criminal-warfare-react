import ContentArea from "../../components/ContentArea/ContentArea";
import GangActions from "../../components/GangActions/GangActions";
import {useEffect} from "react";
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import * as Emoji from "quill-emoji";
import {useQuill} from "react-quilljs";
import toastr from "toastr";
import {useState} from "react";
import {getGangMailMessages, sendGangMailMessage} from "../../api/gangs-api";
import './GangMail.scss'
import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";

export default () => {
  const [chats, setChats] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const {quill, quillRef, Quill} = useQuill({
    formats: ['image', 'align', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'emoji'],
    modules: {
      toolbar: ['image', {align: 'center'}, 'bold', 'italic', 'underline', 'strike', 'blockquote', 'emoji'],
      "emoji-toolbar": true,
      "emoji-textarea": true,
      "emoji-shortname": true,
    },
    theme: 'snow',
  });

  useEffect(() => {
    document.title = 'Gang Mail | Criminal Warfare';
  }, [])

  useEffect(() => {
    if (chats === null) {
      getGangMailMessages()
        .then(response => {
          setChats(response.data.messages);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [])

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

  function handleSendMessage() {
    setIsSendingMessage(true);

    sendGangMailMessage(newMessage)
      .then(response => {
        quill.clipboard.dangerouslyPasteHTML('');
        setIsSendingMessage(false);
        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsSendingMessage(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <div id={'gang-mail-page'}>
    <ContentArea title={'Gang Mail'}>
      <GangActions/>

      <div className="chat-wrapper">
        <div ref={quillRef}/>

        <ButtonForm
          text={'Send'}
          onSubmitHandler={handleSendMessage}
          isLoading={isSendingMessage}
          showLoadingIcon={isSendingMessage}
        />
      </div>
    </ContentArea>

    <div className="chat-container">
      {
        chats instanceof Array
          ? chats.length > 0
            ? chats.map(chat => <ChatDisplay quill={quill} key={chat.id + '-chat'} chat={chat}/>)
            : 'No chats were found!'
          : 'Loading...'
      }
    </div>
  </div>
}
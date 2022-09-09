import {useEffect, useState} from "react";
import toastr from "toastr";
import './ChatPage.scss'
import {getChats, sendMessage} from "../../api/chats-api";
import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";
import 'react-quill/dist/quill.snow.css';
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import * as Emoji from "quill-emoji";
import {useQuill} from "react-quilljs";
import "quill-emoji/dist/quill-emoji.css";

export default () => {
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const {quill, quillRef, Quill} = useQuill({
    formats: ['image', 'align', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'emoji'],
    modules: {
      toolbar: ['image', { align: 'center' }, 'bold', 'italic', 'underline', 'strike', 'blockquote', 'emoji'],
      "emoji-toolbar": true,
      "emoji-textarea": true,
      "emoji-shortname": true,
    },
    theme: 'snow',
  });

  useEffect(() => {
    document.title = 'Chat | Criminal Warfare'

    if (chats === null) {
      getChats()
        .then(response => {
          setChats(response.data.chat);
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

  function hanldePostMessage() {
    setIsSendingMessage(true);

    sendMessage(newMessage)
      .then(response => {
        quill.clipboard.dangerouslyPasteHTML('');
        setIsSendingMessage(false);
        toastr.success(response.data.message);
        setChats([response.data.chat, ...chats])
      })
      .catch(error => {
        setIsSendingMessage(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  if (chats === null) {
    return 'Loading...';
  }

  return <div id={'chat-page'}>
    <div className="chat-wrapper">
      <div ref={quillRef}/>

      <ButtonForm
        text={'Send'}
        onSubmitHandler={hanldePostMessage}
        isLoading={isSendingMessage}
        showLoadingIcon={isSendingMessage}
      />
    </div>

    <div className="chat-container">
      {
        chats.length > 0
          ? chats.map(chat => <ChatDisplay quill={quill} key={chat.id + '-chat'} chat={chat}/>)
          : 'No chats were found!'
      }
    </div>
  </div>
}
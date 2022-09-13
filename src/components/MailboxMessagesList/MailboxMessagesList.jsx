import './mailbox-messages-list.scss';
import MailboxMessage from "../MailboxMessage/MailboxMessage";

export default ({mailbox}) => {
  return <div className={'mailbox-messages-list'}>
    {
      mailbox.messages instanceof Array
        ? mailbox.messages.map(message => {
          return <MailboxMessage message={message} key={message.id + '-message'}/>
        })
        : ''
    }
  </div>
}
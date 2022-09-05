import './MessageArea.scss'

export default function MessageArea({message, type}) {
  return <div className={'message-area ' + (type || '')} dangerouslySetInnerHTML={{__html: message}}></div>
}
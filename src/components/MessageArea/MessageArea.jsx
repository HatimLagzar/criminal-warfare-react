import './MessageArea.scss'

export default function MessageArea({message}) {
  return <div className={'message-area'} dangerouslySetInnerHTML={{__html: message}}></div>
}
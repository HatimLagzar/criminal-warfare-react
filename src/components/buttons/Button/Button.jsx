import './Button.scss';

export default function Button({ text, classes = 'btn-red' }) {
  return <button className={'btn ' + classes}>{text}</button>;
}

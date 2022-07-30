import './Button.scss';

export default function Button({ text, classes }) {
  return <button className={'btn ' + classes}>{text}</button>;
}

import './Button.scss';

export default function Button({text, isLoading = false, classes = 'btn-red'}) {
  return <button className={'btn ' + classes} disabled={isLoading}>{text}</button>;
}

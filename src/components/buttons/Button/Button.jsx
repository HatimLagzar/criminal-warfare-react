import './Button.scss';

export default function Button({
  text,
  isLoading = false,
  classes = 'btn-red',
  showLoadingIcon,
}) {
  return (
    <button className={'btn ' + classes} disabled={isLoading}>
      {showLoadingIcon ? <i className='fa fa-spinner fa-spin'></i> : text}
    </button>
  );
}

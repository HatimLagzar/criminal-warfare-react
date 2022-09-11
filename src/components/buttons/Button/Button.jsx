import './Button.scss';

export default function Button(
  {
    text,
    isLoading = false,
    classes = 'btn-red',
    showLoadingIcon,
    onClick = () => {
    }
  }
) {
  return (
    <button className={'btn ' + classes} disabled={isLoading} onClick={onClick}>
      {showLoadingIcon ? <i className='fa fa-spinner fa-spin'></i> : text}
    </button>
  );
}

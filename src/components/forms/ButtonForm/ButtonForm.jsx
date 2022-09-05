import './ButtonForm.scss';
import Button from '../../buttons/Button/Button';

export default function ButtonForm({
  text,
  isLoading = false,
  classes,
  onSubmitHandler = () => {},
  showLoadingIcon = false,
  styles = {}
}) {
  function handleSubmit(e) {
    e.preventDefault();

    onSubmitHandler(e);
  }

  return (
    <>
      <form className={'button-form'} onSubmit={handleSubmit} style={styles}>
        <Button text={text} classes={classes} isLoading={isLoading} showLoadingIcon={showLoadingIcon} />
      </form>
    </>
  );
}

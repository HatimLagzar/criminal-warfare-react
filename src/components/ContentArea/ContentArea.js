import './ContentArea.scss';

const ContentArea = (props) => {
  let headerClass = 'content-h';
  let contentClass = 'content-c';
  if (props.centerHeader) {
    headerClass += ' ' + 'content-h-center';
  }

  if (props.spacer) {
    headerClass += ' ' + 'spacer';
    contentClass += ' ' + 'spacer';
  }

  return (
    <>
      <div className={headerClass}>{props.title}</div>
      <div className={contentClass}>{props.children}</div>
    </>
  );
};
export default ContentArea;

import './ContentArea.scss';

const ContentArea = (props) => {
  const { centerHeader, spacer, title } = props;

  let headerClass = 'content-h';
  let contentClass = 'content-c';
  if (centerHeader) {
    headerClass += ' ' + 'content-h-center';
  }

  if (spacer) {
    headerClass += ' ' + 'spacer';
    contentClass += ' ' + 'spacer';
  }

  return (
    <>
      <div className={headerClass}>{title}</div>
      <div className={contentClass}>{props.children}</div>
    </>
  );
};
export default ContentArea;

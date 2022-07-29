import './ContentArea.scss';

const ContentArea = (props) => {
  let header_class = 'content-h';
  let content_class = 'content-c';
  if (props.header_center) {
    header_class += ' ' + 'content-h-center';
  }

  if (props.spacer) {
    header_class += ' ' + 'spacer';
    content_class += ' ' + 'spacer';
  }

  return (
    <>
      <div className={header_class}>{props.title}</div>
      <div className={content_class}>{props.children}</div>
    </>
  );
};
export default ContentArea;

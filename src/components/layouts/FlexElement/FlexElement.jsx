import './FlexElement.scss';

const FlexElement = (props) => {
  let classes = 'flex-ele';
  if (props.className) {
    classes += ' ' + props.className;
  }

  return <div className={classes}>{props.children}</div>;
};

export default FlexElement;

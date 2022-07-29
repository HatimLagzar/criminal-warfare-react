import './FlexWrap.scss';

const FlexWrap = (props) => {
  let classes = 'flex-wrap';
  if (props.className) {
    classes += ' ' + props.className;
  }
  return <div className={classes}>{props.children}</div>;
};

export default FlexWrap;

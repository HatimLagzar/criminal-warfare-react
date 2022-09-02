import './FlexElement.scss';

const FlexElement = (props) => {
  let classes = 'flex-ele';
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <div className={classes} style={{ flex: props.flex || 1 }}>
      {props.children}
    </div>
  );
};

export default FlexElement;

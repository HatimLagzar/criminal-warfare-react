import './FlexRow.scss';

const FlexRow = (props) => {
  let classes = 'flex-row';
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <div className={classes} style={{ gap: props.gap }}>
      {props.children}
    </div>
  );
};

export default FlexRow;

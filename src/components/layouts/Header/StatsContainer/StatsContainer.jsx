import FlexEle from '../../FlexElement/FlexElement';

const StatsContainer = (props) => {
  return (
    <FlexEle>
      <div className={props.className}>{props.children}</div>
    </FlexEle>
  );
};

export default StatsContainer;

import './HeaderBarBackground.scss';

const HeaderBarBackground = (props) => {
  return <div className={'menu-top desktop-only'}>{props.children}</div>;
};

export default HeaderBarBackground;

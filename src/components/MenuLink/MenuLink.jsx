import { Link } from 'react-router-dom';
import MenuBadge from './MenuBadge';

const MenuLink = (props) => {
  let badge = '';
  if (Number.isInteger(props.badge)) {
    badge = <MenuBadge badge={props.badge} link={props.link} />;
  }

  return (
    <Link to={props.link}>
      {props.highlighted ? (
        <span className='red-text'>{props.children}</span>
      ) : (
        props.children
      )}
      {badge}
    </Link>
  );
};
export default MenuLink;

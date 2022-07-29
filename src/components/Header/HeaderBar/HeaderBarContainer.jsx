import { Link } from 'react-router-dom';
import FlexElement from '../../FlexElement/FlexElement';
import './HeaderBarContainer.scss';

let HeaderBarContainer = (props) => {
  let links = [];
  let count = '';
  let countPrefix = '';
  let countSuffix = '';
  for (let i = 0; i < props.links.length; i++) {
    if (props.links[i].count > 0) {
      countPrefix = ' [';
      count = <span className='notification'>{props.links[i].count}</span>;
      countSuffix = ']';
    } else {
      countPrefix = countSuffix = count = '';
    }

    let i_class = props.links[i].fa + ' fa-' + props.links[i].icon;
    let icon = <i className={i_class}></i>;
    let title = <span>{props.links[i].name}</span>;
    links.push(
      <Link
        className={'menu-top-link'}
        to={props.links[i].link}
        key={props.links[i].link}
      >
        {icon}
        {title}
        {countPrefix}
        {count}
        {countSuffix}
      </Link>
    );
  }

  return <FlexElement className={props.className}>{links}</FlexElement>;
};

export default HeaderBarContainer;

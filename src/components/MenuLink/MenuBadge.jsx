const MenuBadge = (props) => {
  let id = 'badge-' + props.link;

  return (
    <span className={props.styles.badge} data-count={props.badge} id={id}>
      {props.badge}
    </span>
  );
};
export default MenuBadge;

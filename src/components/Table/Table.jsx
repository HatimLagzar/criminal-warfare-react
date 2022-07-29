import './Table.scss';
import TableRow from './TableRow';

function Table(props) {
  let tbody = [];
  props.data.forEach((row, index) => {
    if (index == 0 && !props.no_header) {
      tbody.push(<TableRow header={row} />);
    } else {
      tbody.push(<TableRow content={row} />);
    }
  });

  let classes = props.className ? `${'table'} ${props.className}` : 'table';

  return <table className={classes}>{tbody}</table>;
}

export default Table;

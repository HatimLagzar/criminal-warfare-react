import './Table.scss';
import TableRow from './TableRow';

function Table(props) {
  let tbody = [];
  props.data.forEach((row, index) => {
    if (index == 0 && !props.noHeader) {
      tbody.push(<TableRow key={index} header={row} />);
    } else {
      tbody.push(<TableRow key={index} content={row} />);
    }
  });

  let classes = props.className ? `${'table'} ${props.className}` : 'table';

  return <table className={classes}>{tbody}</table>;
}

export default Table;

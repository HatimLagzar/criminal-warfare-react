function TableRow(props) {
  let columns = [];
  if (props.row) {
    props.row.forEach((element) => {
      if (element.header) {
        columns.push(<th>{element.header}:</th>);
      } else {
        columns.push(<td>{element.content}</td>);
      }
    });
  } else if (props.header) {
    props.header.forEach((element) => {
      columns.push(<th>{element}</th>);
    });
  } else if (props.content) {
    props.content.forEach((element) => {
      columns.push(<td>{element}</td>);
    });
  }

  return <tr>{columns}</tr>;
}

export default TableRow;

function TableRow(props) {
  let columns = [];
  if (props.row) {
    props.row.forEach((element, index) => {
      if (element.header) {
        columns.push(<th key={index}>{element.header}:</th>);
      } else {
        columns.push(<td key={index}>{element.content}</td>);
      }
    });
  } else if (props.header) {
    props.header.forEach((element, index) => {
      columns.push(<th key={index}>{element}</th>);
    });
  } else if (props.content) {
    props.content.forEach((element, index) => {
      columns.push(<td key={index}>{element}</td>);
    });
  }

  return <tr>{columns}</tr>;
}

export default TableRow;

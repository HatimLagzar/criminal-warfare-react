import ButtonForm from "../forms/ButtonForm/ButtonForm";

export default function OperationItem({operation}) {
  return <div className={'operation-item'}>
    <table className={'table'}>
      <thead>
      <tr>
        <th dangerouslySetInnerHTML={{__html: operation['title']}}></th>
        <td>#{operation['tounlock']}</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td dangerouslySetInnerHTML={{__html: operation['objectives']}}></td>
        <td dangerouslySetInnerHTML={{__html: operation['pay']}}></td>
      </tr>
      <tr>
        <td colSpan={2}>
          <ButtonForm text={'Start'} classes={'btn btn-link'}/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
}
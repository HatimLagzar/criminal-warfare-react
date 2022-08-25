import Button from "../buttons/Button/Button";

export default function PremiumOperationItem({title, cost}) {
  return <div className={'operation-item'}>
    <table className={'table'}>
      <thead>
      <tr>
        <th colSpan={2} style={{textAlign: 'center'}}>{title}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Cost: {cost}</td>
        <td>
          <Button text={'Buy'} />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
}
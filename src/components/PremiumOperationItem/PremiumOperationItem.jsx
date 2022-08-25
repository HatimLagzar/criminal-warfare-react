import Button from "../buttons/Button/Button";
import './PremiumOperationItem.scss'

export default function PremiumOperationItem({title, cost}) {
  return <div className={'premium-operation-item'}>
    <table className={'table'}>
      <tbody>
      <tr>
        <th colSpan={2} style={{textAlign: 'center'}}>{title}</th>
      </tr>
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
import {formatMoney, formatNumber} from "../../utils/helpers/formatters";
import {ucfirst} from "../../utils/helpers/strings";
import Button from "../buttons/Button/Button";

export default function OperationItem({operation}) {
  const type = ucfirst(operation.requirements.split('|')[0]);
  const reward = parseInt(operation.requirements.split('|')[3]);
  const rewardType = operation.requirements.split('|')[2];

  return <div className={'operation-item'}>
    <table className={'table'}>
      <thead>
      <tr>
        <th>{type}</th>
        <td>#{operation.tounlock}</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{type} [x{operation.requirements.split('|')[1]}]</td>
        {
          parseInt(reward) > 0
            ? <td className={'green-text'}>
              [+{rewardType === 'money' || rewardType === 'bank' ? formatMoney(reward) : formatNumber(reward) + ' Points'}]
            </td>
            : <td>No Payouts</td>
        }
      </tr>
      <tr>
        <td colSpan={2}>
          <Button text={'Start'} classes={'btn btn-link'}/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
}
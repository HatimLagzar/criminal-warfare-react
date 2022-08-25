import './OperationInProgress.scss'

export default function OperationInProgress({userOperation}) {
  return <div className={'operation-in-progress'}>
    <table className={'table'}>
      <thead>
      <tr>
        <th>What to do?</th>
        <th>Done so far</th>
        <th>How many required</th>
        <th>Payout</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{userOperation.operation.title}</td>
        <td>{userOperation.done}</td>
        <td>{userOperation.operation.objectives}</td>
        <td dangerouslySetInnerHTML={{__html: userOperation.operation.pay}}></td>
      </tr>
      </tbody>
    </table>
  </div>
}
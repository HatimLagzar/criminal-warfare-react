import { formatMoney, formatNumber } from '../../../utils/helpers/formatters';

const UserInfo = ({ generalInfo }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Level:</td>
            <td>{generalInfo.level}</td>
          </tr>
          <tr>
            <td>Money:</td>
            <td>{formatMoney(generalInfo.money)} </td>
          </tr>
          <tr>
            <td>Bank:</td>
            <td>{formatMoney(generalInfo.bank)} </td>
          </tr>
          <tr>
            <td>Points:</td>
            <td>
              <span id='info-points'>{formatNumber(generalInfo.points)}</span> +{' '}
              <a href='/point_dealer.php'>
                {formatNumber(generalInfo.dealerPoints)}
                <span id='info-dpoints'></span>
              </a>
            </td>
          </tr>
          <tr>
            <td>Activity:</td>
            <td>
              {formatNumber(generalInfo.activityPoints)}{' '}
              <a href='/activity_points.php'>[spend]</a>
            </td>
          </tr>
          <tr>
            <td>Credits:</td>
            <td>
              {formatNumber(generalInfo.credits)}{' '}
              <a href='/upgrade.php'>[buy/use]</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default UserInfo;

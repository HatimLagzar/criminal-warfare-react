import { refill } from '../../api/refill-api';
import { getPercentage } from '../../utils/helpers/math';
import './PlayerAttribute.scss';
import toastr from 'toastr';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';

export default function PlayerAttribute({
  label,
  value,
  maxValue,
  color = 'green',
  isRefillable = false,
  refillType,
  handleAfterRefill,
}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleRefill() {
    if (isRefillable === false) {
      return;
    }

    setIsLoading(true);

    refill(refillType)
      .then((response) => {
        setIsLoading(false);
        handleAfterRefill(response.data.value);
        toastr.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        setIsLoading(false);
      });
  }

  return (
    <div className='player-attribute'>
      <div
        className={'attribute-name ' + (isRefillable ? 'refillable' : '')}
        title={isRefillable ? 'Click to refill' : ''}
        onClick={handleRefill}
      >
        {isLoading ? <Spinner size={20} color={'#ccc'} /> : label}
      </div>
      <div className={'attribute-progress'}>
        <span>
          {value}/{maxValue}
        </span>
        <div
          className={'inner-bg ' + color}
          style={{ width: (value / maxValue) * 100 + '%' }}
        ></div>
      </div>
      <div className='attribute-percentage'>
        [{getPercentage(value, maxValue)}]
      </div>
    </div>
  );
}

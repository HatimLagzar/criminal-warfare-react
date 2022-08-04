import { useState } from 'react';
import toastr from 'toastr';
import { withdrawMoney } from '../../api/bank-api';
import ButtonForm from '../../components/forms/ButtonForm/ButtonForm';
import { formatMoney } from '../../utils/helpers/formatters';
import './ListQuickWithdrawals.scss';

export default function ListQuickWithdrawals({ options }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmitQuickWithdraw(amount) {
    setIsLoading(true);

    withdrawMoney(amount)
      .then((response) => {
        toastr.success(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        setIsLoading(false);
      });
  }

  return (
    <ul className='quick-withdrawals-list'>
      {options instanceof Array
        ? options.map((option, index) => {
            return (
              <li key={index + '-quick-withdraw-option'}>
                <ButtonForm
                  text={formatMoney(option)}
                  onSubmitHandler={() => handleSubmitQuickWithdraw(option)}
                  isLoading={isLoading}
                />
              </li>
            );
          })
        : ''}
    </ul>
  );
}

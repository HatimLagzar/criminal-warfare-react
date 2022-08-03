import { useState } from 'react';
import toastr from 'toastr';
import { depositMoney } from '../../api/bank-api';
import Button from '../../components/buttons/Button/Button';
import Input from '../../components/forms/Input/Input';
import './DepositForm.scss';

export default function DepositForm() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    depositMoney(amount)
      .then((response) => {
        setIsLoading(false);
        toastr.success(response.data.message);
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.response) {
          toastr.error(error.response.data.message);
        }
      });
  }

  return (
    <form className='deposit-form' onSubmit={handleSubmit}>
      <Input
        id={'deposit-input'}
        type={'text'}
        value={amount}
        handleInputChange={(e) => setAmount(e.currentTarget.value)}
      />
      <Button
        text={'Deposit'}
        isLoading={isLoading}
        showLoadingIcon={isLoading}
      />
    </form>
  );
}

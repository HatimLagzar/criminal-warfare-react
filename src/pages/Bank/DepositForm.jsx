import {useState} from 'react';
import toastr from 'toastr';
import {depositMoney} from '../../api/bank-api';
import Button from '../../components/buttons/Button/Button';
import Input from '../../components/forms/Input/Input';
import './DepositForm.scss';
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInfo} from "../../store/features/auth/authSlice";

export default function DepositForm() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    depositMoney(amount)
      .then((response) => {
        setIsLoading(false);
        toastr.success(response.data.message);
        dispatch(setGeneralInfo({
          ...generalInfo,
          money: parseInt(generalInfo.money) - parseInt(amount),
          bank: parseInt(generalInfo.bank) + parseInt(amount)
        }));

        setAmount(0);
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

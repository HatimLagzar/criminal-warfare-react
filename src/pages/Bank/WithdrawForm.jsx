import {useState} from 'react';
import toastr from 'toastr';
import Button from '../../components/buttons/Button/Button';
import Input from '../../components/forms/Input/Input';
import './WithdrawForm.scss';
import {withdrawMoney} from '../../api/bank-api';
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInfo} from "../../store/features/auth/authSlice";

export default function WithdrawForm() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    withdrawMoney(amount)
      .then((response) => {
        setIsLoading(false);
        toastr.success(response.data.message);
        dispatch(setGeneralInfo({
          ...generalInfo,
          money: parseInt(generalInfo.money) + parseInt(amount),
          bank: parseInt(generalInfo.bank) - parseInt(amount)
        }));

        setAmount(0)
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.response) {
          toastr.error(error.response.data.message);
        }
      });
  }

  return (
    <form className='withdraw-form' onSubmit={handleSubmit}>
      <Input
        id={'withdraw-input'}
        type={'text'}
        value={amount}
        handleInputChange={(e) => setAmount(e.currentTarget.value)}
      />

      <Button
        text={'Withdraw'}
        isLoading={isLoading}
        showLoadingIcon={isLoading}
      />
    </form>
  );
}

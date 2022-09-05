import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import InputGroup from "../../components/forms/InputGroup/InputGroup";
import Button from "../../components/buttons/Button/Button";
import {spinSlotMachine} from "../../api/dailies-api";
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import toastr from "toastr";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bet, setBet] = useState(500);
  const [turns, setTurns] = useState(1000);
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);

  useEffect(() => {
    document.title = 'Slot Machine | Criminal Warfare';
  })

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    spinSlotMachine(bet, turns)
      .then(response => {
        setIsLoading(false);
        toastr.success(response.data.message);
        dispatch(setGeneralInfo({
          ...generalInfo,
          money: generalInfo.money + response.data.difference
        }));
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <div id={'slot-machine-page'}>
    <ContentArea title={'Slot Machine'}>
      <p className={'text-center'}>Enter the amount you would like to bet, how many turns you would like to use, then
        hit the Spin button!</p>
      <p className={'text-center'}>You are allowed to bet $500 per turn.</p>
      <form style={{
        width: '50%',
        margin: '0 auto'
      }}
            onSubmit={handleSubmit}>
        <InputGroup id={'betInput'}
                    label={'Bet'}
                    value={bet}
                    handleInputChange={e => setBet(parseInt(e.currentTarget.value))}/>

        <InputGroup id={'turnsInput'}
                    label={'Turns'}
                    value={turns}
                    handleInputChange={e => setTurns(parseInt(e.currentTarget.value))}/>
        <Button isLoading={isLoading} showLoadingIcon={isLoading} text={'Spin'}/>
      </form>
    </ContentArea>
  </div>
}
import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import InputGroup from "../../components/forms/InputGroup/InputGroup";
import Button from "../../components/buttons/Button/Button";
import {getDailies, spinSlotMachine} from "../../api/dailies-api";
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import toastr from "toastr";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailiesData, setDailiesData] = useState(null);
  const [bet, setBet] = useState(500);
  const [spins, setSpins] = useState(1000);
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);

  useEffect(() => {
    document.title = 'Slot Machine | Criminal Warfare';

    if (dailiesData === null) {
      getDailies()
        .then(response => {
          setDailiesData(response.data.payload);
        })
        .catch(error => {
          if (error.response)
            toastr.error(error.response.data.message);

          console.log(error);
        })
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    spinSlotMachine(bet, spins)
      .then(response => {
        setIsLoading(false);

        setDailiesData({
          ...dailiesData,
          "Slot Machine": {
            ...dailiesData['Slot Machine'],
            amount: dailiesData.dailies['Slot Machine'].amount + spins
          }
        })

        dispatch(setGeneralInfo({
          ...generalInfo,
          money: generalInfo.money + response.data.difference
        }));

        toastr.success(response.data.message);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  if (dailiesData === null) {
    return 'Loading...';
  }

  return <div id={'slot-machine-page'}>
    <ContentArea title={'Slot Machine'}>
      <p className={'text-center'}>Enter the amount you would like to bet, how many turns you would like to use, then
        hit the Spin button!</p>
      <p className={'text-center'}>You are allowed to bet $500 per turn.</p>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '50%',
          margin: '20px auto',
        }}
      >
        <InputGroup id={'betInput'}
                    label={'Bet'}
                    value={bet}
                    handleInputChange={e => setBet(parseInt(e.currentTarget.value))}/>

        <InputGroup id={'turnsInput'}
                    label={'Turns'}
                    value={spins}
                    handleInputChange={e => setSpins(parseInt(e.currentTarget.value))}/>

        <Button isLoading={isLoading} showLoadingIcon={isLoading} text={'Spin'}/>

        <span> You've {dailiesData.dailies['Slot Machine'].goal - dailiesData.dailies['Slot Machine'].amount} spins left.</span>
      </form>
    </ContentArea>
  </div>
}
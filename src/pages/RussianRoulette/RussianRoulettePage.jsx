import ContentArea from "../../components/ContentArea/ContentArea";
import {useDispatch, useSelector} from "react-redux";
import {getDailies, runRussianRoulette} from "../../api/dailies-api";
import toastr from "toastr";
import {useEffect, useState} from "react";
import './RussianRoulettePage.scss'
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import Input from "../../components/forms/Input/Input";
import Button from "../../components/buttons/Button/Button";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailiesData, setDailiesData] = useState(null);
  const [bullets, setBullets] = useState('');
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);

  useEffect(() => {
    document.title = 'Russian Roulette | Criminal Warfare';

    if (dailiesData === null) {
      getDailies()
        .then(response => {
          setDailiesData(response.data.payload);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [])

  function handleRunRussianRoulette(e) {
    e.preventDefault();

    setIsLoading(true)

    runRussianRoulette(bullets)
      .then(response => {
        setIsLoading(false);
        setBullets('0');
        setResult(response.data);

        dispatch(setGeneralInfo({
          ...generalInfo,
          points: generalInfo.points + response.data.payout,
        }));

        setDailiesData({
          ...dailiesData,
          dailies: {
            ...dailiesData.dailies,
            "Russian Roulette": {
              ...dailiesData.dailies['Russian Roulette'],
              amount: dailiesData.dailies['Russian Roulette'].amount - bullets
            }
          }
        })
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

  return <div id={'russian-roulette-page'}>
    <ContentArea title={'Russian Roulette'}>

      <p className={'text-center'}>You have <span
        className={'red-text'}>{dailiesData.dailies['Russian Roulette'].amount}</span> attempts left.</p>


      {
        result !== null
        ? <>
            <hr/>
            <p className="intro">{result.intro}</p>
            <p className="outcome">{result.outcome}</p>
            <hr/>
          </>
          : ''
      }

      <p>We are handing you a 6-shot revolver, you have the choice to load as many bullets as you want. You only
        have to put the gun to the side of your head and pull the trigger once. If you are lucky and live, you can
        walk away with a prize. If not so lucky, you win a free ride to the hospital.</p>
      <form
        onSubmit={handleRunRussianRoulette}
        style={{
          width: '50%',
          margin: '20px auto',
          textAlign: 'center'
        }}>
        <label htmlFor="">Load gun with </label>
        <Input placeholder={'1-6'}
               styles={{width: 'auto'}}
               value={bullets}
               handleInputChange={e => setBullets(e.currentTarget.value)}/>
        <span> bullets. [1-6]</span>
        <Button classes={'btn btn-red shoot-myself-btn'} text={'Shoot Myself!'} isLoading={isLoading}
                showLoadingIcon={isLoading}/>
      </form>


    </ContentArea>
  </div>
}
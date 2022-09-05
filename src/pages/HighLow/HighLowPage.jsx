import ContentArea from "../../components/ContentArea/ContentArea";
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import {useDispatch, useSelector} from "react-redux";
import {getHighLowInfo, playHighLow} from "../../api/dailies-api";
import {useEffect, useState} from "react";
import './HighLowPage.scss'
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import MessageArea from "../../components/MessageArea/MessageArea";
import {formatMoney} from "../../utils/helpers/formatters";
import {CDN_URL} from "../../utils/constants/global";
import Spinner from "../../components/Spinner/Spinner";
import toastr from "toastr";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [highLowData, setHighLowData] = useState(null);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);

  useEffect(() => {
    document.title = 'High Low | Criminal Warfare';

    if (highLowData === null) {
      getHighLowInfo()
        .then(response => {
          setHighLowData(response.data)
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [])

  function handlePlay(choice) {
    setIsLoading(true)

    playHighLow(choice)
      .then(response => {
        setIsLoading(false);
        setResult(response.data);

        setHighLowData(response.data.highLowData);

        if (response.data.isCorrect) {
          dispatch(setGeneralInfo({
            ...generalInfo,
            money: generalInfo.money + response.data.money
          }));
        } else {
          dispatch(setGeneralInfo({
            ...generalInfo,
            money: generalInfo.money - response.data.money
          }));
        }
      })
      .catch(error => {
        setIsLoading(false)
        if (error.response) {
          setResult({
            message: error.response.data.message,
            isCorrect: false
          });
        }

        console.log(error);
      })
  }

  if (highLowData === null || generalInfo === null) {
    return 'Loading...';
  }

  return <div id={'high-low-page'}>
    {
      result
        ? <MessageArea message={result.message} type={result.isCorrect ? 'success' : 'danger'}/>
        : ''
    }

    <ContentArea title={'HIGH/LOW'}>
      <p className={'text-center'}>Plays Left: <span style={{color: '#00ffff'}}>{highLowData.usesLeft}</span></p>
      <p className={'text-center'}>Cash: <span style={{color: '#FF8080'}}>{formatMoney(generalInfo.money)}</span></p>

      <img
        className={'card'}
        src={CDN_URL + `/img/cards/${highLowData.currentCard.currentCardType}/${highLowData.currentCard.currentCardValue}.gif`}
        alt={'Card'}/>

      <div className={'high-low-actions'}>
        {
          isLoading
            ? <Spinner/>
            : <>
              <ButtonForm
                text={'Higher'}
                onSubmitHandler={() => handlePlay('HIGHER')}
              />

              <ButtonForm
                text={'Lower'}
                onSubmitHandler={() => handlePlay('LOWER')}
              />
            </>
        }
      </div>

      <div className="rules">
        <h3>How To Play:</h3>
        Simply guess if the next card is <br/>
        valued higher or lower.<br/>Ace is high and 2's are low.<br/>
        <span style={{color: '#02C002'}}>If you win, you win <span
          style={{fontWeight: 'bold', color: '#02C002'}}>$5,000</span>.</span><br/>
        <span style={{"color": '#FF8080'}}>If you lose, you lose <span
          style={{fontWeight: 'bold', color: '#FF8080'}}>$10,000</span>.</span><br/><span style={{color: '#FF8080'}}>Ties go to the game.</span>
      </div>
    </ContentArea>
  </div>
}
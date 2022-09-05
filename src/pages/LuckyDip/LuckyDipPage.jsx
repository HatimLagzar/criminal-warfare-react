import ContentArea from "../../components/ContentArea/ContentArea";
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import {useDispatch, useSelector} from "react-redux";
import {playLuckyDip} from "../../api/dailies-api";
import {useEffect, useState} from "react";
import './LuckyDipPage.scss'
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import MessageArea from "../../components/MessageArea/MessageArea";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);

  useEffect(() => {
    document.title = 'Lucky Dip | Criminal Warfare';
  }, [])

  function handlePlay() {
    setIsLoading(true)

    playLuckyDip()
      .then(response => {
        setIsLoading(false);
        setResult(response.data);

        dispatch(setGeneralInfo({
          ...generalInfo,
          money: generalInfo.money + response.data.difference
        }));

      })
      .catch(error => {
        setIsLoading(false)
        if (error.response) {
          setResult({
            message: error.response.data.message,
            isProfitable: false
          });
        }

        console.log(error);
      })
  }

  return <div id={'lucky-dip-page'}>
    {
      result
        ? <MessageArea message={result.message} type={result.isProfitable ? 'success' : 'danger'} />
        : ''
    }
    <ContentArea title={'Lucky Dip'}>
      <p className={'text-center'}>Welcome to Lucky Dip. Would you like the chance to win big money or an item? it costs
        $10,000 and you can only play once a day.</p>
      <ButtonForm
        isLoading={isLoading}
        showLoadingIcon={isLoading}
        text={'Play'}
        styles={{margin: '0 auto 15px', display: 'block', textAlign: 'center'}}
        onSubmitHandler={handlePlay}
      />
    </ContentArea>
  </div>
}
import {useEffect, useState} from "react";
import toastr from "toastr";
import ContentArea from "../../components/ContentArea/ContentArea";
import {getAllCrimes} from "../../api/crime-api";
import CrimeItem from "../../components/CrimeItem/CrimeItem";
import './CrimePage.scss'
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import {bailFromPrison} from "../../api/prison-api";
import {setIsInPrison} from "../../store/features/auth/authSlice";
import {useDispatch} from "react-redux";

export default function CrimePage() {
  const [bailIsLoading, setBailIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [crimes, setCrimes] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Crimes | Criminal Warfare';

    if (crimes === null) {
      getAllCrimes()
        .then(response => {
          setCrimes(response.data.crimes);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message)
          }

          console.log(error)
        })
    }
  }, [crimes])

  if (crimes === null) {
    return 'Loading...';
  }

  return <div id={'crime-page'}>
    <ContentArea title={'Crimes'}>
      <div className={'crime-page-actions'}>
        <ButtonForm text={'Refill Nerve'} />
        <div>
          <ButtonForm isLoading={bailIsLoading} showLoadingIcon={bailIsLoading} text={'Bail'} onSubmitHandler={() => {
            setBailIsLoading(true)
            bailFromPrison()
              .then(response => {
                setMessage(response.data.message)
                setBailIsLoading(false)
                dispatch(setIsInPrison(false))
              })
              .catch(error => {
                if (error.response) {
                  setMessage(error.response.data.message)
                }

                console.log(error)
                setBailIsLoading(false)
              })
          }} />

          <ButtonForm text={'Prison Key'} onSubmitHandler={() => {
            bailFromPrison()
              .then(response => {
                setMessage(response.data.message)
              })
              .catch(error => {
                if (error.response) {
                  setMessage(error.response.data.message)
                }

                console.log(error)
              })
          }} />
        </div>
      </div>
      <div id="crime-result" dangerouslySetInnerHTML={{__html: message}}></div>
      <div className="crimes-list">
        {
          crimes instanceof Array && crimes.length > 0
            ? crimes.map(crime => <CrimeItem setMessage={setMessage} crime={crime} />)
            : ''
        }
      </div>
    </ContentArea>
  </div>
}
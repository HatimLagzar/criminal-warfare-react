import {useEffect, useState} from "react";
import toastr from "toastr";
import ContentArea from "../../components/ContentArea/ContentArea";
import {getAllCrimes} from "../../api/crime-api";
import CrimeItem from "../../components/CrimeItem/CrimeItem";
import './CrimePage.scss'

export default function CrimePage() {
  const [message, setMessage] = useState('');
  const [crimes, setCrimes] = useState(null);

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
import toastr from "toastr";
import {formatMoney, formatNumber} from "../../utils/helpers/formatters";
import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {doCrime, doCrimeFast} from "../../api/crime-api";
import './CrimeItem.scss'
import {useState} from "react";

export default function CrimeItem({crime}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCrimeFastLoading, setIsCrimeFastLoading] = useState(false);

  return <div className={'crime-item'}>
    <div className="crime-header">
      <span className={'crime-name'}>{crime.name}</span>
      <span>{crime.nerve} Nerve</span>
    </div>
    <div className="crime-body">
      <div className="crime-info">
        <span className="money">{formatMoney(crime.money)}</span>
        <span className="exp">{formatNumber(crime.exp)} XP</span>
      </div>
      <div className="crime-actions">
        <ButtonForm showLoadingIcon={isLoading} isLoading={isLoading} text={'Do'} onSubmitHandler={() => {
          setIsLoading(true);

          doCrime(crime.id)
            .then(response => {
              setIsLoading(false);
              toastr.success(response.data.message);
            })
            .catch(error => {
              setIsLoading(false);

              if (error.response) {
                toastr.error(error.response.data.message);
              }

              console.log(error)
            })
        }}/>

        <ButtonForm showLoadingIcon={isCrimeFastLoading} text={'Do Fast'} isLoading={isCrimeFastLoading} onSubmitHandler={() => {
          setIsCrimeFastLoading(true);

          doCrimeFast(crime.id)
            .then(response => {
              setIsCrimeFastLoading(false);
              toastr.success(response.data.message);
            })
            .catch(error => {
              setIsCrimeFastLoading(false);

              if (error.response) {
                toastr.error(error.response.data.message);

              }
              console.log(error)
            })
        }} />
      </div>
    </div>
  </div>
}
import ContentArea from "../../components/ContentArea/ContentArea";
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import {useDispatch, useSelector} from "react-redux";
import {getDailies, searchDowntown} from "../../api/dailies-api";
import toastr from "toastr";
import {useEffect, useState} from "react";
import {formatMoney, formatNumber} from "../../utils/helpers/formatters";
import './SearchDowntownPage.scss'
import {setGeneralInfo} from "../../store/features/auth/authSlice";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dailiesData, setDailiesData] = useState(null);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);

  useEffect(() => {
    document.title = 'Search Downtown | Criminal Warfare';

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

  function handleSearchDowntown() {
    setIsLoading(true)

    searchDowntown()
      .then(response => {
        setIsLoading(false);
        setResult(response.data);

        dispatch(setGeneralInfo({
          ...generalInfo,
          money: generalInfo.money + response.data.money,
          points: generalInfo.points + response.data.points,
        }));

      })
      .catch(error => {
        setIsLoading(false)
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  if (dailiesData === null) {
    return 'Loading...';
  }

  return <div id={'search-downtown-page'}>
    <ContentArea title={'Search Downtown'}>
      {
        result === null
          ? <>
            <p className={'text-center'}>You have {dailiesData.dailies['Search Downtown'].amount} searches left.</p>
            <ButtonForm
              isLoading={isLoading}
              showLoadingIcon={isLoading}
              text={'Search Downtown'}
              styles={{margin: '0 auto 15px', display: 'block', textAlign: 'center'}}
              onSubmitHandler={handleSearchDowntown}
            />
          </>
          : <>
            <table>
              <thead>
              <tr>
                <th>Points Found <br/><span className={'green-text'}>{formatNumber(result.points)}</span></th>
                <th>Money Found <br/><span className={'green-text'}>{formatMoney(result.money)}</span></th>
                <th>Items Found <br/><span className={'green-text'}>{formatNumber(result.items)}</span></th>
              </tr>
              </thead>
            </table>
            <table className={'result-details'} style={{marginTop: '10px', marginBottom: '10px'}}>
              <tbody>
              {
                Object.values(result.searchLog).map((log, index) => {
                  return <tr key={index + '-search-log'}>
                    <td>{index + 1}.</td>
                    <td>{log}</td>
                  </tr>
                })
              }
              </tbody>
            </table>
          </>
      }

    </ContentArea>
  </div>
}
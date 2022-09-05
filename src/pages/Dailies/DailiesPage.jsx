import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import {getDailies} from "../../api/dailies-api";
import toastr from "toastr";
import Button from "../../components/buttons/Button/Button";
import DailiesProgressBar from "../../components/DailiesProgressBar/DailiesProgressBar";
import './DailiesPage.scss'

export default function DailiesPage() {
  const [dailiesData, setDailiesData] = useState(null);

  useEffect(() => {
    document.title = 'Dailies | Criminal Warfare'

    if (dailiesData === null) {
      getDailies()
        .then(response => {
          setDailiesData(response.data.payload);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error)
        })
    }
  })

  if (dailiesData === null) {
    return 'Loading...';
  }

  return <div id={'dailies-page'}>
    <ContentArea title={'Dailies / Weeklies'}>
      <table>
        <thead>
        <tr>
          <th
            className={'text-center'}
            style={{
              backgroundColor: 'rgba(220,0,0,.1)'
            }}
            colSpan={3}>
            Dailies
          </th>
        </tr>
        </thead>
        <tbody>
        {
          Object.values(dailiesData.dailies).length > 0
            ? Object.values(dailiesData.dailies).map((daily, index) => {
              let end = daily.goal;
              if (daily['goal'] !== 0) {
                end = daily['goal'];
              } else if (daily['barWidth'] !== 0) {
                end = daily['barWidth'];
              }

              return <tr key={index + '-daily'}>
                <td>{daily.name}</td>
                <td>
                  <DailiesProgressBar
                    current={daily.goal === 0 ? end - parseInt(daily.amount) : parseInt(daily.amount)}
                    max={end}
                    increment={parseInt(daily.perBar)}
                    showText={daily.hasOwnProperty('goal_days') && daily.text.includes('working')}/>
                  <br/>
                  {daily.text}
                </td>
                <td><Button text={'Go To'}/></td>
              </tr>
            })
            : ''
        }
        </tbody>
      </table>
    </ContentArea>
  </div>
}
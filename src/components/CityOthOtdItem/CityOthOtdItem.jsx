import ContentArea from "../ContentArea/ContentArea";
import {formatNumber} from "../../utils/helpers/formatters";
import {useState} from "react";
import {getTopFiveOthOtd} from "../../api/user-api";
import toastr from "toastr";

export default ({ofthes, keyName, title, name}) => {
  const [shouldListTopFive, setShouldListTopFive] = useState(false);
  const [topFive, setTopFive] = useState(null);

  function hanldeShowTopFive() {
    setShouldListTopFive(!shouldListTopFive);

    getTopFiveOthOtd(keyName)
      .then(response => {
        setTopFive(response.data.topFive);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <div className={'city-content-item oth-otd'} onClick={hanldeShowTopFive}>
    <div className={'city-content-item-first'}>
      <ContentArea centerHeader title={title}>
        {
          ofthes
            ? <ul className={'unstyled-list'}>
              <li dangerouslySetInnerHTML={{__html: ofthes.top[keyName].user.username}}></li>
              <li>{formatNumber(ofthes.top[keyName].value)} {name}</li>
              <li>Mine: {formatNumber(ofthes.mine[keyName].value)} {name}</li>
            </ul>
            : ''
        }
      </ContentArea>
    </div>

    <div className={'city-content-item-top-five'}>
      {
        shouldListTopFive
          ? topFive instanceof Array
            ? <table>
              <tbody>
              <tr>
                <th>User</th>
                <th>{title}</th>
              </tr>
              {
                topFive.map((player, index) => {
                  return <tr key={index + '-top-five-' + keyName}>
                    <td dangerouslySetInnerHTML={{
                      __html: player.user
                        ? (
                          player.gang
                            ? player.gang.tag + ' ' + player.user.username
                            : player.user.username
                        )
                        : ''
                    }}/>
                    <td>{formatNumber(player[keyName])} {name}</td>
                  </tr>
                })
              }
              </tbody>
            </table>
            : 'Loading...'
          : ''
      }
    </div>
  </div>
}
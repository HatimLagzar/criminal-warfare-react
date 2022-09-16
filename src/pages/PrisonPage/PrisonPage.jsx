import toastr from "toastr";
import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import './PrisonPage.scss'
import {bustFromPrison, getCriminalsInPrison} from "../../api/prison-api";
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import MessageArea from "../../components/MessageArea/MessageArea";
import RefillNerveButton from "../../components/RefillNerveButton/RefillNerveButton";
import UsePrisonKeyButton from "../../components/UsePrisonKeyButton/UsePrisonKeyButton";
import MissionOperationInProgressTable
  from "../../components/MissionOperationInProgressTable/MissionOperationInProgressTable";
import {useSelector} from "react-redux";

export default () => {
  const [message, setMessage] = useState(null);
  const [criminals, setCriminals] = useState(null);
  const [isBusting, setIsBusting] = useState(false);
  const generalInfo = useSelector(state => state.auth.generalInfo);

  useEffect(() => {
    document.title = 'Prison | Criminal Warfare'

    if (criminals === null) {
      getCriminalsInPrison()
        .then(response => {
          setCriminals(response.data.criminals);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, []);

  function handleBustFromPrison(userId) {
    setIsBusting(true);
    bustFromPrison(userId)
      .then(response => {
        setMessage(response.data.message);
        setIsBusting(false);
        setCriminals([...criminals.filter(criminal => parseInt(criminal.user.id) !== parseInt(userId))]);
      })
      .catch(error => {
        setIsBusting(false);

        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  function handlePrisonKeyUsed() {
    setCriminals([...criminals.filter(criminal => parseInt(criminal.user.id) !== parseInt(generalInfo.id))]);
  }

  if (criminals === null || !generalInfo) {
    return 'Loading...';
  }

  return <div id={'prison-page'}>
    <ContentArea title={'Prison'}>
      <div className="prison-wrapper">
        <div className="prison-left">
          <MessageArea message={message}/>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Time Remaining</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              criminals instanceof Array
                ? criminals.map((criminal, index) => {
                  return <tr key={index + '-criminal-prison'}>
                    <td dangerouslySetInnerHTML={{__html: criminal.user.username}}></td>
                    <td>{criminal.time} minutes left</td>
                    <td>{criminal.reason}</td>
                    <td>
                      {
                        parseInt(criminal.user.id) === parseInt(generalInfo.id)
                          ? ''
                          : <ButtonForm
                            text={'Bust'}
                            showLoadingIcon={isBusting}
                            isLoading={isBusting}
                            onSubmitHandler={() => handleBustFromPrison(criminal.user.id)}
                          />
                      }
                    </td>
                  </tr>
                })
                : ''
            }
            </tbody>
          </table>
        </div>
        <div className="prison-right">
          <div className="prison-actions">
            <RefillNerveButton setMessage={setMessage}/>
            <UsePrisonKeyButton setMessage={setMessage} successCallback={handlePrisonKeyUsed} />
          </div>

          <MissionOperationInProgressTable/>
        </div>
      </div>
    </ContentArea>
  </div>
}
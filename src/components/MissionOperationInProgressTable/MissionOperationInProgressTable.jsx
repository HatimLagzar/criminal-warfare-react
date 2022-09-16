import {useEffect, useState} from "react";
import {getItemInProgress} from "../../api/operations-missions-api";
import toastr from "toastr";

export default () => {
  const [itemInProgress, setItemInProgress] = useState(null);

  useEffect(() => {
    if (itemInProgress === null) {
      getItemInProgress()
        .then(response => {
          setItemInProgress(response.data)
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [])
  return <>
    {
      !itemInProgress
        ? ''
        : itemInProgress.missionInProgress
          ? <table style={{marginTop: 20}}>
            <thead>
            <tr>
              <th>Mission Progress</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <ul>
                  <li>Kills: {itemInProgress.missionInProgress.kills}/{itemInProgress.missionInProgress.mission.kills}</li>
                  <li>Crimes: {itemInProgress.missionInProgress.crimes}/{itemInProgress.missionInProgress.mission.crimes}</li>
                  <li>Busts: {itemInProgress.missionInProgress.busts}/{itemInProgress.missionInProgress.mission.busts}</li>
                  <li>Mugs: {itemInProgress.missionInProgress.mugs}/{itemInProgress.missionInProgress.mission.mugs}</li>
                </ul>
              </td>
            </tr>
            </tbody>
          </table>
          : itemInProgress.operationInProgress
            ? <table style={{marginTop: 20}}>
              <thead>
              <tr>
                <th>Operation Progress</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{itemInProgress.operationInProgress.operation.title}: {itemInProgress.operationInProgress.done}/{itemInProgress.operationInProgress.operation.target}</td>
              </tr>
              </tbody>
            </table>
            : ''
    }
  </>
}
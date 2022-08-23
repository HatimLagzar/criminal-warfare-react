import toastr from "toastr";
import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import {getAllMissions} from "../../api/missions-api";
import MissionItem from "../../components/MissionItem/MissionItem";
import './MissionsPage.scss'
import {useSelector} from "react-redux";

export default function MissionsPage() {
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const [missions, setMissions] = useState(null);

  useEffect(() => {
    if (missions === null) {
      getAllMissions()
        .then(response => {
          setMissions(response.data.missions)
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message)
          }

          console.log(error)
        })
    }
  })

  if (missions === null || generalInfo === null) {
    return 'Loading...';
  }

  return <div id={'missions-page'}>
    <ContentArea title={'Missions'}>
      <div className={'missions-list'}>
        {
          missions instanceof Array
            ? missions.map(mission => <MissionItem
              generalInfo={generalInfo}
              mission={mission}
              key={mission.id + '-mission'}
            />)
            : ''
        }
      </div>
    </ContentArea>
  </div>
}
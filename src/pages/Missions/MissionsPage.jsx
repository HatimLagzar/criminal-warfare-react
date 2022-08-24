import toastr from "toastr";
import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import {getAllMissions} from "../../api/missions-api";
import MissionItem from "../../components/MissionItem/MissionItem";
import './MissionsPage.scss'
import {useSelector} from "react-redux";
import MissionProgress from "../../components/MissionProgress/MissionProgress";
import Table from "../../components/tables/Table/Table";

export default function MissionsPage() {
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const [missions, setMissions] = useState(null);
  const [missionsLogs, setMissionsLogs] = useState(null);
  const [missionProgress, setMissionProgress] = useState(null);
  const [isDoingMission, setIsDoingMission] = useState(false);

  useEffect(() => {
    if (missions === null) {
      getAllMissions()
        .then(response => {
          setMissions(response.data.missions)
          setMissionsLogs(response.data.missionsLogs)
          setIsDoingMission(response.data.isAttemptingMission)
          setMissionProgress(response.data.missionProgress)
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
    {
      isDoingMission
        ? <MissionProgress missions={missions} generalInfo={generalInfo} missionProgress={missionProgress}/>
        : <ContentArea title={'Missions'}>
          <div className={'missions-list'}>
            {
              missions instanceof Array
                ? missions.map(mission => <MissionItem
                  generalInfo={generalInfo}
                  mission={mission}
                  key={mission.id + '-mission'}
                  isDoingMission={isDoingMission}
                />)
                : ''
            }
          </div>
        </ContentArea>
    }

    <ContentArea title={'Mission Log'}>
      <Table data={[['Log', 'Timestamp'], ...missionsLogs]}/>
    </ContentArea>
  </div>
}
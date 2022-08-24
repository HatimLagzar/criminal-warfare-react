import MissionItem from "../MissionItem/MissionItem";
import ContentArea from "../ContentArea/ContentArea";
import MissionItemProgress from "../MissionItemProgress/MissionItemProgress";

export default function MissionProgress({missions, generalInfo, missionProgress}) {
  if (!(missions instanceof Array)) {
    return ''
  }

  const mission = missions.find(mission => mission.progressTime !== false);

  return <div id={'mission-progress'}>
    <div className={'missions-list'}>
      {
        missions.map(mission => <MissionItem
          generalInfo={generalInfo}
          mission={mission}
          key={mission.id + '-mission'}
          isDoingMission
        />)
      }
    </div>

    <ContentArea title={'Mission Progress'}>
      <MissionItemProgress mission={mission} missionProgress={missionProgress} />
    </ContentArea>
  </div>
}
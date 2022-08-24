import './MissionItemProgress.scss'
import {formatTimeToETA} from "../../utils/helpers/formatters";

export default function MissionItemProgress({mission, missionProgress}) {
  return <div className={'mission-item-progress'}>
    <header>
      {mission.name}
    </header>
    <section className="mission-item-progress-body">
      <ul>
        {
          mission.kills
            ? <li>
              <span>{mission.kills} Kills</span>
              <span className={'w-25'}>Complete objective to get {mission.paykills.split(':')[1]} {mission.paykills.split(':')[0]}</span>
              <span className={'red-text'}>{missionProgress.kills}/{mission.kills}</span>
            </li>
            : ''
        }
        {
          mission.crimes
            ? <li>
              <span>{mission.crimes} Crimes</span>
              <span className={'w-25'}>Complete objective to get {mission.paycrimes.split(':')[1]} {mission.paycrimes.split(':')[0]}</span>
              <span className={'red-text'}>{missionProgress.crimes}/{mission.crimes}</span>
            </li>
            : ''
        }
        {
          mission.mugs
            ? <li>
              <span>{mission.mugs} Mugs</span>
              <span className={'w-25'}>Complete objective to get {mission.paymugs.split(':')[1]} {mission.paymugs.split(':')[0]}</span>
              <span className={'red-text'}>{missionProgress.mugs}/{mission.mugs}</span>
            </li>
            : ''
        }
        {
          mission.busts
            ? <li>
              <span>{mission.busts} Busts</span>
              <span className={'w-25'}>Complete objective to get {mission.paybusts.split(':')[1]} {mission.paybusts.split(':')[0]}</span>
              <span className={'red-text'}>{missionProgress.busts}/{mission.busts}</span>
            </li>
            : ''
        }

        <li>
          <span className={'red-text'}>{formatTimeToETA(parseInt(missionProgress.timestamp) + mission.tlimit)}</span>
        </li>
      </ul>
    </section>
  </div>
}
import toastr from "toastr";
import './MissionItem.scss'
import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {startMission} from "../../api/missions-api";
import {useState} from "react";
import {formatTimeToETA} from "../../utils/helpers/formatters";
import {time} from "../../utils/helpers/dates";

export default function MissionItem({mission, generalInfo, isDoingMission}) {
  const [isStarting, setIsStarting] = useState(false);

  if (!mission.enabled) {
    return '';
  }

  if (mission.level_min > generalInfo.level || mission.level_max < generalInfo.level) {
    return '';
  }

  if (mission.premium && generalInfo.premiumDays === 0) {
    return '';
  }

  let body = <span>You can start this mission.</span>;
  if (mission.progressTime && time() > parseInt(mission.progressTime) + mission.delay) {
    body = <span>You can start this mission.</span>
  } else if (mission.progressTime) {
    body = <span className="red-text bold">{formatTimeToETA(parseInt(mission.progressTime) + mission.delay)}</span>
  }

  return <div className={'mission-item'}
              style={{width: isDoingMission ? '24%' : '32%'}}>
    <header>
      {mission.name}
    </header>
    <section className="mission-item-body">
      {
        isDoingMission
          ? body
          : <ul>
            {
              mission.kills
                ? <li>
                  <span>{mission.kills} Kills</span><span>{mission.paykills.split(':')[1]} {mission.paykills.split(':')[0]}</span>
                </li>
                : ''
            }
            {
              mission.crimes
                ? <li>
                  <span>{mission.crimes} Crimes</span><span>{mission.paycrimes.split(':')[1]} {mission.paycrimes.split(':')[0]}</span>
                </li>
                : ''
            }
            {
              mission.mugs
                ? <li>
                  <span>{mission.mugs} Mugs</span><span>{mission.paymugs.split(':')[1]} {mission.paymugs.split(':')[0]}</span>
                </li>
                : ''
            }
            {
              mission.busts
                ? <li>
                  <span>{mission.busts} Busts</span><span>{mission.paybusts.split(':')[1]} {mission.paybusts.split(':')[0]}</span>
                </li>
                : ''
            }
            <li>
              {
                mission.premium && generalInfo.premiumDays > 0
                  ? <span className={'red-text'}>RM Only</span>
                  : <ButtonForm
                    classes={'btn btn-link start-mission-btn'}
                    text={'Start Mission'}
                    isLoading={isStarting}
                    showLoadingIcon={isStarting}
                    onSubmitHandler={() => {
                      setIsStarting(true);

                      startMission(mission.id)
                        .then(response => {
                          setIsStarting(false)
                          toastr.success(response.data.message);
                        })
                        .catch(error => {
                          setIsStarting(false)

                          if (error.response) {
                            toastr.error(error.response.data.message);
                          }

                          console.log(error)
                        })
                    }}
                  />
              }
            </li>
          </ul>
      }
    </section>
  </div>
}
import ContentArea from "../../components/ContentArea/ContentArea";
import {useEffect, useState} from "react";
import './GangHome.scss'
import {Link} from "react-router-dom";
import {getActiveWeapons, getGangActions, getGangInfo} from "../../api/gangs-api";
import toastr from "toastr";
import {useSelector} from "react-redux";
import {formatMoney, formatTimeToETA} from "../../utils/helpers/formatters";
import {BIG_BROTHER_WEAPON_ID} from "../../utils/constants/gang-weapons";

export default () => {
  const [actions, setActions] = useState(null);
  const [activeWeapons, setActiveWeapons] = useState(null);
  const [gangInfo, setGangInfo] = useState(null);
  const generalInfo = useSelector(state => state.auth.generalInfo);

  if (!generalInfo) {
    return '';
  }

  useEffect(() => {
    document.title = 'Gang Home | Criminal Warfare';

    if (actions === null) {
      getGangActions()
        .then(response => {
          setActions(response.data.links);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        })
    }
  }, []);

  useEffect(() => {
    if (activeWeapons === null) {
      getActiveWeapons()
        .then(response => {
          setActiveWeapons(response.data.weapons);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        })
    }
  }, [])

  useEffect(() => {
    if (gangInfo === null) {
      getGangInfo(generalInfo.gangId)
        .then(response => {
          setGangInfo(response.data);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [])

  return <div id={'gang-home-page'}>
    <ContentArea title={'GANG ACTIONS'}>
      <div className={'gang-actions'}>
        {
          actions !== null && Object.entries(actions).length > 0
            ? Object.entries(actions).map((action, index) => {
              return <div className="gang-actions-item" key={index + '-action-link'}>
                <Link to={action[1]}>{action[0]}</Link>
              </div>
            })
            : ''
        }
      </div>
    </ContentArea>
    <ContentArea title={'GANG WEAPONS ACTIVE'}>
      <table>
        <thead>
        <tr>
          <th>Attacking Gang</th>
          <th>Defending Gang</th>
          <th>Weapon</th>
          <th>Time Left</th>
        </tr>
        </thead>
        <tbody>
        {
          activeWeapons instanceof Array
            ? activeWeapons.length > 0
              ? activeWeapons.map((activeWeapon, index) => {
                if (!activeWeapon.gangOne || !activeWeapon.gangTwo) {
                  return ''
                }

                return <tr key={index + '-active-weapon'}>
                  <td>
                    {
                      activeWeapon.gangOne.id === generalInfo.gangId
                        ? 'Your Gang'
                        : <Link to={'/gangs/' + activeWeapon.gangOne.id}>
                          [{activeWeapon.gangOne.tag}] {activeWeapon.gangOne.name}
                        </Link>
                    }
                  </td>
                  <td>
                    {
                      activeWeapon.gangTwo.id === generalInfo.gangId
                        ? 'Your Gang'
                        : <Link to={'/gangs/' + activeWeapon.gangTwo.id}>
                          [{activeWeapon.gangTwo.tag}] {activeWeapon.gangTwo.name}
                        </Link>
                    }
                  </td>
                  <td>
                    {activeWeapon.weapon.name}{' '}
                    <span
                      style={{color: '#c90'}} rel={'tipsy'}
                      title={activeWeapon.weapon.info}
                    >?</span>
                  </td>
                  <td>
                    {
                      activeWeapon.wid === BIG_BROTHER_WEAPON_ID
                        ? formatMoney(activeWeapon.debtPaid) + '/' + formatMoney(activeWeapon.debt)
                        : formatTimeToETA(activeWeapon.startTime + activeWeapon.weapon.timeLimit)
                    }
                  </td>
                </tr>
              })
              : <tr>
                <td colSpan="4">There are no weapons active on your gang.</td>
              </tr>
            : <tr>
              <td colSpan="4">Loading...</td>
            </tr>
        }
        </tbody>
      </table>
    </ContentArea>
    <ContentArea title={'GANG PAGE'}>
      {
        gangInfo === null
          ? <p className={'text-center'}>
            Loading...
          </p>
          : gangInfo.profile.privateText
            ? <p dangerouslySetInnerHTML={{__html: gangInfo.profile.privateText}}></p>
            : <p className={'text-center'}>
              No private text has been set for this gang.
            </p>
      }
    </ContentArea>
  </div>
}
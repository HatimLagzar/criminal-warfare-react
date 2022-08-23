import toastr from "toastr";
import ContentArea from "../../components/ContentArea/ContentArea";
import MessageArea from "../../components/MessageArea/MessageArea";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/forms/Input/Input";
import {fetchAuthenticatedUserInfo} from "../../api/user-api";
import './GymPage.scss'
import ButtonForm from "../../components/forms/ButtonForm/ButtonForm";
import {train} from "../../api/gym-api";
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import {refill} from "../../api/refill-api";

export default function GymPage() {
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const [message, setMessage] = useState('');
  const [aboutMe, setAboutMe] = useState(null);
  const [trainStrengthAmount, setTrainStrengthAmount] = useState(0);
  const [trainDefenseAmount, setTrainDefenseAmount] = useState(0);
  const [trainSpeedAmount, setTrainSpeedAmount] = useState(0);
  const [isTrainingStrength, setIsTrainingStrength] = useState(false);
  const [isTrainingDefense, setIsTrainingDefense] = useState(false);
  const [isTrainingSpeed, setIsTrainingSpeed] = useState(false);
  const [isRefillingEnergy, setIsRefillingEnergy] = useState(false);
  const [isRefillingAwake, setIsRefillingAwake] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (aboutMe === null) {
      fetchAuthenticatedUserInfo()
        .then(response => {
          setAboutMe(response.data.data);
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }
  }, [aboutMe])

  if (aboutMe === null) {
    return 'Loading...';
  }

  return <div id={'gym-page'}>
    <ContentArea title={'Gym'}>
      <MessageArea message={message || `You can train up to ${aboutMe.generalInfo.energy} times.`}/>
      <table className={'table'}>
        <thead>
        <tr>
          <td>Strength</td>
          <td>Defense</td>
          <td>Speed</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <Input
              value={trainStrengthAmount === '' || trainStrengthAmount > 0 ? trainStrengthAmount : aboutMe.generalInfo.energy}
              handleInputChange={e => setTrainStrengthAmount(e.currentTarget.value)}
            />
            <ButtonForm
              text={'Train'}
              isLoading={isTrainingStrength}
              showLoadingIcon={isTrainingStrength}
              onSubmitHandler={() => {
                setIsTrainingStrength(true);

                train('strength', trainStrengthAmount || aboutMe.generalInfo.energy)
                  .then(response => {
                    setIsTrainingStrength(false);
                    setMessage(response.data.message);
                    dispatch(setGeneralInfo({
                      ...generalInfo,
                      energy: generalInfo.energy - (trainStrengthAmount || aboutMe.generalInfo.energy)
                    }));
                    setAboutMe({
                      ...aboutMe,
                      generalInfo: {
                        ...aboutMe.generalInfo,
                        energy: generalInfo.energy - (trainStrengthAmount || aboutMe.generalInfo.energy),
                      },
                      attributes: {
                        ...aboutMe.attributes,
                        strength: aboutMe.attributes.strength + response.data.gain
                      }
                    });
                  })
                  .catch(error => {
                    setIsTrainingStrength(false);

                    if (error.response) {
                      setMessage(error.response.data.message);
                    }

                    console.log(error)
                  })
              }}
            />
          </td>
          <td>
            <Input
              value={trainDefenseAmount === '' || trainDefenseAmount > 0 ? trainDefenseAmount : aboutMe.generalInfo.energy}
              handleInputChange={e => setTrainDefenseAmount(e.currentTarget.value)}
            />
            <ButtonForm
              text={'Train'}
              isLoading={isTrainingDefense}
              showLoadingIcon={isTrainingDefense}
              onSubmitHandler={() => {
                setIsTrainingDefense(true);

                train('defense', trainDefenseAmount || aboutMe.generalInfo.energy)
                  .then(response => {
                    setIsTrainingDefense(false);
                    setMessage(response.data.message);
                    dispatch(setGeneralInfo({
                      ...generalInfo,
                      energy: generalInfo.energy - (trainDefenseAmount || aboutMe.generalInfo.energy)
                    }));
                    setAboutMe({
                      ...aboutMe,
                      generalInfo: {
                        ...aboutMe.generalInfo,
                        energy: generalInfo.energy - (trainDefenseAmount || aboutMe.generalInfo.energy),
                      },
                      attributes: {
                        ...aboutMe.attributes,
                        defense: aboutMe.attributes.defense + response.data.gain
                      }
                    });
                  })
                  .catch(error => {
                    setIsTrainingDefense(false);

                    if (error.response) {
                      setMessage(error.response.data.message);
                    }

                    console.log(error)
                  })
              }}
            />
          </td>
          <td>
            <Input
              value={trainSpeedAmount === '' || trainSpeedAmount > 0 ? trainSpeedAmount : aboutMe.generalInfo.energy}
              handleInputChange={e => setTrainSpeedAmount(e.currentTarget.value)}
            />
            <ButtonForm
              text={'Train'}
              isLoading={isTrainingSpeed}
              showLoadingIcon={isTrainingSpeed}
              onSubmitHandler={() => {
                setIsTrainingSpeed(true);

                train('speed', trainSpeedAmount || aboutMe.generalInfo.energy)
                  .then(response => {
                    setIsTrainingSpeed(false);
                    setMessage(response.data.message);
                    dispatch(setGeneralInfo({
                      ...generalInfo,
                      energy: generalInfo.energy - (trainSpeedAmount || aboutMe.generalInfo.energy)
                    }));
                    setAboutMe({
                      ...aboutMe,
                      generalInfo: {
                        ...aboutMe.generalInfo,
                        energy: generalInfo.energy - (trainSpeedAmount || aboutMe.generalInfo.energy),
                      },
                      attributes: {
                        ...aboutMe.attributes,
                        speed: aboutMe.attributes.speed + response.data.gain,
                      }
                    });
                  })
                  .catch(error => {
                    setIsTrainingSpeed(false);

                    if (error.response) {
                      setMessage(error.response.data.message);
                    }

                    console.log(error)
                  })
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <span>{aboutMe.attributes.strength}</span>
            <p>{`${aboutMe.attributes.strengthRank}/${aboutMe.countUsers}`}</p>
          </td>
          <td>
            <span>{aboutMe.attributes.defense}</span>
            <p>{`${aboutMe.attributes.defenseRank}/${aboutMe.countUsers}`}</p>
          </td>
          <td>
            <span>{aboutMe.attributes.speed}</span>
            <p>{`${aboutMe.attributes.speedRank}/${aboutMe.countUsers}`}</p>
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <ButtonForm
              text={'Refill Energy'}
              isLoading={isRefillingEnergy}
              showLoadingIcon={isRefillingEnergy}
              onSubmitHandler={() => {
                setIsRefillingEnergy(true)

                refill('energy')
                  .then(response => {
                    setIsRefillingEnergy(false);
                    setMessage(response.data.message);
                    setAboutMe({
                      ...aboutMe,
                      generalInfo: {
                        ...aboutMe.generalInfo,
                        energy: aboutMe.generalInfo.energyMax
                      }
                    });
                    dispatch(setGeneralInfo({
                      ...generalInfo,
                      energy: generalInfo.energyMax
                    }));
                  })
                  .catch(error => {
                    setIsRefillingEnergy(false);
                  })
              }}
            />
            &nbsp;
            &nbsp;
            <ButtonForm
              text={'Refill Awake'}
              isLoading={isRefillingAwake}
              showLoadingIcon={isRefillingAwake}
              onSubmitHandler={() => {
                setIsRefillingAwake(true)

                refill('awake')
                  .then(response => {
                    setIsRefillingAwake(false);
                    setMessage(response.data.message);
                    setAboutMe({
                      ...aboutMe,
                      generalInfo: {
                        ...aboutMe.generalInfo,
                        awake: aboutMe.generalInfo.awakeMax
                      }
                    });
                    dispatch(setGeneralInfo({
                      ...generalInfo,
                      awake: generalInfo.awakeMax
                    }));
                  })
                  .catch(error => {
                    setIsRefillingAwake(false);
                  })
              }}
            />
          </td>
        </tr>
        </tbody>
      </table>
    </ContentArea>
  </div>
}

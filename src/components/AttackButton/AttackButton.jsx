import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {attack} from "../../api/user-api";
import toastr from "toastr";
import {useState} from "react";
import Modal from "../Modal/Modal";
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

export default ({player}) => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [logs, setLogs] = useState(null);
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const dispatch = useDispatch();

  if (!generalInfo) {
    return '';
  }

  toastr.options.onclick = function (e) {
    handleShowDetails(this.data.logs);
  }

  function handleShowDetails(logs) {
    setShowDetails(true);
  }

  function handleAttack(userId) {
    setIsAttacking(true);

    attack(userId)
      .then(response => {
        setIsAttacking(false);
        setLogs(response.data.logs);
        if (response.data.success) {
          toastr.success(
            response.data.message,
            null,
            {
              data: {
                logs: response.data.logs
              }
            }
          );
        } else {
          toastr.warning(
            response.data.message,
            null,
            {
              data: {
                logs: response.data.logs
              }
            }
          );
        }

        dispatch(setGeneralInfo({
          ...generalInfo,
          energy: generalInfo.energy - response.data.cost
        }));
      })
      .catch(error => {
        setIsAttacking(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <>
    <ButtonForm
      isLoading={isAttacking}
      showLoadingIcon={isAttacking}
      text={'Attack'}
      onSubmitHandler={() => handleAttack(player.id)}
    />

    <Modal title={'Attack Details'} showModal={showDetails} setShowModal={setShowDetails}>
      <ul>
        {
          logs instanceof Array
            ? logs.map((log, index) => {
              return <li key={index + '-log-attack'} dangerouslySetInnerHTML={{__html: log}}></li>
            })
            : ''
        }
      </ul>
    </Modal>
  </>
}
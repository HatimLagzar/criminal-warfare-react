import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {useState} from "react";
import {mug} from "../../api/user-api";
import toastr from "toastr";
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInfo} from "../../store/features/auth/authSlice";

export default ({player}) => {
  const [isMugging, setIsMugging] = useState(false);
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const dispatch = useDispatch();

  if (!generalInfo) {
    return '';
  }

  function handleMug(userId) {
    setIsMugging(true);
    mug(userId)
      .then(response => {
        setIsMugging(false);
        if (response.data.success) {
          toastr.success(response.data.message);
          dispatch(setGeneralInfo({
            ...generalInfo,
            exp: generalInfo.exp + response.data.expGained,
            money: generalInfo.money + response.data.profit,
            nerve: generalInfo.nerve - response.data.cost
          }));
        } else {
          toastr.warning(response.data.message);
          dispatch(setGeneralInfo({
            ...generalInfo,
            nerve: generalInfo.nerve - response.data.cost
          }));
        }
      })
      .catch(error => {
        setIsMugging(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <>
    <ButtonForm
      isLoading={isMugging}
      showLoadingIcon={isMugging}
      text={'Mug'}
      onSubmitHandler={() => handleMug(player.id)}
    />
  </>
}
import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {refill} from "../../api/refill-api";
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import Button from "../buttons/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

export default ({setMessage = (message) => {}}) => {
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const [isRefillingEnergy, setIsRefillingEnergy] = useState(false);

  if (!generalInfo) {
    return '';
  }

  return <>
    {
      generalInfo.energyMax !== generalInfo.energy
        ? <ButtonForm
          isLoading={isRefillingEnergy}
          showLoadingIcon={isRefillingEnergy}
          text={`Refill Energy`}
          onSubmitHandler={() => {
            setIsRefillingEnergy(true)
            refill('energy')
              .then(response => {
                setMessage(response.data.message)
                setIsRefillingEnergy(false)
                dispatch(setGeneralInfo({
                  ...generalInfo,
                  energy: generalInfo.energyMax
                }))
              })
              .catch(error => {
                if (error.response) {
                  setMessage(error.response.data.message)
                }

                setIsRefillingEnergy(false)
                console.log(error)
              })
          }}
        />
        : <Button text={'Energy is Full'} classes={'btn btn-gray'} isLoading/>
    }
  </>
}
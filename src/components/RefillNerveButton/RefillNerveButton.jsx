import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {refill} from "../../api/refill-api";
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import Button from "../buttons/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

export default ({ setMessage }) => {
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const [refillingNerve, setRefillingNerve] = useState(false);

  if (!generalInfo) {
    return '';
  }

  return <>
    {
      generalInfo.nerveMax !== generalInfo.nerve
        ? <ButtonForm
          isLoading={refillingNerve}
          showLoadingIcon={refillingNerve}
          text={`Refill ${generalInfo.nerveMax - generalInfo.nerve} Nerve [10 points]`}
          onSubmitHandler={() => {
            setRefillingNerve(true)
            refill('nerve')
              .then(response => {
                setMessage(response.data.message)
                setRefillingNerve(false)
                dispatch(setGeneralInfo({
                  ...generalInfo,
                  nerve: generalInfo.nerveMax
                }))
              })
              .catch(error => {
                if (error.response) {
                  setMessage(error.response.data.message)
                }

                setRefillingNerve(false)
                console.log(error)
              })
          }}
        />
        : <Button text={'Nerve is Full'} classes={'btn btn-gray'} isLoading/>
    }
  </>
}
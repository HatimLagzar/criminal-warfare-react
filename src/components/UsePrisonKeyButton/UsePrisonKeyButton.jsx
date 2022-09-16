import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {setIsInPrison} from "../../store/features/auth/authSlice";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {escapePrisonUsingKey, getPrisonKeysLeft} from "../../api/prison-api";
import toastr from "toastr";

export default (
  {
    setMessage,
    successCallback = () => {
    }
  }
) => {
  const dispatch = useDispatch();
  const [usingPrisonKey, setUsingPrisonKey] = useState(false);
  const [keysLeft, setKeysLeft] = useState(0);

  useEffect(() => {
    getPrisonKeysLeft()
      .then(response => {
        setKeysLeft(response.data.keysLeft);
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }, [])

  return <>
    <ButtonForm
      isLoading={usingPrisonKey}
      showLoadingIcon={usingPrisonKey}
      text={'Prison Key (' + keysLeft + ')'}
      onSubmitHandler={() => {
        setUsingPrisonKey(true)

        escapePrisonUsingKey()
          .then(response => {
            setUsingPrisonKey(false)
            setMessage(response.data.message)
            setKeysLeft(response.data.keysLeft)
            dispatch(setIsInPrison(false))
            successCallback()
          })
          .catch(error => {
            if (error.response) {
              setMessage(error.response.data.message)
            }

            setUsingPrisonKey(false)

            console.log(error)
          })
      }}/>
  </>
}
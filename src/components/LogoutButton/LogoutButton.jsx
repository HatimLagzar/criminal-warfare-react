import ButtonForm from "../forms/ButtonForm/ButtonForm";
import {useDispatch} from "react-redux";
import authService from "../../services/auth/AuthService";
import {logout} from "../../api/login-api";
import {useState} from "react";
import toastr from "toastr";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setIsLoading(true);
    logout()
      .then(response => {
        setIsLoading(false);
        toastr.success(response.data.message);
        authService.logout(dispatch);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  };

  return <ButtonForm
    text={'Logout'}
    classes={'btn btn-nav-link'}
    onSubmitHandler={handleLogout}
    isLoading={isLoading}
    showLoadingIcon={isLoading}
  />;
}
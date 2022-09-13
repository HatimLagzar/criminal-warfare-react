import {login, refresh} from '../../api/login-api';
import jwtDecode from 'jwt-decode';
import {setToken, setUser} from '../../store/features/auth/authSlice';
import toastr from 'toastr';
import {SERVER_ERROR, UNPROCESSABLE_ENTITY,} from '../../utils/constants/response-codes';
import {TOKEN_LOCALSTORAGE_KEY_NAME, USER_LOCALSTORAGE_KEY_NAME} from "../../utils/constants/global";

class AuthService {
  login(username, password) {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);

    return login(formData)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token);

        localStorage.setItem(TOKEN_LOCALSTORAGE_KEY_NAME, token);
        localStorage.setItem(USER_LOCALSTORAGE_KEY_NAME, JSON.stringify(user));

        toastr.success(response.data.message);

        return response;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === UNPROCESSABLE_ENTITY) {
            toastr.warning(error.response.data.message);

            return;
          }

          if (error.response.status === SERVER_ERROR) {
            toastr.error(error.response.data.message);

            return;
          }

          toastr.error(error.response.data.message);

          return;
        }

        console.log(error);
      });
  }

  /**
   * Restore token from local storage and dispatch it to
   * redux store
   *
   * @param {fn} dispatch
   */
  restoreLogin(dispatch) {
    try {
      if (this.isExpired() === false) {
        const token = this.getToken();
        this.saveToken(token, dispatch);
      }
    } catch (error) {
      this.logout(dispatch);
    }
  }

  logout(dispatch = null) {
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY_NAME);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY_NAME);

    if (dispatch !== null) {
      dispatch(setToken(null));
      dispatch(setUser(null));
    }
  }

  getAuthUser() {
    return JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY_NAME));
  }

  /**
   * @returns {boolean}
   */
  hasBeenAuthenticated() {
    return (
      localStorage.getItem(TOKEN_LOCALSTORAGE_KEY_NAME) !== null &&
      localStorage.getItem(USER_LOCALSTORAGE_KEY_NAME) !== null
    );
  }

  isExpired() {
    if (this.getToken() === 'undefined') {
      this.logout();

      return true;
    }

    if (this.hasBeenAuthenticated()) {
      const token = this.getToken();
      const user = jwtDecode(token);

      return user.exp * 1000 < new Date().getTime();
    }

    return true;
  }

  getToken() {
    return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY_NAME);
  }

  getUser() {
    if (this.getToken() === null) {
      return null;
    }

    return JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY_NAME));
  }

  refreshToken(token) {
    return refresh(token)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          toastr.error(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  }

  /**
   * Save the token in localStorage and dispatch to the state
   *
   * @param {string} token
   * @param {fn} dispatch
   */
  saveToken(token, dispatch) {
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY_NAME, token);

    const user = jwtDecode(token);

    dispatch(setToken(token));
    dispatch(setUser(user));
  }
}

const authService = new AuthService();

export default authService;

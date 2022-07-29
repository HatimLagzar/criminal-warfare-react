import { login, refresh } from '../../../api/login-api';
import jwtDecode from 'jwt-decode';
import { setToken, setUser } from '../../features/auth/authSlice';
import toastr from 'toastr';

class AuthService {
  login(email, password) {
    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', password);

    return login(formData)
      .then((response) => {
        const token = response.data.token;
        const user = jwtDecode(token);

        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));

        toastr.success(response.data.message);

        return response;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            toastr.error('Incorrect credentials!');

            return;
          }

          toastr.error(error.response.data.message);

          return;
        }

        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }

  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser'));
  }

  /**
   * @returns {boolean}
   */
  hasBeenAuthenticated() {
    return (
      localStorage.getItem('authToken') !== null &&
      localStorage.getItem('authUser') !== null
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

      return user.exp * 1000 + new Date().getTime() < new Date().getTime();
    }

    return true;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  getUser() {
    if (this.getToken() === null) {
      return null;
    }

    return JSON.parse(localStorage.getItem('authUser'));
  }

  refreshToken(token) {
    return refresh(token).catch((error) => {
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
    localStorage.setItem('authToken', token);

    const user = jwtDecode(token);

    dispatch(setToken(token));
    dispatch(setUser(user));
  }
}

export default new AuthService();

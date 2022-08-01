import { fetchAuthenticatedUserInfo } from '../../api/user-api';
import toastr from 'toastr';

class UserService {
  fetchAuthenticatedUserInfo() {
    return fetchAuthenticatedUserInfo()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          toastr.error(error.response.data.message);
        }
      });
  }
}

const userService = new UserService();

export default userService;

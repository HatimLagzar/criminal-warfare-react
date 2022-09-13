import { useState } from 'react';
import toastr from 'toastr';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMailbox } from '../../api/mailbox-api';
import { deleteConversation } from '../../store/features/pages/mailboxSlice';
import ButtonForm from '../forms/ButtonForm/ButtonForm';
import { ignoreUser } from '../../api/user-api';

export default ({ mailbox }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.generalInfo);

  if (!user) {
    return '';
  }

  function handleIgnore() {
    setIsLoading(true);

    ignoreUser(mailbox.uid1 === user.id ? mailbox.uid2 : mailbox.uid1)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      });
  }

  return (
    <ButtonForm
      onSubmitHandler={handleIgnore}
      text={'Ignore User'}
      isLoading={isLoading}
      showLoadingIcon={isLoading}
    />
  );
};

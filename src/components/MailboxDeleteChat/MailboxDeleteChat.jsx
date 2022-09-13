import { useState } from 'react';
import toastr from 'toastr';
import { useDispatch } from 'react-redux';
import { deleteMailbox } from '../../api/mailbox-api';
import { deleteConversation } from '../../store/features/pages/mailboxSlice';
import ButtonForm from '../forms/ButtonForm/ButtonForm';

export default ({ mailbox }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function handleDelete() {
    setIsLoading(true);

    deleteMailbox(mailbox.id)
      .then((response) => {
        setIsLoading(false);
        dispatch(deleteConversation(mailbox.id));
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
      onSubmitHandler={handleDelete}
      text={'Delete Chat'}
      isLoading={isLoading}
      showLoadingIcon={isLoading}
    />
  );
};

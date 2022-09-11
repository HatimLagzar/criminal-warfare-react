import noAvatar from "../../assets/img/avatars/no-avatar.png";
import Button from "../buttons/Button/Button";
import {useState} from "react";
import {createMailbox} from "../../api/mailbox-api";
import {useDispatch} from "react-redux";
import {addNewMailbox} from "../../store/features/pages/mailboxSlice";
import toastr from "toastr";

export default ({user}) => {
  const [isCreatingMailbox, setIsCreatingMailbox] = useState(false);
  const dispatch = useDispatch();

  function handleCreateMailbox() {
    setIsCreatingMailbox(true);

    createMailbox(user.id)
      .then(response => {
        setIsCreatingMailbox(false);
        dispatch(addNewMailbox(response.data.mailbox));
      })
      .catch(error => {
        setIsCreatingMailbox(false);
        if (error.response) {
          toastr.error(error.response.data.message);
        }

        console.log(error);
      })
  }

  return <li>
    <div className="info">
      <img src={user.avatar || noAvatar} alt={'Avatar'}/>
      <div className="text">
        <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: user.username}}></p>
        <p style={{marginBottom: 0, marginTop: 5}} dangerouslySetInnerHTML={{__html: user.status}}></p>
      </div>
    </div>
    <Button text={'Chat'} showLoadingIcon={isCreatingMailbox} isLoading={isCreatingMailbox} onClick={handleCreateMailbox}/>
  </li>;
}
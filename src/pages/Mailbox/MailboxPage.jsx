import ContentArea from "../../components/ContentArea/ContentArea";
import FlexRow from "../../components/layouts/FlexRow/FlexRow";
import FlexElement from "../../components/layouts/FlexElement/FlexElement";
import ConversationsList from "../../components/ConversationsList/ConversationsList";
import {useEffect} from "react";
import {getConversations} from "../../api/mailbox-api";
import {useDispatch, useSelector} from "react-redux";
import {setConversations} from "../../store/features/pages/mailboxSlice";
import toastr from "toastr";
import MailboxSearchUser from "../../components/MailboxSearchUser/MailboxSearchUser";

export default () => {
  const conversations = useSelector(state => state.mailbox.conversations);
  const selectedConversation = useSelector(state => state.mailbox.selectedConversation);
  const searchingForUser = useSelector(state => state.mailbox.searchingForUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    if (conversations === null) {
      getConversations(abortController)
        .then(response => {
          dispatch(setConversations(response.data.conversations));
        })
        .catch(error => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }

          console.log(error);
        })
    }

    return () => {
      abortController.abort();
    }
  }, [])

  return (
    <div id={'mailbox-page'}>
      <FlexRow gap={8}>
        <FlexElement flex={3}>
          <ContentArea title={'Chat'}>
            <ConversationsList/>
          </ContentArea>
        </FlexElement>
        <FlexElement flex={9}>
          {
            selectedConversation
              ? <ContentArea title={'Mailbox'}>
              </ContentArea>
              : ''
          }
          {
            searchingForUser
              ? <MailboxSearchUser />
              : ''
          }
        </FlexElement>
      </FlexRow>
    </div>
  );
}
import PropTypes from 'prop-types';
import toastr from "toastr";
import InventoryItem from "../InventoryItem/InventoryItem";
import Button from "../buttons/Button/Button";
import {useState} from "react";
import Modal from "../Modal/Modal";
import Input from "../forms/Input/Input";
import './HouseBombItem.scss'

export default function HouseBombItem({item, handleUseItem}) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetId, setTargetId] = useState(null);

  return <div className={'house-bomb-item inventory-item'}>
    <InventoryItem
      item={item}
      handleUseItem={() => {
        setShowModal(true);
      }}
      isUsable
    />

    <Modal setShowModal={setShowModal} showModal={showModal} title={'House Bomb'}>
      <p className={'text-center'}>Who would you like to bomb?</p>
      <form className={'house-bomb-item-form'} onSubmit={(e) => {
        e.preventDefault();

        setIsLoading(true)

        if (targetId === null || targetId === '') {
          toastr.warning('Please enter the id of the user you want to bomb his house!')

          return;
        }

        handleUseItem(item, targetId)
          .then(() => {
            setIsLoading(false)
            setShowModal(false)
          })
      }}>
        <Input handleInputChange={e => setTargetId(e.currentTarget.value)}/>
        <Button text={'Bomb'} isLoading={isLoading} showLoadingIcon={isLoading}/>
      </form>
    </Modal>
  </div>
}

HouseBombItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    qty: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

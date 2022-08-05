import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonForm from '../forms/ButtonForm/ButtonForm';
import './InventoryItem.scss';

export default function InventoryItem({ item }) {
  return (
    <div className='inventory-item'>
      <div className='inventory-item-left'>
        <img
          src={
            item.image
              ? 'https://media.criminal-warfare.com/upload/items/' +
                item.type +
                '/' +
                item.image
              : 'https://media.criminal-warfare.com/upload/items/0.png'
          }
          alt='Inventory Item Image'
          className='inventory-item-image'
        />
      </div>
      <div className='inventory-item-left'>
        <div className='inventory-item-details'>
          <h4 className='inventory-item-name'>{item.name}</h4>
          <h6 className='inventory-item-quantity'>Quantity: {item.qty}</h6>
        </div>
        <div className='inventory-item-actions'>
          <Link className='btn btn-link' to={'items/market/' + item.id}>
            [Market]
          </Link>
          <ButtonForm text={'[Equip]'} classes={'btn-link'} />
        </div>
      </div>
    </div>
  );
}

InventoryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    qty: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

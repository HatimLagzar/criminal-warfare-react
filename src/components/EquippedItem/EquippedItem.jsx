import ButtonForm from '../forms/ButtonForm/ButtonForm';
import './EquippedItem.scss';

export default function EquippedItem({
  title,
  image,
  type,
  handleUnequipItem,
}) {
  return (
    <div className='equipped-item'>
      <h4 className='equipped-item-title'>{title}</h4>
      <img
        className='equipped-item-image'
        src={
          image
            ? 'https://media.criminal-warfare.com/upload/items/' +
              type +
              '/' +
              image
            : 'https://media.criminal-warfare.com/upload/items/0.png'
        }
        alt='Equipped Item Image'
      />

      {image ? (
        <ButtonForm
          classes={'btn-link equipped-item-btn'}
          text={'[Unequip]'}
          onSubmitHandler={handleUnequipItem}
        />
      ) : (
        ''
      )}
    </div>
  );
}

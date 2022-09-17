import './Select.scss';

export default function Select(
  {
    id,
    handleInputChange = () => {
    },
    value,
    styles = {},
    placeholder = '',
    onBlur = () => {
    },
    data,
    textKeyName,
    valueKeyName
  }
) {
  return (
    <select
      className='select-form'
      id={id}
      onChange={handleInputChange}
      value={value}
      style={styles}
      placeholder={placeholder}
      onBlur={onBlur}
    >
      <option></option>
      {
        data.map(item => <option key={item[valueKeyName] + '-item'} value={item[valueKeyName]}>{item[textKeyName]}</option>)
      }
    </select>
  );
}

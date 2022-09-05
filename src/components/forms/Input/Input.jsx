import './Input.scss';

export default function Input({
  id,
  type,
  handleInputChange = () => {},
  value,
  styles = {},
  placeholder = ''
}) {
  return (
    <input
      className='input-form'
      type={type}
      id={id}
      onChange={handleInputChange}
      value={value}
      style={styles}
      placeholder={placeholder}
    />
  );
}

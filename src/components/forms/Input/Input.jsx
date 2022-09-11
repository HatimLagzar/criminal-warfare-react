import './Input.scss';

export default function Input(
  {
    id,
    type,
    handleInputChange = () => {
    },
    value,
    styles = {},
    placeholder = '',
    onBlur = () => {
    }
  }
) {
  return (
    <input
      className='input-form'
      type={type}
      id={id}
      onChange={handleInputChange}
      value={value}
      style={styles}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
}

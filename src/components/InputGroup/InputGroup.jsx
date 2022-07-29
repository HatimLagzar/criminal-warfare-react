import './InputGroup.scss';

export default function InputGroup({
  label,
  id,
  type,
  handleInputChange = () => {},
}) {
  return (
    <div className='input-group'>
      <label className='label-form' htmlFor={id}>
        {label}
      </label>
      <input
        className='input-form'
        type={type}
        id={id}
        onChange={handleInputChange}
      />
    </div>
  );
}

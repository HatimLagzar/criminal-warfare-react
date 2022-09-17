import Input from '../Input/Input';
import './InputGroup.scss';

export default function InputGroup({
  label,
  id,
  type,
  inline = false,
  handleInputChange = () => {},
}) {
  return (
    <div className={'input-group ' + (inline ? 'inline-input-group': '')}>
      <label className='label-form' htmlFor={id}>
        {label}
      </label>
      <Input id={id} type={type} handleInputChange={handleInputChange} />
    </div>
  );
}

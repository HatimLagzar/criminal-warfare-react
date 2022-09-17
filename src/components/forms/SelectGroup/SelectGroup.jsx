import './SelectGroup.scss';
import Select from "../Select/Select";

export default function SelectGroup(
  {
    label,
    id,
    inline = false,
    handleInputChange = () => {
    },
    data,
    textKeyName,
    valueKeyName
  }
) {
  return (
    <div className={'select-group ' + (inline ? 'inline-select-group' : '')}>
      <label className='label-form' htmlFor={id}>
        {label}
      </label>
      <Select
        id={id}
        handleInputChange={handleInputChange}
        data={data}
        textKeyName={textKeyName}
        valueKeyName={valueKeyName}
      />
    </div>
  );
}

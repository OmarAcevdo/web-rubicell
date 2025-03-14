const Input = ({ handleChange, value, title, name, color }) => {
    return (
      <label>
        <input onChange={handleChange} type="radio" value={value} name={name} />
        <span className={`bg-${color} inline-block w-4 h-4 rounded-2xl`}></span>
        {title}
      </label>
    );
  };
  
  
  export default Input;
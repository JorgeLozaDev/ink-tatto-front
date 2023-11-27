import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Input = ({ placeholder, type, name, handler, value, disabled,max,min }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    handler(value, name);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          max={max}
          min={min}
          onChange={(e) => handleChange(e)}
          disabled={disabled}
        />
      </InputGroup>
    </>
  );
};

export default Input;

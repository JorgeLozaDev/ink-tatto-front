import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Input = ({ placeholder, type, name, handler, value, disabled }) => {
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
          onChange={(e) => handleChange(e)}
          disabled={disabled}
        />
      </InputGroup>
    </>
  );
};

export default Input;

import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Select = ({
  options,
  placeholder,
  name,
  handler,
  value,
  disabled,
  className,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    handler(value, name);
  };

  
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Select
          name={name}
          value={value}
          onChange={(e) => handleChange(e)}
          className={className}
          disabled={disabled}
        >
          {/* <option value="" disabled> */}
          <option value="" >
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
    </>
  );
};

export default Select;

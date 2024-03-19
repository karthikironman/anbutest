import { useEffect, useState } from "react";

const DropDown = (props) => {
  const { value, options, id, callback } = props;
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    // console.log('value updated', value)
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
    callback(e.target.value);
  };

  return (
    <div key={selectedValue}>
      <select value={selectedValue} onChange={handleSelect}>
        <option value={null} style={{ display: "none" }}>
          add new item to schema
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{
              display: option.value === selectedValue ? "none" : "block",
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;

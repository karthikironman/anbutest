import React, { useEffect, useState } from "react";
import "./segmentFloater.css";
import DropDown from "./dropDown";
import options from "./options";

function SegmentFloater({handleClose}) {
  const [segmentName, setSegmentName] = useState("");
  const [addNew, setAddNew] = useState(null);
  const [schema, setSchema] = useState([]);

  useEffect(() => {
    setAddNew(null);
  }, [schema]);

  const handleAddItemToSchema = () => {
    if (addNew !== null) {
      const matchingOption = options.find((option) => option.value === addNew);
      if (matchingOption) {
        setSchema((prevSchema) => [
          ...prevSchema,
          { label: matchingOption.label, value: matchingOption.value },
        ]);
      }
    }else{
      alert("Please select an item in the dropdown");
    }
  };

  const handleDropDownChange = (index, selectedValue) => {
    const matchingOption = options.find(
      (option) => option.value === selectedValue
    );
    if (matchingOption) {
      const updatedSchema = schema.map((item, i) => {
        if (i === index) {
          return {
            label: matchingOption.label,
            value: matchingOption.value,
          };
        }
        return item;
      });
      setSchema(updatedSchema);
    }
  };

  const handleRemoveItemFromSchema = (index) => {
    setSchema((prevSchema) => prevSchema.filter((item, i) => i !== index));
  };

  const handleSaveSchema = () => {
    if (segmentName.trim() === "") {
      alert("Please provide a segment name.");
      return;
    }
    const formattedSchema = {
      segment_name: segmentName,
      schema: schema.map((item) => ({
        [item.value]: item.label,
      })),
    };

    console.log(JSON.stringify(formattedSchema, null, 2));
    alert(JSON.stringify(formattedSchema, null, 2))
  };

  return (
    <div className="App">
      <div>
        <div>Enter the name of the segment</div>
        <input
          placeholder="name of the segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
      </div>
      <br />
      <p>To Save your segment you must save your schemas to build a query</p>
      <div className="SchemaContainer">
        {schema.map((item, index) => (
          <div key={index} className="SchemaItem">
            <DropDown
              value={item.value}
              options={options}
              callback={(selectedValue) =>
                handleDropDownChange(index, selectedValue)
              }
            />
            <button onClick={() => handleRemoveItemFromSchema(index)}>-</button>
          </div>
        ))}
      </div>

      <DropDown
        value={addNew}
        options={options}
        callback={(selectedValue) => setAddNew(selectedValue)}
      />
      <p className="addItemLink" onClick={handleAddItemToSchema}>+ Add item to schema</p>

      <br />
      <br />
      <div>

      <button onClick={handleSaveSchema}>SAVE SCHEMA</button> &nbsp;
      <button onClick={handleClose}>CANCEL</button>
      </div>
      
    </div>
  );
}

export default SegmentFloater;

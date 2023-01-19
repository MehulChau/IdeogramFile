import React, { useState } from "react";
//import Ideogram from "ideogram";
import './App.css';

function MyComponent() {
  const [selectedValue, setSelectedValue] = useState("");
  const [megaMap, setMegaMap] = useState({});
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");

      // Create an array names the first element for each line
      const newMegaMap = {};
      lines.forEach((line) => {
        const [key, ...values] = line.split("\t");
        newMegaMap[key] = values;
      });
      setMegaMap(newMegaMap);
    };
    await reader.readAsText(file);
  };
  
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleClick = () => {
    setIsButtonClicked(true);
    console.log(megaMap[selectedValue]);
    // call a function to update the annotation on the ideogram

  }

  return (
    <div>
      <h1 className="heading">Ideogram Annotations</h1>
      <div className="content">
        <div className="topContent">
          <input type="file" onChange={handleFileSelect} />
          <select value={selectedValue} onChange={handleChange}>
            {Object.keys(megaMap).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button onClick={handleClick}>Display Ideogram</button>
        </div>
        <div className="middleContent">
          {isButtonClicked ? 
          <div>
            <h2 className="displayHeading">All affected genes</h2>
            <p className="affectedGeneList">{JSON.stringify(megaMap[selectedValue], null, 2)}</p>
          </div>
          : null}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
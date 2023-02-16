import { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./App.css";

const SectionRows = ({ sectionRows, removeSection, onChange }) => {
  return sectionRows.map((row, index) => {
    return (
      <div key={row.id} className="sectionContainer">
        <label htmlFor={row.id}>Titre de section</label>
        <input 
          id={row.id} 
          name="title" 
          type="text" 
          placeholder="Titre de section"
          value={row.title}
          onChange={(e) => onChange(e, index)}
        />
        <button className="btn" onClick={() => removeSection(index)}>
          -
        </button>
      </div>
    );
  });
};

function App() {
  const [sectionRows, setSectionRows] = useState([
    {
      id: uuid(),
      title: "",
    },
  ]);

  const onChange = (e, sectionIndex) => {
    const {name, value} = e.target;
    const newSectionRows = [...sectionRows];
    newSectionRows[sectionIndex][name] = value;
    setSectionRows(newSectionRows);
  }

  const addSection = () => {
    const additionalSection = {
      id: uuid(),
      title: "",
    };

    setSectionRows([...sectionRows, additionalSection]);
  };

  const removeSection = (sectionIndex) => {
    let sectionRowsCopy = [...sectionRows];
    sectionRowsCopy.splice(sectionIndex, 1);
    setSectionRows(sectionRowsCopy);
  };

  return (
    <div className="App">
      <SectionRows sectionRows={sectionRows} removeSection={removeSection} onChange={onChange}/>
      <button className="btn" onClick={addSection}>
        +
      </button>
    </div>
  );
}

export default App;

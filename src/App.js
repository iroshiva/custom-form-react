import { useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
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

// Create styles
const styles = StyleSheet.create({
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1,
    title: {

    }
  },
});

const MyDocument = ({ sectionRows }) => {
  const displaySection = sectionRows.map((section, index) => {
    return (
      <View key={section.id} style={styles.section}>
        <Text style={styles.section.title}>{index + 1 + "." } {section.title}</Text>
      </View>
    );
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {displaySection}
        {/* <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  );
};

function App() {
  const [documentDisplay, setDocumentDisplay] = useState(false);
  const [sectionRows, setSectionRows] = useState([
    {
      id: uuid(),
      title: "",
    },
  ]);

  const onChange = (e, sectionIndex) => {
    const { name, value } = e.target;
    const newSectionRows = [...sectionRows];
    newSectionRows[sectionIndex][name] = value;
    setSectionRows(newSectionRows);
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    const formStorage = localStorage.getItem("formData");
    if (formStorage !== JSON.stringify(sectionRows)) {
      localStorage.setItem("formData", JSON.stringify(sectionRows));
    }
    console.log(sectionRows);
    setDocumentDisplay(true);
  };

  return (
    <div className="App">
      {documentDisplay ? (
        <>
          <PDFViewer style={styles.viewer}>
            <MyDocument sectionRows={sectionRows} />
          </PDFViewer>
          {/* <PDFDownloadLink document={<MyDocument {...props} />} fileName={"FileName"}>
            <button> Download </button>
          </PDFDownloadLink> */}
        </>
      ) : (
        <form id="form">
          <SectionRows
            sectionRows={sectionRows}
            removeSection={removeSection}
            onChange={onChange}
          />
          <button type="button" className="btn" onClick={addSection}>
            +
          </button>
          <button
            form="form"
            type="submit"
            className="btn"
            onClick={(e) => onSubmit(e)}
          >
            Enregistrer
          </button>
        </form>
      )}
    </div>
  );
}

export default App;

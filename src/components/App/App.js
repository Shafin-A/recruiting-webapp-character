import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../../consts";
import { Attributes } from "../Attributes/Attributes";
import { Classes } from "../Classes/Classes";

function App() {
  // make an object out of ATTRIBUTE_LIST to store stat for each attribute
  const initialAttributeStats = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10;
    return acc;
  }, {});

  const [attributeStats, setAttributeStats] = useState(initialAttributeStats);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <Attributes
          attributeStats={attributeStats}
          setAttributeStats={setAttributeStats}
        />

        <Classes attributeStats={attributeStats} />
      </section>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

function App() {
  // make an object out of ATTRIBUTE_LIST to store stat for each attribute
  const initialAttributeStats = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10;
    return acc;
  }, {});

  const [attributeStats, setAttributeStats] = useState(initialAttributeStats);

  const handleChangeAttribute = (attribute, amount) => {
    const updatedAttributeStats = {
      ...attributeStats,
      [attribute]: attributeStats[attribute] + amount,
    };

    setAttributeStats(updatedAttributeStats);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          <h3>Attributes</h3>
          {Object.entries(attributeStats).map(([attribute, stat]) => {
            return (
              <div key={attribute}>
                {attribute}: {stat}
                <button onClick={() => handleChangeAttribute(attribute, -1)}>
                  -
                </button>
                <button onClick={() => handleChangeAttribute(attribute, 1)}>
                  +
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;

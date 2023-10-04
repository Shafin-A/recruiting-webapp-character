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

  const [selectedClass, setSelectedClass] = useState("");

  const toggleClassRequirements = (className) => {
    selectedClass !== className
      ? setSelectedClass(className)
      : setSelectedClass("");
  };

  const areClassRequirementsMet = (className) =>
    Object.entries(CLASS_LIST[className]).every(
      ([attribute, minRequirement]) =>
        attributeStats[attribute] >= minRequirement
    );

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

        <div>
          <h3>Classes</h3>
          {Object.keys(CLASS_LIST).map((className) => (
            <div key={className}>
              <button
                onClick={() => toggleClassRequirements(className)}
                style={{
                  all: "unset", // remove button stylings
                  cursor: "pointer",
                  color: areClassRequirementsMet(className) && "green",
                }}
              >
                {className}
              </button>
              {selectedClass === className && (
                <div>
                  <h3>Minimum Requirements:</h3>
                  <div style={{ marginBottom: "12px" }}>
                    {Object.entries(CLASS_LIST[className]).map(
                      ([attribute, minRequirement]) => (
                        <div key={attribute}>
                          {attribute}: {minRequirement}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;

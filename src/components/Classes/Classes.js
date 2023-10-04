import { useState } from "react";
import { CLASS_LIST } from "../../consts";

export const Classes = ({ index, playerStats }) => {
  const [selectedClass, setSelectedClass] = useState("");

  const attributeStats = playerStats[index].attributes;

  const toggleClassRequirements = (className) => {
    selectedClass !== className
      ? setSelectedClass(className)
      : setSelectedClass("");
  };

  const areClassRequirementsMet = (className) =>
    Object.entries(CLASS_LIST[className]).every(
      ([attribute, minRequirement]) =>
        attributeStats[attribute].stat >= minRequirement
    );

  return (
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
  );
};

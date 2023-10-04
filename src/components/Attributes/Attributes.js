export const Attributes = ({ attributeStats, setAttributeStats }) => {
  const handleChangeAttribute = (attribute, amount) => {
    const updatedAttributeStats = {
      ...attributeStats,
      [attribute]: attributeStats[attribute] + amount,
    };

    setAttributeStats(updatedAttributeStats);
  };

  return (
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
  );
};

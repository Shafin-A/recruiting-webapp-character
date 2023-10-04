export const Attributes = ({ attributeStats, setAttributeStats }) => {
  const getAbilityModifier = (stat) => Math.floor((stat - 10) / 2);

  const handleChangeAttribute = (attribute, amount) => {
    const attributeStat = attributeStats[attribute].stat + amount;
    const attributeModifier = getAbilityModifier(attributeStat);

    const updatedAttributeStats = {
      ...attributeStats,
      [attribute]: {
        stat: attributeStat,
        modifier: attributeModifier,
      },
    };

    setAttributeStats(updatedAttributeStats);
  };

  return (
    <div>
      <h3>Attributes</h3>
      {Object.entries(attributeStats).map(([attribute, { stat, modifier }]) => {
        return (
          <div key={attribute}>
            {attribute}: {stat}
            {` (Modifier: ${modifier}) `}
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

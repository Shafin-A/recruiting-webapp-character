import { useEffect, useState } from "react";
import {
  SKILL_LIST,
  TOTAL_ATTRIBUTE_POINTS,
  INITIAL_ATTRIBUTE_POINTS,
} from "../../consts";

export const Attributes = ({
  index,
  playerStats,
  setAvailableSkillPoints,
  setPlayerStats,
  setTotalSkillPoints,
  totalSkillPoints,
}) => {
  const attributeStats = playerStats[index].attributes;

  const [availableAttributePoints, setAvailableAttributePoints] = useState(
    TOTAL_ATTRIBUTE_POINTS -
      INITIAL_ATTRIBUTE_POINTS * Object.values(attributeStats).length
  );

  const getAbilityModifier = (stat) => Math.floor((stat - 10) / 2);

  const handleChangeAttribute = (attribute, amount) => {
    const updateAttributePoints = availableAttributePoints - amount;

    if (
      updateAttributePoints >= 0 &&
      updateAttributePoints <= TOTAL_ATTRIBUTE_POINTS
    ) {
      const attributeStat = attributeStats[attribute].stat + amount;
      const attributeModifier = getAbilityModifier(attributeStat);

      const updatedAttributeStats = {
        ...attributeStats,
        [attribute]: {
          stat: attributeStat,
          modifier: attributeModifier,
        },
      };
      const updatedPlayerAttributeStats = [...playerStats];
      updatedPlayerAttributeStats[index] = {
        ...updatedPlayerAttributeStats[index],
        attributes: { ...updatedAttributeStats },
      };
      setPlayerStats(updatedPlayerAttributeStats);

      setAvailableAttributePoints(updateAttributePoints);

      // update total skill points if intelligence
      if (attribute === "Intelligence") {
        const skillPoints = 10 + 4 * attributeModifier;
        if (totalSkillPoints !== skillPoints) {
          setAvailableSkillPoints(skillPoints > 0 ? skillPoints : 0);
          setTotalSkillPoints(skillPoints > 0 ? skillPoints : 0);

          // reset skills
          const initialSkillsStats = SKILL_LIST.map((skill) => ({
            ...skill,
            stat: 0,
          }));

          const updatedPlayerSkillsStats = [...updatedPlayerAttributeStats];
          updatedPlayerSkillsStats[index] = {
            ...updatedPlayerSkillsStats[index],
            skills: [...initialSkillsStats],
          };

          setPlayerStats(updatedPlayerSkillsStats);
        }
      }
    }
  };

  useEffect(() => {
    const updateAttributePoints = Object.values(attributeStats)
      .map((attributeStat) => attributeStat.stat || 0)
      .reduce((acc, stat) => acc + stat, 0);

    setAvailableAttributePoints(TOTAL_ATTRIBUTE_POINTS - updateAttributePoints);
  }, [attributeStats]);

  return (
    <div>
      <h3>Attributes</h3>
      <h4>{`Available attribute points: ${availableAttributePoints} / ${TOTAL_ATTRIBUTE_POINTS}`}</h4>
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

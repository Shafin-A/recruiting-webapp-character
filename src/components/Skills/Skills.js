export const Skills = ({
  availableSkillPoints,
  index,
  playerStats,
  setAvailableSkillPoints,
  setPlayerStats,
  totalSkillPoints,
}) => {
  const attributeStats = playerStats[index].attributes;
  const skillsStats = playerStats[index].skills;

  const handleChangeSkill = (skillIndex, amount) => {
    const updateSkillPoints = availableSkillPoints - amount;

    if (updateSkillPoints >= 0 && updateSkillPoints <= totalSkillPoints) {
      setAvailableSkillPoints(availableSkillPoints - amount);

      // deep copy
      const updatedSkills = skillsStats.map((a) => {
        return { ...a };
      });
      updatedSkills[skillIndex].stat += amount;

      const updatedPlayerStats = [...playerStats];
      updatedPlayerStats[index] = {
        ...updatedPlayerStats[index],
        skills: [...updatedSkills],
      };

      setPlayerStats(updatedPlayerStats);
    }
  };

  return (
    <div>
      <h3>Skills</h3>
      <h4>
        {`Available skill points: ${availableSkillPoints} / ${totalSkillPoints}`}
      </h4>
      {skillsStats.map((skill, skillIndex) => {
        const attributeModifierName = skill.attributeModifier;
        const attributeModifierStat =
          attributeStats[attributeModifierName].modifier;

        const total = skill.stat + attributeModifierStat;

        return (
          <div key={skill.name}>
            {skill.name}: {skill.stat} {` `}
            <button onClick={() => handleChangeSkill(skillIndex, -1)}>-</button>
            <button onClick={() => handleChangeSkill(skillIndex, 1)}>+</button>
            {` (Modifier: ${attributeModifierName}: ${attributeModifierStat}) 
            (Total: ${total})`}
          </div>
        );
      })}
    </div>
  );
};

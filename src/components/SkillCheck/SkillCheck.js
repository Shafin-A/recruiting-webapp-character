import { useEffect, useState } from "react";
import { SKILL_LIST } from "../../consts";

export const SkillCheck = ({ index, playerStats }) => {
  const skillsStats = index != null ? playerStats[index].skills : SKILL_LIST;

  const [selectedSkill, setSelectedSkill] = useState({
    name: "",
    stat: "",
  });
  const [selectedDC, setSelectedDC] = useState(1);

  const [randomRoll, setRandomRoll] = useState("");

  const [total, setTotal] = useState("");

  const [result, setResult] = useState("");

  const [rollingPlayer, setRollingPlayer] = useState();

  const getPartyMaxSkill = (skillName) => {
    let maxStat = -Infinity;
    let maxStatIndex = -1;

    for (let i = 0; i < playerStats.length; i++) {
      const playerSkills = playerStats[i].skills;

      for (let j = 0; j < playerSkills.length; j++) {
        const skill = playerSkills[j];
        if (skill.name === skillName && skill.stat > maxStat) {
          maxStat = skill.stat;
          maxStatIndex = i;
        }
      }
    }

    return {
      maxStat,
      maxStatIndex,
    };
  };

  const handleRoll = (isPartyCheck) => {
    if (selectedSkill.name === "")
      alert("Select a skill first to do a skill check!");
    else {
      const roll = Math.floor(Math.random() * (21 - 1) + 1);
      setRandomRoll(roll);

      let skillStat;

      if (isPartyCheck) {
        const { maxStat, maxStatIndex } = getPartyMaxSkill(selectedSkill.name);
        skillStat = maxStat;
        setRollingPlayer(maxStatIndex + 1);
      } else {
        skillStat = selectedSkill.stat;
      }

      const rolledTotal = roll + parseInt(skillStat);
      setTotal(rolledTotal);

      setResult(rolledTotal >= selectedDC ? "Success" : "Failure");
    }
  };

  useEffect(() => {
    setSelectedSkill({ name: "", stat: "" });
    setRandomRoll("");
    setTotal("");
  }, [skillsStats]);

  return (
    <>
      <div>
        <h3>{index == null ? "Party Skill Check" : "Skill Check"}</h3>
        <label>
          {`Skill: `}
          <select
            value={
              selectedSkill.name &&
              `${selectedSkill.name}: ${selectedSkill.stat}`
            }
            onChange={(e) => {
              const [name, stat] = e.target.value.split(": ");
              setSelectedSkill({ name, stat });
            }}
          >
            <option value="" disabled>
              Select a skill
            </option>
            {skillsStats.map((skill) => (
              <option key={skill.name} value={`${skill.name}: ${skill.stat}`}>
                {index != null
                  ? `${skill.name}: ${skill.stat}`
                  : `${skill.name}`}
              </option>
            ))}
          </select>
        </label>
        <label>
          {` DC: `}
          <input
            type="number"
            value={selectedDC}
            onChange={(e) => setSelectedDC(e.target.valueAsNumber)}
          />
        </label>
        <button onClick={() => handleRoll(index == null)}>Roll</button>
      </div>
      <div>
        <div>
          Skill:
          {selectedSkill.name &&
            (index != null
              ? ` ${selectedSkill.name}: ${selectedSkill.stat}`
              : ` ${selectedSkill.name}`)}
        </div>
        <div>DC: {selectedDC}</div>
        <div>Rolled: {randomRoll}</div>
        <div>Total: {total} </div>
        <div>Result: {result}</div>
        {index == null && (
          <div>
            Rolling Player: {rollingPlayer && `Player ${rollingPlayer}`}
          </div>
        )}
      </div>
    </>
  );
};

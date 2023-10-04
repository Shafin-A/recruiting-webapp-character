import { useEffect, useState } from "react";
import "../App/App.css";
import { Attributes } from "../Attributes/Attributes";
import { Classes } from "../Classes/Classes";
import { Skills } from "../Skills/Skills";
import { SkillCheck } from "../SkillCheck/SkillCheck";

export const PlayerSheet = ({ index, playerStats, setPlayerStats }) => {
  const [totalSkillPoints, setTotalSkillPoints] = useState(10);
  const [availableSkillPoints, setAvailableSkillPoints] = useState(10);

  useEffect(() => {
    const updatedTotalSkillPoints =
      10 + 4 * playerStats[index].attributes["Intelligence"].modifier;

    setTotalSkillPoints(updatedTotalSkillPoints);

    const usedSkillPoints = Object.values(playerStats[index].skills)
      .map((skill) => skill.stat)
      .reduce((acc, stat) => acc + stat, 0);

    const updatedAvailableSkillPoints =
      updatedTotalSkillPoints - usedSkillPoints;

    setAvailableSkillPoints(updatedAvailableSkillPoints);
  }, [playerStats, index]);

  return (
    <section className="App-section">
      <h2>{`Player ${index + 1}`}</h2>

      <SkillCheck index={index} playerStats={playerStats} />

      <Attributes
        index={index}
        playerStats={playerStats}
        setAvailableSkillPoints={setAvailableSkillPoints}
        setPlayerStats={setPlayerStats}
        setTotalSkillPoints={setTotalSkillPoints}
        totalSkillPoints={totalSkillPoints}
      />

      <Classes index={index} playerStats={playerStats} />

      <Skills
        availableSkillPoints={availableSkillPoints}
        index={index}
        playerStats={playerStats}
        setAvailableSkillPoints={setAvailableSkillPoints}
        setPlayerStats={setPlayerStats}
        totalSkillPoints={totalSkillPoints}
      />
    </section>
  );
};

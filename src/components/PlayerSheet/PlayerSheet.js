import { useState } from "react";
import "../App/App.css";
import { Attributes } from "../Attributes/Attributes";
import { Classes } from "../Classes/Classes";
import { Skills } from "../Skills/Skills";

export const PlayerSheet = ({ index, playerStats, setPlayerStats }) => {
  const [totalSkillPoints, setTotalSkillPoints] = useState(10);
  const [availableSkillPoints, setAvailableSkillPoints] = useState(10);

  return (
    <section className="App-section">
      <h2>{`Player ${index + 1}`}</h2>

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

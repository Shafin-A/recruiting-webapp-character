import { useState } from "react";
import "./App.css";
import {
  ATTRIBUTE_LIST,
  INITIAL_ATTRIBUTE_POINTS,
  SKILL_LIST,
} from "../../consts";
import { PlayerSheet } from "../PlayerSheet/PlayerSheet";
import { SkillCheck } from "../SkillCheck/SkillCheck";

function App() {
  // make an object out of ATTRIBUTE_LIST to store stat and modifier for each attribute
  const initialAttributeStats = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = { stat: INITIAL_ATTRIBUTE_POINTS, modifier: 0 };
    return acc;
  }, {});

  // add initial value of 0 to each skill
  const initialSkillsStats = SKILL_LIST.map((skill) => ({
    ...skill,
    stat: 0,
  }));

  // storing player attribute and skill stats as an array
  const [playerStats, setPlayerStats] = useState([
    {
      attributes: initialAttributeStats,
      skills: initialSkillsStats,
    },
  ]);

  const addPlayerSheet = () => {
    const updatedPlayerStats = [...playerStats];

    updatedPlayerStats.push({
      attributes: initialAttributeStats,
      skills: initialSkillsStats,
    });

    setPlayerStats(updatedPlayerStats);
  };

  const savePlayerData = async (playerStats) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerStats),
    };

    try {
      const response = await fetch(
        "https://recruiting.verylongdomaintotestwith.ca/api/{Shafin-A}/character",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPlayerData = async () => {
    try {
      const response = await fetch(
        "https://recruiting.verylongdomaintotestwith.ca/api/{Shafin-A}/character"
      );

      const data = await response.json();
      setPlayerStats(data.body);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <button onClick={() => savePlayerData(playerStats)}>
        Save Player Data
      </button>
      <button onClick={getPlayerData}>Load Player Data</button>
      <div className="App-party-check">
        <SkillCheck playerStats={playerStats} />
      </div>
      {playerStats.map((_, index) => (
        <PlayerSheet
          key={index}
          index={index}
          playerStats={playerStats}
          setPlayerStats={setPlayerStats}
        />
      ))}
      <button onClick={addPlayerSheet}>Add Player</button>
    </div>
  );
}

export default App;

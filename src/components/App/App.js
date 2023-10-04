import { useState } from "react";
import "./App.css";
import {
  ATTRIBUTE_LIST,
  INITIAL_ATTRIBUTE_POINTS,
  SKILL_LIST,
} from "../../consts";
import { PlayerSheet } from "../PlayerSheet/PlayerSheet";

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
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

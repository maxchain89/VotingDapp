import { EthProvider } from "./contexts/EthContext";
import React, { useState } from 'react';
import AddCandidate from './components/AddCandidate'; // Import your 


function App() {

  const [activeComponent, setActiveComponent] = useState("");

  let content;
  switch (activeComponent) {
    case "addCandidate":
      content = <AddCandidate />;
      break;
    // ... other cases for other components...
    default:
      content = <div>Select a component</div>;
  }

  return (
    <EthProvider>
    <div id="App">
      <div className="sidebar">
        <button onClick={() => setActiveComponent("addCandidate")}>Add Candidate</button>
        {/* other buttons for other components */}
      </div>
      <div className="content">
        {content}
      </div>
    </div>
    </EthProvider>
  );
}

export default App;

import React, { useState, useContext } from "react";
import { useEth, EthContext } from "../contexts/EthContext"; // This should be the context you use for your Dapp

function AddCandidate() {
  const [candidateName, setCandidateName] = useState("");
  //   const { state } = useContext(EthContext);
  //   const { contract, accounts } = state;
  const {
    state: { contract, accounts },
  } = useEth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods
        .addCandidate(candidateName)
        .send({ from: accounts[0] });
      console.log("Candidate added successfully");
      // Optionally reset the candidateName or give feedback to the user
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div>
      <h2>Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Candidate Name"
        />
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default AddCandidate;

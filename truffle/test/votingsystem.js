const VotingSystem = artifacts.require("VotingSystem");

// Define the contract and describe the test suite
contract("VotingSystem", function (accounts) {
  let votingSystem;

  // The 'before' hook is used for setup before running tests
  before(async function () {
    // Here we deploy a new contract instance before running the tests
    votingSystem = await VotingSystem.new();
  });

  // Test for deployment
  it("should deploy the contract", async function () {
    assert(
      votingSystem.address !== undefined,
      "VotingSystem contract should be deployed and have an address"
    );
  });

  it("should initialize voting with the correct candidates", async function () {
    const ownerAddress = accounts[0];
    const candidateNames = ["Alice", "Bob", "Charlie"];
    await votingSystem.initializeVoting(candidateNames, { from: ownerAddress });

    // Verify that the candidates are correctly added
    for (let i = 0; i < candidateNames.length; i++) {
      const candidate = await votingSystem.candidates(i);
      assert.equal(
        candidate.name,
        candidateNames[i],
        `Candidate ${i} should be ${candidateNames[i]}`
      );
    }
  });

  // Test for voter registration
  it("should allow owner to register a voter", async function () {
    const ownerAddress = accounts[0]; // By default, the first account is the owner
    const voterAddress = accounts[1];
    await votingSystem.registerVoter(voterAddress, { from: ownerAddress });
    const isRegistered = await votingSystem.isVoterRegistered(voterAddress);
    assert(isRegistered, "The voter should be registered by the owner");
  });

  // Test for non-owner voter registration attempt
  it("should not allow a non-owner to register a voter", async function () {
    const nonOwnerAddress = accounts[1];
    const voterAddress = accounts[2];
    try {
      await votingSystem.registerVoter(voterAddress, { from: nonOwnerAddress });
      assert.fail("Non-owner should not be able to register a voter");
    } catch (error) {
      assert(
        error.message.includes("revert"),
        "Only the owner should be able to register a voter"
      );
    }
  });

  it("should not allow a non-owner to add a candidate", async function () {
    const nonOwnerAddress = accounts[1];
    const candidateName = "Candidate 2";
    try {
      await votingSystem.addCandidate(candidateName, { from: nonOwnerAddress });
      assert.fail("The transaction should have reverted");
    } catch (error) {
      assert(
        error.message.includes("revert"),
        "Expected revert when non-owner tries to add a candidate"
      );
    }
  });

  it("should not allow non-owner to initialize voting", async function () {
    const nonOwnerAddress = accounts[1];
    const candidateNames = ["Alice", "Bob", "Charlie"];

    // Attempt to initialize voting as a non-owner
    try {
      await votingSystem.initializeVoting(candidateNames, {
        from: nonOwnerAddress,
      });
      assert.fail("Only the owner should be able to initialize voting");
    } catch (error) {
      assert(
        error.message.includes("revert"),
        "Expected revert when non-owner tries to initialize voting"
      );
    }
  });
});

const VotingSystem = artifacts.require("VotingSystem");
const { execSync } = require("child_process");

module.exports = function (deployer) {
  deployer.deploy(VotingSystem);
  deployer.then(() => {
    execSync("node copyArtifacts.js", { stdio: "inherit" });
  });
};

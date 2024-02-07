// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    address public owner;
    Candidate[] public candidates;
    mapping(address => Voter) public voters;
    bool public votingEnded = false;

    constructor() {
        owner = msg.sender; // Set the contract creator as the owner
    }

    //we only want the owner of this contract to be able to do certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function addCandidate(string memory name) public onlyOwner {
        require(!votingEnded, "Voting has ended");
        candidates.push(Candidate(candidates.length, name, 0));
    }

    function registerVoter(address voterAddress) public onlyOwner {
        require(
            !voters[voterAddress].isRegistered,
            "Voter is already registered!"
        );
        require(!votingEnded, "Voting has ended");
        voters[voterAddress].isRegistered = true;
    }

    function isVoterRegistered(
        address voterAddress
    ) public view returns (bool) {
        return voters[voterAddress].isRegistered;
    }

    function getResults() public view returns (Candidate[] memory) {
        require(votingEnded, "Voting has not ended yet.");
        return candidates;
    }

    function endVoting() public onlyOwner {
        votingEnded = true;
    }

    function initializeVoting(string[] memory candidateNames) public onlyOwner {
        require(candidates.length == 0, "Voting has already begun.");
        for (uint i = 0; i < candidateNames.length; i++) {
            addCandidate(candidateNames[i]);
        }
    }

    function castVote(uint candidateId) public {
        require(voters[msg.sender].isRegistered, "You must be registered");
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(!votingEnded, "Voting has ended");

        voters[msg.sender].hasVoted = true;

        if (candidateId < candidates.length) {
            candidates[candidateId].voteCount++;
        } else {
            revert("Invalid candidate ID.");
        }
    }
}
